import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Hits } from "@/components/Hits";
import { Menu } from "@/components/Menu";
import { MotionRoot } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <MotionRoot>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <About />
        <Hits />
        <Menu />
        <Reviews />
        <Booking />
      </main>
      <Footer />
    </MotionRoot>
  );
}
