import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import NetworkCursor from '@/components/NetworkCursor';

export const metadata = {
  title: 'Team OmniAI - We find the problem. Then we build the fix.',
  description: 'Cross-functional team solving business growth problems with AI, engineering, design, and marketing.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NetworkCursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
