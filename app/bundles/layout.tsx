import GatewayHeader from '@/components/GatewayHeader';
import FloatingBuilders from '@/components/FloatingBuilders';

export default function BundlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GatewayHeader />
      {children}
      <FloatingBuilders />
    </>
  );
}
