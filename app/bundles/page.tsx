import { redirect } from 'next/navigation';
// Bundles are shown on the software page under the Bundles tab
export default function BundlesPage() {
  redirect('/software?view=bundles');
}
