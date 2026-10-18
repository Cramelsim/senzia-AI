// Shared marketing content so list pages and their detail pages stay in sync.

export const productModules = [
  {
    title: 'Business Intelligence',
    description: 'Get real-time insights into your business performance.',
    features: ['Interactive Dashboards', 'Custom Reports', 'KPI Tracking', 'Data Visualization'],
    slug: 'bi',
    color: '#60a5fa'
  },
  {
    title: 'Automation',
    description: 'Automate repetitive tasks and streamline your operations.',
    features: ['Workflow Automation', 'Scheduled Reports', 'Data Sync & Integration', 'Task Automation'],
    slug: 'automation',
    color: '#34d399'
  },
  {
    title: 'AI Insights',
    description: 'Leverage AI to uncover trends, predict outcomes, and get smarter recommendations.',
    features: ['AI-Powered Analytics', 'Predictive Forecasting', 'Anomaly Detection', 'Smart Recommendations'],
    slug: 'ai-insights',
    color: '#a78bfa'
  },
  {
    title: 'Alerts & Notifications',
    description: 'Stay informed with real-time alerts on what matters.',
    features: ['Threshold Alerts', 'Email Notifications', 'WhatsApp Alerts', 'Custom Notifications'],
    slug: 'alerts',
    color: '#fb923c'
  },
  {
    title: 'Data Integration',
    description: 'Connect all your data sources in one central platform.',
    features: ['Multiple Data Sources', 'Real-time Sync', 'Data Cleaning', 'Secure Storage'],
    slug: 'integrations',
    color: '#22d3ee'
  },
  {
    title: 'AI Consulting & Training',
    description: 'Upskill your team and implement AI the right way.',
    features: ['AI Strategy Consulting', 'Team Training', 'Workshops', 'Ongoing Support'],
    slug: 'consulting',
    color: '#f472b6'
  }
];

export const featuredResources = [
  {
    id: 1,
    type: 'GUIDE',
    title: 'The Business Intelligence Playbook for 2024',
    description: 'A step-by-step guide to building a data-driven organization and maximizing ROI.',
    slug: 'playbook',
    link: '/resources/playbook',
    accent: '#4f8cff',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
  },
  {
    id: 2,
    type: 'CASE STUDY',
    title: 'How a Restaurant Group Increased Profit by 28%',
    description: 'See how real-time insights and automation transformed operations and boosted margins.',
    slug: 'case-study',
    link: '/resources/case-study',
    accent: '#22c55e',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80'
  },
  {
    id: 3,
    type: 'WHITEPAPER',
    title: 'The Future of AI in Business Intelligence',
    description: 'Key trends, predictions, and strategies shaping the future of data-driven businesses.',
    slug: 'whitepaper',
    link: '/resources/whitepaper',
    accent: '#a855f7',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80'
  }
];

export const blogPosts = [
  {
    id: 1,
    title: '5 Metrics Every Business Owner Should Track',
    date: 'May 20, 2024',
    category: 'Analytics',
    excerpt: 'Learn the key metrics that drive business success and how to track them effectively.',
    slug: 'metrics',
    link: '/blog/metrics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80'
  },
  {
    id: 2,
    title: 'How Real-Time Data Drives Better Decisions',
    date: 'May 15, 2024',
    category: 'Data',
    excerpt: 'Discover how real-time data can transform your decision-making process.',
    slug: 'real-time-data',
    link: '/blog/real-time-data',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'
  },
  {
    id: 3,
    title: 'Automating Operations: Where to Start',
    date: 'May 8, 2024',
    category: 'Automation',
    excerpt: 'A practical guide to getting started with business process automation.',
    slug: 'automation',
    link: '/blog/automation',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
  },
  {
    id: 4,
    title: 'The ROI of Business Intelligence Platforms',
    date: 'May 1, 2024',
    category: 'ROI',
    excerpt: 'Calculate the return on investment for implementing business intelligence.',
    slug: 'roi',
    link: '/blog/roi',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80'
  }
];

export const resourceCategoryFilters = {
  'all-resources': { label: 'All Resources' },
  blog: { label: 'Blog' },
  guides: { label: 'Guides', type: 'GUIDE' },
  'case-studies': { label: 'Case Studies', type: 'CASE STUDY' },
  webinars: { label: 'Webinars' },
  'tools-templates': { label: 'Tools & Templates' },
  whitepapers: { label: 'Whitepapers', type: 'WHITEPAPER' },
};
