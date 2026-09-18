import ContactSection from '@/components/ContactSection';
import FloatingActions from '@/components/FloatingActions';

export const metadata = { title: 'Contact - Team OmniAI' };

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
      <FloatingActions />
    </main>
  );
}
