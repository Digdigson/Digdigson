import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Bio from '@/components/Bio';
import Credits from '@/components/Credits';
import Music from '@/components/Music';
import Studio from '@/components/Studio';
import News from '@/components/News';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Bio />
      <Credits />
      <Music />
      <Studio />
      <News />
      <Contact />
      <Footer />
    </main>
  );
}

