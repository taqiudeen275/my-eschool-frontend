"use client"
import React from 'react';
import { Book, User, Calendar, MessageSquare, Chart, Settings } from 'iconsax-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Book size="32" color="#e8007a" variant="Bulk" className="h-6 w-6" />,
    title: 'Course Management',
    description: 'Easily create, organize, and manage courses with our intuitive interface.',
  },
  {
    icon: <User color="#e8007a" variant="Bulk" className="h-6 w-6" />,
    title: 'Student Portal',
    description: 'Give students access to assignments, grades, and resources in one place.',
  },
  {
    icon: <Calendar color="#e8007a" variant="Bulk" className="h-6 w-6" />,
    title: 'Scheduling',
    description: 'Automated timetable generation and calendar management system.',
  },
  {
    icon: <MessageSquare color="#e8007a" variant="Bulk" className="h-6 w-6" />,
    title: 'Communication',
    description: 'Built-in messaging and notification system for staff and students.',
  },
  {
    icon: <Chart color="#e8007a" variant="Bulk" className="h-6 w-6" />,
    title: 'Analytics',
    description: 'Comprehensive reporting and analytics for data-driven decisions.',
  },
  {
    icon: <Settings color="#e8007a" variant="Bulk" className="h-6 w-6" />,
    title: 'Administration',
    description: 'Streamlined administrative tools for efficient school management.',
  },
];

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need to Run Your Institution
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our comprehensive suite of tools helps you manage every aspect of your educational institution efficiently.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <motion.div 
                className="mb-4 inline-block rounded-lg bg-primary-50 p-3 text-primary-600"
                whileHover="hover"
                variants={iconVariants}
              >
                {feature.icon}
              </motion.div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mb-4 text-gray-600">
                {feature.description}
              </p>
              <motion.a
                href="#"
                className="inline-flex items-center text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn more →
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}