import { redirect } from 'next/navigation';

// Root redirects to the Dubai Chamber white-label demo — the primary entry point
export default function RootPage() {
  redirect('/dubai-chamber');
}
