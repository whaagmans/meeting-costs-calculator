import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function Home() {
  return (
    <main
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <div>hoi</div>
      <Button onClick={() => alert('test')}>test</Button>
    </main>
  );
}
