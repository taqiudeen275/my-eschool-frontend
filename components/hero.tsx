"use client"
import React from 'react';
import { ArrowRight, Chart, LayoutMaximize } from 'iconsax-react';
import { motion } from 'framer-motion';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      x: 20,
      y: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
              variants={itemVariants}
            >
              Revolutionize Education Management with Our{' '}
              <span className="text-primary-600">Modular SaaS Suite</span>
            </motion.h1>
            
            <motion.p 
              className="mb-8 text-lg text-gray-600 md:text-xl"
              variants={itemVariants}
            >
              A seamless, customizable platform for schools, colleges, and universities to streamline administration, learning, and communication
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-4"
              variants={itemVariants}
            >
              <motion.button 
                className="group flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started for Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
              
              <motion.button 
                className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={cardContainerVariants}
          >
            <div className="relative flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-50 to-indigo-50"
                animate={{ 
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, 0] 
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative grid grid-cols-2 gap-4 p-8">
                <DashboardCard
                  icon={<Chart className="h-6 w-6 text-primary-600" />}
                  title="Analytics"
                  value="87%"
                  variants={cardVariants}
                />
                <DashboardCard
                  icon={<LayoutMaximize className="h-6 w-6 text-green-600" />}
                  title="Courses"
                  value="245"
                  variants={cardVariants}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardCard({ 
  icon, 
  title, 
  value, 
  variants 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any;
}) {
  return (
    <motion.div 
      className="rounded-xl bg-white p-4 shadow-lg"
      variants={variants}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </motion.div>
  );
}