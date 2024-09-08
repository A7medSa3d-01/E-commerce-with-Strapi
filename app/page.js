import Image from "next/image";
import Hero from "./_components/Hero";
import ProductSection from "./_components/ProductSection";

export const metadata = {
  title: 'E-commerce',
  description: 'E-commerce App',
  icons: {
    icon: '/logo.svg',
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductSection />
    </div>
  );
}
