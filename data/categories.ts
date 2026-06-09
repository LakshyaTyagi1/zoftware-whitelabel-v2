export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  icon: string;
};

export const categories: Category[] = [
  { id: '1', slug: 'crm', name: 'CRM', description: 'Customer relationship management', count: 142, icon: 'users' },
  { id: '2', slug: 'erp', name: 'ERP', description: 'Enterprise resource planning', count: 86, icon: 'layers' },
  { id: '3', slug: 'hr', name: 'Human Resources', description: 'HR, payroll & people ops', count: 118, icon: 'user-check' },
  { id: '4', slug: 'accounting', name: 'Accounting', description: 'Finance, invoicing & tax', count: 94, icon: 'bar-chart-2' },
  { id: '5', slug: 'project-management', name: 'Project Management', description: 'Task and project tracking', count: 156, icon: 'check-square' },
  { id: '6', slug: 'collaboration', name: 'Collaboration', description: 'Team communication tools', count: 72, icon: 'message-square' },
  { id: '7', slug: 'ai-tools', name: 'AI Tools', description: 'Generative AI & automation', count: 210, icon: 'cpu' },
  { id: '8', slug: 'customer-support', name: 'Customer Support', description: 'Helpdesk & ticketing', count: 98, icon: 'headphones' },
  { id: '9', slug: 'ecommerce', name: 'E-Commerce', description: 'Online store & retail', count: 64, icon: 'shopping-cart' },
  { id: '10', slug: 'productivity', name: 'Productivity', description: 'Suites & workflow tools', count: 88, icon: 'zap' },
  { id: '11', slug: 'security', name: 'Cybersecurity', description: 'Security & compliance', count: 76, icon: 'shield' },
  { id: '12', slug: 'cloud-it', name: 'Cloud & IT', description: 'Infrastructure & DevOps', count: 112, icon: 'cloud' },
];
