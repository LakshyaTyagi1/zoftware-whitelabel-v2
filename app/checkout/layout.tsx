import GatewayHeader from '@/components/GatewayHeader';
import FloatingBuilders from '@/components/FloatingBuilders';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GatewayHeader />
      {children}
      <FloatingBuilders />
    </>
  );
}
