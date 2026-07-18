<template>
  <div :style="outerStyle">
    <div
      :style="panelStyle"
      :class="className"
      role="toolbar"
      aria-label="Application dock"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <DockItem
        v-for="(item, index) in items"
        :key="`${index}-${item.active ? 'active' : 'idle'}`"
        :onClick="item.onClick"
        :className="item.className"
        :mouseX="mouseX"
        :spring="spring"
        :distance="distance"
        :magnification="magnification"
        :baseItemSize="baseItemSize"
        :item="item"
        :showLabels="showLabels"
        :compact="compact"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { AnimatePresence, Motion, useMotionValue, useSpring, useTransform } from 'motion-v';
import type { ConcreteComponent, CSSProperties, PropType, VNodeChild } from 'vue';
import { computed, defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue';

const MotionComponent = Motion as unknown as ConcreteComponent;
const AnimatePresenceComponent = AnimatePresence as unknown as ConcreteComponent;

export type SpringOptions = NonNullable<Parameters<typeof useSpring>[1]>;

export type DockItemData = {
  icon: unknown;
  label: unknown;
  onClick: () => void;
  className?: string;
  active?: boolean;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

const DockIcon = defineComponent({
  name: 'DockIcon',
  props: {
    className: { type: String, default: '' }
  },
  render() {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        } satisfies CSSProperties,
        class: this.className
      },
      this.$slots.default?.()
    );
  }
});

const DockLabel = defineComponent({
  name: 'DockLabel',
  props: {
    className: { type: String, default: '' },
    isHovered: {
      type: Object as PropType<ReturnType<typeof useMotionValue<number>>>,
      required: true
    }
  },
  setup(props) {
    const isVisible = ref(false);
    let unsubscribe: (() => void) | null = null;

    onMounted(() => {
      unsubscribe = props.isHovered.on('change', (latest: number) => {
        isVisible.value = latest === 1;
      });
    });

    onUnmounted(() => {
      unsubscribe?.();
    });

    return { isVisible };
  },
  render() {
    const labelStyle: CSSProperties = {
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '0.5rem',
      width: 'fit-content',
      whiteSpace: 'nowrap',
      borderRadius: '0.375rem',
      border: '1px solid var(--border-strong)',
      backgroundColor: 'var(--surface-raised)',
      padding: '0.2rem 0.55rem',
      fontSize: '0.72rem',
      fontWeight: 600,
      color: 'var(--text)',
      pointerEvents: 'none'
    };

    return h(AnimatePresenceComponent, {}, () =>
      this.isVisible
        ? [
            h(
              MotionComponent,
              {
                key: 'label',
                as: 'div',
                class: this.className,
                role: 'tooltip',
                style: labelStyle,
                initial: { opacity: 0, y: 0 },
                animate: { opacity: 1, y: -10 },
                exit: { opacity: 0, y: 0 },
                transition: { duration: 0.2 }
              },
              () => this.$slots.default?.()
            )
          ]
        : []
    );
  }
});

const DockItem = defineComponent({
  name: 'DockItem',
  props: {
    className: { type: String, default: '' },
    onClick: { type: Function as PropType<() => void>, default: () => {} },
    mouseX: {
      type: Object as PropType<ReturnType<typeof useMotionValue<number>>>,
      required: true
    },
    spring: { type: Object as PropType<SpringOptions>, required: true },
    distance: { type: Number, required: true },
    baseItemSize: { type: Number, required: true },
    magnification: { type: Number, required: true },
    item: { type: Object as PropType<DockItemData>, required: true },
    showLabels: { type: Boolean, default: false },
    compact: { type: Boolean, default: false }
  },
  setup(props) {
    const itemRef = ref<HTMLDivElement>();
    const isHovered = useMotionValue(0);
    const currentSize = ref(props.baseItemSize);

    const mouseDistance = useTransform(props.mouseX, (val: number) => {
      const rect = itemRef.value?.getBoundingClientRect() ?? { x: 0, width: props.baseItemSize };
      return val - rect.x - rect.width / 2;
    });

    const targetSize = useTransform(mouseDistance, (dist: number) => {
      const { baseItemSize, magnification, distance } = props;
      const clamped = Math.max(-distance, Math.min(distance, dist));
      const t = 1 - Math.abs(clamped) / distance;
      return baseItemSize + (magnification - baseItemSize) * t;
    });

    const size = useSpring(targetSize, props.spring);

    watch(
      () => props.baseItemSize,
      newSize => {
        currentSize.value = newSize;
        size.set(newSize);
      }
    );

    let unsubscribeSize: (() => void) | null = null;

    onMounted(() => {
      unsubscribeSize = size.on('change', (latest: number) => {
        currentSize.value = latest;
      });
    });

    onUnmounted(() => {
      unsubscribeSize?.();
    });

    const handleHoverStart = () => isHovered.set(1);
    const handleHoverEnd = () => isHovered.set(0);
    const handleFocus = () => isHovered.set(1);
    const handleBlur = () => isHovered.set(0);

    return {
      itemRef,
      currentSize,
      isHovered,
      handleHoverStart,
      handleHoverEnd,
      handleFocus,
      handleBlur
    };
  },
  render() {
    const icon = typeof this.item.icon === 'function' ? (this.item.icon as () => unknown)() : this.item.icon;
    const label = typeof this.item.label === 'function' ? (this.item.label as () => unknown)() : this.item.label;
    const labelText = typeof label === 'string' ? label : String(label ?? '');
    const isActive = Boolean(this.item.active);

    const activeItemStyle: CSSProperties = {
      backgroundColor: 'rgba(74, 222, 128, 0.16)',
      border: '1px solid rgba(74, 222, 128, 0.65)',
      boxShadow:
        '0 0 0 1px rgba(74, 222, 128, 0.2) inset, 0 0 20px rgba(74, 222, 128, 0.18)',
      color: 'var(--accent)'
    };

    const idleItemStyle: CSSProperties = {
      backgroundColor: 'var(--surface-raised)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--shadow-sm)',
      color: 'var(--text)'
    };

    const sharedLabeledStyle: CSSProperties = {
      height: `${this.currentSize}px`,
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      ...(isActive ? activeItemStyle : idleItemStyle)
    };

    const itemStyle: CSSProperties = this.showLabels
      ? this.compact
        ? {
            ...sharedLabeledStyle,
            width: 'auto',
            flex: '1 1 0',
            minWidth: 0,
            gap: '0.15rem',
            padding: '0.28rem 0.12rem 0.24rem',
            borderRadius: '10px'
          }
        : {
            ...sharedLabeledStyle,
            width: '5.85rem',
            gap: '0.25rem',
            padding: '0.38rem 0.5rem 0.35rem',
            borderRadius: '12px',
            flexShrink: 0
          }
      : {
          width: `${this.currentSize}px`,
          height: `${this.currentSize}px`,
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-sm)',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          outline: 'none',
          transition: 'color 0.15s ease, border-color 0.15s ease'
        };

    const labelStyle: CSSProperties = {
      fontSize: this.compact ? '0.58rem' : '0.65rem',
      fontWeight: isActive ? 700 : 600,
      lineHeight: 1.1,
      letterSpacing: '0.01em',
      color: isActive ? 'var(--accent)' : 'var(--text-muted)',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };

    return h(
      'div',
      {
        ref: 'itemRef',
        style: itemStyle,
        class: [
          this.className,
          this.item.className,
          this.showLabels ? 'dock-item-labeled' : '',
          this.compact ? 'dock-item-compact' : '',
          isActive ? 'dock-item-active' : ''
        ]
          .filter(Boolean)
          .join(' '),
        tabindex: 0,
        role: 'button',
        'aria-label': labelText,
        'aria-current': isActive ? 'page' : undefined,
        onMouseenter: this.handleHoverStart,
        onMouseleave: this.handleHoverEnd,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onClick: this.onClick
      },
      this.showLabels
        ? [
            h(
              'span',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: this.compact ? '1rem' : '1.25rem',
                  height: this.compact ? '1rem' : '1.25rem',
                  flexShrink: 0,
                  color: isActive ? 'var(--accent)' : 'currentColor'
                }
              },
              [icon as VNodeChild]
            ),
            h('span', { style: labelStyle }, labelText)
          ]
        : [
            h(DockIcon, {}, () => [icon]),
            h(DockLabel, { isHovered: this.isHovered }, () => [labelText])
          ]
    );
  }
});

export default defineComponent({
  name: 'Dock',
  components: { DockItem },
  props: {
    items: { type: Array as PropType<DockItemData[]>, required: true },
    className: { type: String, default: '' },
    distance: { type: Number, default: 200 },
    panelHeight: { type: Number, default: 68 },
    baseItemSize: { type: Number, default: 50 },
    dockHeight: { type: Number, default: 256 },
    magnification: { type: Number, default: 70 },
    showLabels: { type: Boolean, default: false },
    compact: { type: Boolean, default: false },
    spring: {
      type: Object as PropType<SpringOptions>,
      default: () => ({ mass: 0.1, stiffness: 150, damping: 12 })
    }
  },
  setup(props) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);
    const currentHeight = ref(props.panelHeight);

    const maxHeight = computed(() =>
      props.compact
        ? props.panelHeight
        : Math.max(props.dockHeight, props.magnification + props.magnification / 2 + 4)
    );

    const heightRow = useTransform(isHovered, (hovered: number) =>
      hovered === 1 ? maxHeight.value : props.panelHeight
    );
    const height = useSpring(heightRow, props.spring);

    watch([() => props.panelHeight, maxHeight], () => {
      height.set(isHovered.get() === 1 ? maxHeight.value : props.panelHeight);
    });

    let unsubscribeHeight: (() => void) | null = null;

    onMounted(() => {
      unsubscribeHeight = height.on('change', (latest: number) => {
        currentHeight.value = latest;
      });
    });

    onUnmounted(() => {
      unsubscribeHeight?.();
    });

    const handleMouseMove = (event: MouseEvent) => {
      isHovered.set(1);
      mouseX.set(event.pageX);
    };

    const handleMouseLeave = () => {
      isHovered.set(0);
      mouseX.set(Infinity);
    };

    const outerStyle = computed<CSSProperties>(() => ({
      height: `${currentHeight.value}px`,
      scrollbarWidth: 'none',
      margin: '0 auto',
      display: 'flex',
      width: '100%',
      maxWidth: '100%',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }));

    const panelStyle = computed<CSSProperties>(() => ({
      height: props.showLabels ? 'auto' : `${props.panelHeight}px`,
      minHeight: props.showLabels ? `${props.panelHeight}px` : undefined,
      position: 'relative',
      display: 'flex',
      alignItems: props.showLabels ? 'center' : 'flex-end',
      width: props.compact ? '100%' : 'fit-content',
      maxWidth: props.compact ? '100%' : 'calc(100vw - 1.5rem)',
      gap: props.compact ? '0.2rem' : props.showLabels ? '0.35rem' : '0.65rem',
      borderRadius: props.compact ? '0.95rem' : '1.1rem',
      backgroundColor: 'rgba(12, 18, 15, 0.94)',
      backdropFilter: 'blur(18px)',
      border: '1px solid var(--border-strong)',
      padding: props.compact ? '0.28rem 0.3rem' : props.showLabels ? '0.35rem 0.55rem' : '0 0.65rem 0.65rem',
      boxShadow:
        '0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 -1px 0 rgba(74, 222, 128, 0.08) inset, 0 18px 48px rgba(0, 0, 0, 0.45)'
    }));

    return {
      mouseX,
      outerStyle,
      panelStyle,
      handleMouseMove,
      handleMouseLeave
    };
  }
});
</script>
