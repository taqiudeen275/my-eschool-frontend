"use client";
import {
  motion,
  useInView,
} from "framer-motion";
import { CTASection } from "@/components/cta-section";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { TestimonialsSection } from "@/components/testimonies";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

interface FooterSection {
  title: string;
  links: Array<{
    text: string;
    href: string;
  }>;
}

const footerSections: Record<string, FooterSection> = {
  Product: {
    title: "Product",
    links: [
      { text: "Features", href: "#" },
      { text: "Pricing", href: "#" },
      { text: "Security", href: "#" },
    ],
  },
  Company: {
    title: "Company",
    links: [
      { text: "About", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Contact", href: "#" },
    ],
  },
  Legal: {
    title: "Legal",
    links: [
      { text: "Privacy", href: "#" },
      { text: "Terms", href: "#" },
      { text: "Security", href: "#" },
    ],
  },
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FooterColumn: React.FC<{ section: FooterSection; delay: number }> = ({
  section,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <h4 className="mb-4 font-semibold text-white">{section.title}</h4>
      <ul className="space-y-2 text-sm">
        {section.links.map((link) => (
          <li key={link.text}>
            <motion.a
              whileHover={{ x: 5 }}
              href={link.href}
              className="inline-block hover:text-primary-500"
            >
              {link.text}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  
  return (
    <div className="min-h-screen bg-white">

      <main>
        <AnimatedSection>
          <Hero />
        </AnimatedSection>

        <AnimatedSection>
          <Features />
        </AnimatedSection>

        <AnimatedSection>
          <Pricing />
        </AnimatedSection>

        <AnimatedSection>
          <TestimonialsSection />
        </AnimatedSection>

        <AnimatedSection>
          <CTASection />
        </AnimatedSection>
      </main>

      <footer className="bg-primary-50-900 py-12 text-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-4"
          >
            <div>
              <div className="mb-4 flex items-center text-xl font-bold">
                My <span className="text-primary-600 ml-2">E</span>School
              </div>
              <p className="text-sm">
                Revolutionizing education management with modern solutions.
              </p>
            </div>
            {Object.entries(footerSections).map(([key, section], index) => (
              <FooterColumn key={key} section={section} delay={index * 0.1} />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 border-t border-gray-800 pt-8 text-center text-sm"
          >
            <p>&copy; 2024 ESchool. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
