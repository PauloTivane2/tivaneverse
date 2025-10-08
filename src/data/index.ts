import { Server, Cloud, Globe, Users, Code, Database, Smartphone } from "lucide-react"

// Profile Data
export const profileData = {
  name: "Paulo Babucho Issaca Tivane",
  title: "Software Engineer & IT Professional",
  tagline: "Building innovative solutions with code",
  bio: "Passionate software engineer with expertise in full-stack development, cloud technologies, and IT infrastructure. I transform complex problems into elegant, scalable solutions.",
  image: "/images/profile.jpg",
  email: "paulo.tivane@example.com",
  phone: "+258 84 123 4567",
  location: "Maputo, Mozambique",
  resume: "/resume.pdf",
  social: {
    github: "https://github.com/paulotivane",
    linkedin: "https://linkedin.com/in/paulotivane",
    twitter: "https://twitter.com/paulotivane",
  },
}

// Expertise Data - Skills showcase
export const expertiseData = [
  {
    name: "Frontend Development",
    icon: Code,
    color: "#00ff99",
  },
  {
    name: "Backend Development",
    icon: Server,
    color: "#00b3ff",
  },
  {
    name: "Cloud Infrastructure",
    icon: Cloud,
    color: "#ff0066",
  },
  {
    name: "Database Management",
    icon: Database,
    color: "#00cc99",
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    color: "#ff6600",
  },
  {
    name: "Web Technologies",
    icon: Globe,
    color: "#0066ff",
  },
]

// Projects Data
export const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management",
    image: "/modern-ecommerce-dashboard.png",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/paulotivane/ecommerce",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates",
    image: "/task-management-interface.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/paulotivane/taskmanager",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather tracking application with interactive maps",
    image: "/weather-dashboard-interface.png",
    technologies: ["Vue.js", "OpenWeather API", "Chart.js", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/paulotivane/weather",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio CMS",
    description: "Content management system for creative professionals",
    image: "/cms-admin-panel.jpg",
    technologies: ["Next.js", "Sanity", "TypeScript", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/paulotivane/portfolio-cms",
    featured: false,
  },
]

// Services Data
export const servicesData = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications tailored to your business needs",
    features: ["Responsive design", "SEO optimization", "Performance tuning", "Cross-browser compatibility"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications",
    features: ["iOS & Android apps", "Cross-platform solutions", "App store deployment", "Maintenance & updates"],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment",
    features: ["Cloud migration", "Infrastructure setup", "DevOps automation", "Monitoring & scaling"],
  },
  {
    icon: Users,
    title: "Technical Consulting",
    description: "Expert guidance for your technical projects",
    features: ["Architecture design", "Code reviews", "Technology selection", "Team training"],
  },
]

// Site Settings
export const siteSettings = {
  name: "Paulo Babucho Issaca Tivane",
  tagline: "Software Engineer & IT Professional",
  description: "Professional portfolio showcasing software engineering projects and technical expertise",
  url: "https://paulotivane.com",
  social: {
    github: "https://github.com/paulotivane",
    linkedin: "https://linkedin.com/in/paulotivane",
    twitter: "https://twitter.com/paulotivane",
    email: "paulo.tivane@example.com",
  },
  navigation: [
    { name: "Home", href: "#home" },
    { name: "Expertise", href: "#expertise" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ],
}
