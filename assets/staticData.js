const owner = {
  firstName: "Venki",
  lastName: "Vijay",
  role: "DevOps Engineer",
  experience: 3,
};

const projects = [
  {
    name: "Infra",
    description: "Ansible playbook to configure my systems",
    tags: ["Ansible", "Shell", "Jinja"],
    image: "infra",
    sourceURL: "https://github.com/venkivijay/infra",
  },
  {
    name: "Resume",
    description: "RAC (Resume as Code) made using TeX",
    tags: ["TeX - LaTeX", "GitHub Actions"],
    image: "resume",
    liveURL: "https://venkivijay.github.io/resume/",
    sourceURL: "https://github.com/venkivijay/resume",
  },
  {
    name: "Xplore",
    description: "Searchable/filterable file browser for a GitHub repo",
    tags: ["Nuxt.js", "PWA"],
    image: "xplore",
    liveURL: "https://xplore.venkivijay.com/",
    sourceURL: "https://github.com/venkivijay/xplore",
  },
  {
    name: "Links",
    description: "Linktree like bio hosting my social links",
    tags: ["Vue", "PostCSS", "Vite"],
    image: "links",
    liveURL: "https://links.venkivijay.com/",
    sourceURL: "https://github.com/venkivijay/links",
  },
  {
    name: "Invoice Tracker",
    description: "A simple app to create and manage invoices",
    tags: ["Vue", "Firebase", "Chart.js"],
    image: "invoice-tracker",
    liveURL: "https://wizardly-tereshkova-b408fe.netlify.app/",
    sourceURL: "https://github.com/venkivijay/invoice-tracker",
  },
];

const socials = [
  {
    name: "GitHub",
    primaryIcon: "github",
    url: "https://github.com/venkivijay",
  },
  {
    name: "LinkedIn",
    primaryIcon: "linkedin",
    url: "https://www.linkedin.com/in/venkivijay/",
  },
  {
    name: "Twitter",
    primaryIcon: "twitter",
    url: "https://twitter.com/venkivijay_",
  },
  {
    name: "WhatsApp",
    primaryIcon: "whatsapp",
    url: "https://wa.me/+918122932334",
  },
];

const contact = {
  location: "Bangalore, KA",
  email: "venkivijay@hotmail.com",
  phone: "+91-6369888030",
};

const skills = [
  { slug: "akamai", name: "Linode" },
  { slug: "amazonapigateway", name: "API Gateway" },
  { slug: "amazonaws", name: "AWS" },
  { slug: "amazoncloudwatch", name: "CloudWatch" },
  { slug: "amazonec2", name: "EC2" },
  { slug: "amazonecs", name: "ECS" },
  { slug: "amazoneks", name: "EKS" },
  { slug: "amazonrds", name: "RDS" },
  { slug: "amazons3", name: "S3" },
  { slug: "amazonsqs", name: "SQS" },
  { slug: "ansible", name: "Ansible" },
  { slug: "apachekafka", name: "Kafka" },
  { slug: "apachetomcat", name: "Tomcat" },
  { slug: "arduino", name: "Arduino" },
  { slug: "awslambda", name: "Lambda" },
  { slug: "backstage", name: "Backstage" },
  { slug: "centos", name: "CentOS" },
  { slug: "debian", name: "Debian" },
  { slug: "docker", name: "Docker" },
  { slug: "firebase", name: "Firebase" },
  { slug: "git", name: "Git" },
  { slug: "github", name: "GitHub" },
  { slug: "gitlab", name: "GitLab" },
  { slug: "gnubash", name: "Bash" },
  { slug: "grafana", name: "Grafana" },
  { slug: "helm", name: "HELM" },
  { slug: "json", name: "JSON" },
  { slug: "kibana", name: "Kibana" },
  { slug: "kubernetes", name: "Kubernetes" },
  { slug: "letsencrypt", name: "Let's Encrypt" },
  { slug: "linux", name: "Linux" },
  { slug: "metabase", name: "Metabase" },
  { slug: "netlify", name: "Netlify" },
  { slug: "nodedotjs", name: "Node.js" },
  { slug: "npm", name: "npm" },
  { slug: "obsidian", name: "Obsidian" },
  { slug: "opensearch", name: "OpenSearch" },
  { slug: "opentelemetry", name: "OTEL" },
  { slug: "portainer", name: "Portainer" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "prettier", name: "Prettier" },
  { slug: "prometheus", name: "Prometheus" },
  { slug: "python", name: "Python" },
  { slug: "redhat", name: "RedHat" },
  { slug: "tailwindcss", name: "Tailwind CSS" },
  { slug: "threedotjs", name: "Three.js" },
  { slug: "tmux", name: "tmux" },
  { slug: "ubuntu", name: "Ubuntu" },
  { slug: "vuedotjs", name: "Vue.js" },
  { slug: "wordpress", name: "Wordpress" },
];

export { owner, projects, socials, contact, skills };
