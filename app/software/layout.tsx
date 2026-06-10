import GatewayHeader from '@/components/GatewayHeader';
import ZainChatbot from '@/components/ZainChatbot';

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GatewayHeader />
      {children}
      {/* FloatingBuilders hidden — accessible via top-bar CTAs on the software page */}
      <ZainChatbot />
    </>
  );
}
