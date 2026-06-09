// 35 parent software categories — source: zoftwarehub.com
export type SoftwareCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  description: string;
  subcategories: string[];
  featured?: boolean;
};

export const softwareCategories: SoftwareCategory[] = [
  {
    id: '1', name: 'AI Tools & Platforms', slug: 'ai-tools', icon: 'cpu', count: 13, featured: true,
    description: 'Artificial intelligence, machine learning, generative AI, and automation tools.',
    subcategories: ['Artificial Intelligence Software', 'Generative AI Software', 'Machine Learning Software', 'AI Chatbot Software', 'Writing Assistant Software', 'OCR Software', 'Speech Recognition Software', 'Text to Speech (TTS) Software', 'AI Coding Assistant Software', 'Image Generation Software', 'Video Generation & Editing'],
  },
  {
    id: '2', name: 'CRM & Sales', slug: 'crm-sales', icon: 'users', count: 27, featured: true,
    description: 'CRM systems, sales force automation, lead management, and customer success tools.',
    subcategories: ['CRM Software', 'Sales Force Automation', 'Lead Management Software', 'Customer Success Software', 'CPQ Software', 'Inside Sales Software', 'Mobile CRM Software', 'Small Business CRM Software', 'Real Estate CRM Software', 'Ecommerce CRM Software'],
  },
  {
    id: '3', name: 'HR & Payroll', slug: 'hr-payroll', icon: 'user-check', count: 33, featured: true,
    description: 'Human resources, payroll processing, talent management, and workforce tools.',
    subcategories: ['Human Resources Software', 'Payroll Software', 'Applicant Tracking Software', 'Employee Engagement Software', 'Performance Management Software', 'Time & Attendance Software', 'Talent Management Systems', 'Recruiting Software', 'Onboarding Software', 'OKR Software'],
  },
  {
    id: '4', name: 'Finance & Accounting', slug: 'finance-accounting', icon: 'bar-chart-2', count: 35, featured: true,
    description: 'Accounting, invoicing, expense management, financial planning, and tax tools.',
    subcategories: ['Accounting Software', 'Accounts Payable Software', 'Accounts Receivable Software', 'Budgeting & Forecasting Software', 'Financial Planning Software', 'Expense Management Software', 'Tax Management Software', 'Small Business Accounting Software', 'Financial Reporting Software'],
  },
  {
    id: '5', name: 'ERP', slug: 'erp', icon: 'layers', count: 4, featured: true,
    description: 'Enterprise resource planning systems for manufacturing, higher education, and operations.',
    subcategories: ['ERP Software', 'Manufacturing Software', 'Higher Education ERP Systems', 'Resource Management Software'],
  },
  {
    id: '6', name: 'Customer Service & Communication', slug: 'customer-service', icon: 'headphones', count: 24, featured: true,
    description: 'Customer support, call center, live chat, helpdesk, and contact center platforms.',
    subcategories: ['Customer Service Software', 'Help Desk Software', 'Live Chat Software', 'Call Center Software', 'VoIP Software', 'Call Tracking Software', 'Contact Center Software', 'Complaint Management Software', 'Remote Support Software'],
  },
  {
    id: '7', name: 'Marketing', slug: 'marketing', icon: 'zap', count: 28, featured: true,
    description: 'Email marketing, marketing automation, social media, and campaign management.',
    subcategories: ['Email Marketing Software', 'Marketing Automation Software', 'Social Media Marketing Software', 'Campaign Management Software', 'Lead Generation Software', 'Digital Marketing Software', 'SMS Marketing Software', 'Content Marketing Platforms'],
  },
  {
    id: '8', name: 'Digital Workspace & Productivity', slug: 'digital-workspace', icon: 'check-square', count: 23, featured: true,
    description: 'Collaboration, task management, video conferencing, and office productivity tools.',
    subcategories: ['Collaboration Software', 'Task Management Software', 'Video Conferencing Software', 'File Sharing Software', 'Online Meeting Software', 'Scheduling Software', 'Office Suite Software', 'Remote Desktop Software', 'Screen Recording Software'],
  },
  {
    id: '9', name: 'Data, Analytics & BI', slug: 'analytics-bi', icon: 'bar-chart-2', count: 33,
    description: 'Business intelligence, data visualization, analytics, and reporting tools.',
    subcategories: ['Business Intelligence Software', 'Data Visualization Software', 'Reporting Software', 'Predictive Analytics Software', 'Data Management Software', 'Dashboard Software', 'Web Analytics Software'],
  },
  {
    id: '10', name: 'Security', slug: 'security', icon: 'shield', count: 26,
    description: 'Cybersecurity, endpoint protection, identity management, and compliance tools.',
    subcategories: ['Cybersecurity Software', 'Endpoint Security Software', 'Network Security Software', 'Cloud Security Software', 'Password Management Software', 'Electronic Signature Software', 'SIEM Software'],
  },
  {
    id: '11', name: 'Cloud & Infrastructure', slug: 'cloud-infrastructure', icon: 'cloud', count: 9,
    description: 'Cloud management, network management, intranet, and infrastructure platforms.',
    subcategories: ['Cloud Management Software', 'Cloud Storage Software', 'Network Management Software', 'Intranet Software', 'Platform as a Service (PaaS)', 'Cloud Computing Services'],
  },
  {
    id: '12', name: 'Project & Product Management', slug: 'project-management', icon: 'check-square', count: 24,
    description: 'Agile project management, product roadmaps, issue tracking, and planning tools.',
    subcategories: ['Project Management Software', 'Agile Project Management Software', 'Product Management Software', 'Issue Tracking Software', 'Project Portfolio Management Software', 'Product Roadmap Software'],
  },
  {
    id: '13', name: 'Content Management', slug: 'content-management', icon: 'layers', count: 15,
    description: 'CMS, document management, digital asset management, and knowledge base tools.',
    subcategories: ['Content Management Software (CMS)', 'Document Management Software', 'Digital Asset Management Software', 'Knowledge Management Software', 'PDF Software', 'SEO Software'],
  },
  {
    id: '14', name: 'IT Administration', slug: 'it-administration', icon: 'cpu', count: 11,
    description: 'IT asset management, ITSM, incident management, and server management.',
    subcategories: ['ITSM Software', 'IT Asset Management Software', 'Incident Management Software', 'Server Management Software', 'Remote Monitoring and Management Software'],
  },
  {
    id: '15', name: 'Automation', slug: 'automation', icon: 'zap', count: 6,
    description: 'Robotic process automation, workflow automation, and intelligent automation.',
    subcategories: ['Robotic Process Automation Software', 'Workflow Management Software', 'Digital Process Automation Software', 'Intelligent Automation Software', 'Email Automation Software'],
  },
  {
    id: '16', name: 'Billing & Payments', slug: 'billing-payments', icon: 'shopping-cart', count: 9,
    description: 'Billing, invoicing, payment processing, and subscription management.',
    subcategories: ['Billing And Invoicing Software', 'Online Payment Software', 'Subscription Management Software', 'Expense Management Software', 'E-Invoicing Software'],
  },
  {
    id: '17', name: 'Learning Management', slug: 'learning-management', icon: 'check-square', count: 11,
    description: 'LMS, e-learning, employee training, and online course platforms.',
    subcategories: ['Learning Management Software', 'Employee Training Software', 'Online Course Platforms', 'Virtual Classroom Software', 'eLearning Authoring Tools'],
  },
  {
    id: '18', name: 'Supply Chain Management', slug: 'supply-chain', icon: 'layers', count: 9,
    description: 'Logistics, shipping, supply chain planning, and transportation management.',
    subcategories: ['Supply Chain Management Software', 'Logistics Software', 'Shipping Software', 'Transportation Management Systems', 'Quality Management Software'],
  },
  {
    id: '19', name: 'Creativity & Design', slug: 'creativity-design', icon: 'zap', count: 21,
    description: 'Graphic design, video editing, UI prototyping, and creative production tools.',
    subcategories: ['Graphic Design Software', 'Video Editing Software', 'Prototyping Software', '3D CAD Software', 'Photo Editing Software', 'Animation Software'],
  },
  {
    id: '20', name: 'Business Process Management', slug: 'business-process', icon: 'bar-chart-2', count: 13,
    description: 'BPM, workflow, field service, KPI tracking, and business performance tools.',
    subcategories: ['Business Process Management Software', 'Workflow Management Software', 'Field Service Software', 'KPI Software', 'Quoting Software'],
  },
  {
    id: '21', name: 'Procurement & Vendor Management', slug: 'procurement', icon: 'shopping-cart', count: 4,
    description: 'Procurement, purchase orders, strategic sourcing, and vendor management.',
    subcategories: ['Procurement Software', 'Purchase Order Software', 'Strategic Sourcing Software', 'Vendor Management Systems'],
  },
  {
    id: '22', name: 'Corporate & Legal', slug: 'corporate-legal', icon: 'check-square', count: 9,
    description: 'Contract management, legal software, board management, and compliance.',
    subcategories: ['Contract Management Software', 'Legal Software', 'Board Management Software', 'eDiscovery Software', 'ESOP Management Software'],
  },
  {
    id: '23', name: 'Governance, Risk & Compliance', slug: 'grc', icon: 'shield', count: 2,
    description: 'Compliance management and risk management platforms.',
    subcategories: ['Compliance Management Software', 'Risk Management Software'],
  },
  {
    id: '24', name: 'ESG & Sustainability', slug: 'esg', icon: 'layers', count: 3,
    description: 'EHS, sustainability data management, and waste management tools.',
    subcategories: ['EHS Software', 'Sustainability Data Management', 'Waste Management Software'],
  },
  {
    id: '25', name: 'Development Platforms', slug: 'development', icon: 'cpu', count: 20,
    description: 'Low-code/no-code, DevOps, mobile app development, and bug tracking tools.',
    subcategories: ['Low Code / No Code Development Platform', 'DevOps Software', 'Mobile App Development Platform', 'Bug Tracking Software', 'Website Builder Software'],
  },
  {
    id: '26', name: 'Administration', slug: 'administration', icon: 'check-square', count: 12,
    description: 'Asset management, inventory, facility management, and visitor systems.',
    subcategories: ['Asset Management Software', 'Inventory Management Software', 'Facility Management Software', 'Warehouse Management Software', 'Visitor Management Systems'],
  },
  {
    id: '27', name: 'Identity & Access Management', slug: 'iam', icon: 'shield', count: 2,
    description: 'Identity management and membership management platforms.',
    subcategories: ['Identity Management Software', 'Membership Management Software'],
  },
  {
    id: '28', name: 'Quality Assurance', slug: 'quality-assurance', icon: 'check-square', count: 3,
    description: 'Inspection, HOA management, and statistical process control.',
    subcategories: ['Inspection Software', 'Statistical Process Control Software'],
  },
  {
    id: '29', name: 'Apparel Management', slug: 'apparel', icon: 'layers', count: 4,
    description: 'Fashion ERP, MRP, and apparel management systems.',
    subcategories: ['Apparel ERP Software', 'MRP Software', 'Fashion Design Software'],
  },
  {
    id: '30', name: 'Blockchain', slug: 'blockchain', icon: 'cpu', count: 1,
    description: 'Blockchain services and distributed ledger platforms.',
    subcategories: ['Blockchain Services Software'],
  },
  {
    id: '31', name: 'Internet Publishing', slug: 'internet-publishing', icon: 'zap', count: 3,
    description: 'Blog software, landing page builders, and web-to-print platforms.',
    subcategories: ['Blog Software', 'Landing Page Software', 'Web To Print Software'],
  },
  {
    id: '32', name: 'Retail & Hospitality', slug: 'retail-hospitality', icon: 'shopping-cart', count: 22,
    description: 'POS systems, hotel management, restaurant software, and retail tools.',
    subcategories: ['Restaurant POS Systems', 'Hotel Management Software', 'Retail Management Software', 'Food Delivery Software', 'Ecommerce Software'],
  },
  {
    id: '33', name: 'Healthcare & Medical', slug: 'healthcare', icon: 'user-check', count: 18,
    description: 'Electronic medical records, practice management, and healthcare platforms.',
    subcategories: ['Electronic Medical Records Software', 'Medical Practice Management Software', 'Telemedicine Software', 'Healthcare CRM', 'Pharmacy Software'],
  },
  {
    id: '34', name: 'Construction & Real Estate', slug: 'construction-real-estate', icon: 'layers', count: 16,
    description: 'Construction management, property management, and real estate tools.',
    subcategories: ['Construction Management Software', 'Property Management Software', 'Real Estate CRM Software', 'Construction Estimating Software'],
  },
  {
    id: '35', name: 'Field Service & Logistics', slug: 'field-service', icon: 'zap', count: 12,
    description: 'Fleet management, dispatch, route planning, and delivery software.',
    subcategories: ['Fleet Management Software', 'Field Service Management Software', 'Dispatch Software', 'Route Planning Software', 'Delivery Scheduling Software'],
  },
];

export const featuredCategories = softwareCategories.filter(c => c.featured);

export const getCategoryBySlug = (slug: string) =>
  softwareCategories.find(c => c.slug === slug);
