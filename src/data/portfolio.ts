export const profile = {
  name: 'Win Khant Aung',
  title: 'Full Stack Developer',
  handle: 'winkhantaung',
  location: 'Dubai, UAE',
  email: 'contact.winkhantaung@gmail.com',
  github: 'https://github.com/leon-99',
  linkedin: 'https://linkedin.com/in/win-khant-aung-ba1271181',
  tagline:
    'Node.js backend developer with strong experience in Vue.js, React.js, and modern web platforms.',
  summary:
    'Passionate about scalable APIs, clean architecture, and shipping reliable products with cross-functional teams.',
}

export const objective = {
  title: 'Objective',
  paragraphs: [
    'Passionate and results-driven Node.js Backend Developer with strong expertise in building scalable APIs and integrating them seamlessly with modern frontend frameworks like Vue.js and React.js.',
    'Skilled at designing efficient architectures, solving complex backend challenges, and delivering high-performance solutions. Experienced in collaborating across functions and ensuring projects are completed on time and to high standards.',
    'Committed to continuous learning, clean code practices, and leveraging cutting-edge technologies to build impactful web applications.',
  ],
  stats: [
    { value: '7+', label: 'Years experience' },
    { value: '30+', label: 'Projects completed' },
    { value: '100%', label: 'Client satisfaction' },
  ],
}

export const experiences = [
  {
    id: 1,
    title: 'Senior Web Developer',
    company: 'Crystawall Technologies LLC',
    location: 'Dubai, UAE',
    period: 'Aug 2024 – Present',
    current: true,
    responsibilities: [
      'Building and maintaining backend APIs using Node.js (Express)',
      'Developing modern, interactive frontends with Vue.js and React.js',
      'Maintaining and updating existing Laravel projects',
      'Collaborating with design and QA teams to implement new features',
      'Deploying and managing applications on AWS with focus on scalability',
      'Writing clean, maintainable code following best practices',
    ],
    technologies: ['Node.js', 'Express.js', 'Vue.js', 'React.js', 'Laravel', 'AWS', 'MySQL', 'PostgreSQL'],
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Successfully migrated 5 legacy projects to modern architecture',
      'Led development of 6 major client projects from conception to deployment',
    ],
  },
  {
    id: 2,
    title: 'Senior Web Developer',
    company: 'Ophir IT Solutions',
    location: 'Yangon, Myanmar',
    period: 'Sep 2021 – Mar 2024',
    current: false,
    responsibilities: [
      'Developed scalable web applications using Laravel and Vue.js',
      'Wrote and maintained backend logic and frontend components',
      'Debugged and resolved technical issues across multiple projects',
      'Used Git for version control and contributed to feature development',
      'Interacted with clients to clarify requirements and implement features',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'MySQL', 'Git', 'Docker', 'Linux'],
    achievements: [
      'Delivered 15+ successful projects for international clients',
      'Reduced bug reports by 60% through improved testing practices',
      'Established coding standards and development workflows for the team',
    ],
  },
  {
    id: 3,
    title: 'Front-End Developer',
    company: 'EWhale Myanmar',
    location: 'Yangon, Myanmar',
    period: 'Feb 2020 – Aug 2021',
    current: false,
    responsibilities: [
      'Built responsive and cross-browser-compatible UI components',
      'Collaborated with backend developers and designers for complete solutions',
      'Implemented SEO best practices and performance optimization',
      'Used Git for version control and participated in agile sprints',
      'Created interactive user interfaces with modern JavaScript',
      'Optimized websites for mobile devices and various screen sizes',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'SASS', 'Git', 'Webpack'],
    achievements: [
      'Improved website loading speed by 50% through optimization',
      'Successfully delivered 20+ responsive websites',
      'Achieved 95+ Google PageSpeed scores on all projects',
    ],
  },
]

export const education = [
  {
    title: 'Computer Science',
    institution: 'Mawbi University, Yangon',
    year: '2016–2020',
  },
  {
    title: 'CS50x – Computer Science',
    institution: 'Harvard University (Online)',
    year: '2019',
  },
]

export type ProjectCategory = 'websites' | 'packages' | 'products'
export type PackageType = 'npm' | 'laravel'

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  packageType?: PackageType
  featured: boolean
  technologies: string[]
  liveUrl?: string
  liveLabel?: string
  codeUrl?: string
  codeLabel?: string
}

export const projects: Project[] = [
  {
    id: 'leaseguard',
    title: 'Leaseguard',
    description:
      'Production-grade distributed locking for Node.js — Redis-backed ownership, automatic renewal, retries, and lock-loss detection for workers, cron jobs, and queue consumers.',
    category: 'packages',
    packageType: 'npm',
    featured: true,
    technologies: ['Node.js', 'TypeScript', 'Redis', 'Distributed Locking', 'ioredis'],
    liveUrl: 'https://www.npmjs.com/package/leaseguard',
    liveLabel: 'Package',
  },
  {
    id: 'postmock',
    title: 'PostMock',
    description:
      'Instant mock API server generator from Postman collections or OpenAPI specs.',
    category: 'packages',
    packageType: 'npm',
    featured: true,
    technologies: ['Node.js', 'JavaScript', 'CLI', 'Mock API', 'Postman', 'OpenAPI', 'Express'],
    liveUrl: 'https://www.npmjs.com/package/postmock',
    liveLabel: 'Package',
  },
  {
    id: 'plato-vue',
    title: 'Plato Vue',
    description: 'Vue.js maintainability analysis tool with CLI reporting.',
    category: 'packages',
    packageType: 'npm',
    featured: true,
    technologies: ['Node.js', 'JavaScript', 'CLI', 'Code Analysis', 'Vue.js'],
    liveUrl: 'https://www.npmjs.com/package/plato-vue',
    liveLabel: 'Package',
  },
  {
    id: 'zenith-hr',
    title: 'Zenith HR',
    description:
      'People platform for attendance, leave, and payroll — connected workflows from clock-in to payslip, built for teams that outgrew spreadsheets.',
    category: 'products',
    featured: true,
    technologies: ['Vue.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'HR Platform'],
    liveUrl: 'https://zenith.winkhantaung.online/',
    liveLabel: 'Live demo',
  },
  {
    id: 'oasify-postman',
    title: 'Oasify Postman',
    description: 'Converts Postman collections to OpenAPI 3.0 with CLI support.',
    category: 'packages',
    packageType: 'npm',
    featured: false,
    technologies: ['Node.js', 'JavaScript', 'CLI', 'OpenAPI'],
    liveUrl: 'https://www.npmjs.com/package/oasify-postman',
    liveLabel: 'Package',
  },
  {
    id: 'laravel-entity-generator',
    title: 'Laravel Entity Generator',
    description: 'Generates CRUD operations in a service-based Laravel architecture.',
    category: 'packages',
    packageType: 'laravel',
    featured: false,
    technologies: ['Laravel', 'PHP', 'CLI', 'CRUD'],
    codeUrl: 'https://github.com/leon-99/laravel-entity-generator',
    codeLabel: 'View code',
  },
  {
    id: 'solar-system',
    title: 'Solar System Explorer',
    description: 'Interactive solar system visualization with educational content.',
    category: 'websites',
    featured: false,
    technologies: ['Vue.js', 'Tailwind CSS', 'JavaScript', '3D Animation'],
    liveUrl: 'https://solar-system-leon.netlify.app/',
    liveLabel: 'Live demo',
  },
]

export const skillCategories = [
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'RESTful APIs', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Frontend',
    skills: ['Vue.js', 'React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'CI/CD', 'Git', 'Linux', 'Nginx'],
  },
  {
    title: 'Quality',
    skills: ['Code review', 'Static analysis', 'Code coverage', 'Performance profiling'],
  },
]

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]
