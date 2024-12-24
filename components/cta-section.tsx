"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')] opacity-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Transform Your Institution Today
        </h2>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-10">
          Join thousands of educational institutions already using MyEschool to 
          revolutionize their learning environment.
        </p>
        <Button size="lg" variant="faded" className="bg-white text-primary-600 border border-primary-600">
          Get Started For Free 
        </Button>
      </motion.div>
    </section>
  );
}