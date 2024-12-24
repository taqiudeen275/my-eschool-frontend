"use client"
"use client"
import React, { useState } from 'react';
import { Check } from 'iconsax-react';
import { Button } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for small schools and institutions',
    features: [
      'Up to 500 students',
      'Basic course management',
      'Student portal',
      'Basic reporting',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: { monthly: 99, annual: 89 },
    description: 'Ideal for growing educational institutions',
    features: [
      'Up to 2000 students',
      'Advanced course management',
      'Custom branding',
      'Advanced analytics',
      'Priority support',
      'API access',
    ],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 199, annual: 179 },
    description: 'For large institutions with complex needs',
    features: [
      'Unlimited students',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Custom features',
      'On-premise option',
    ],
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

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

  const cardVariants = {
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

  const priceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Choose the perfect plan for your institution&apos;s needs
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <motion.span 
              className={`text-sm ${!isAnnual ? 'font-semibold text-gray-900' : 'text-gray-500'}`}
              animate={{ opacity: !isAnnual ? 1 : 0.7 }}
            >
              Monthly
            </motion.span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-primary-600' : 'bg-gray-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="inline-block h-4 w-4 rounded-full bg-white"
                animate={{ x: isAnnual ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <motion.span 
              className={`text-sm ${isAnnual ? 'font-semibold text-gray-900' : 'text-gray-500'}`}
              animate={{ opacity: isAnnual ? 1 : 0.7 }}
            >
              Annual
              <span className="ml-1 text-xs text-green-600">(Save 20%)</span>
            </motion.span>
          </div>
        </motion.div>

        <motion.div 
          className="grid gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className={`rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200 ${
                plan.recommended ? 'relative ring-2 ring-primary-600' : ''
              }`}
            >
              {plan.recommended && (
                <motion.span 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-sm font-medium text-white"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Recommended
                </motion.span>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={isAnnual ? 'annual' : 'monthly'}
                    className="flex items-baseline"
                    variants={priceVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <span className="text-4xl font-bold text-gray-900">
                      GH₵{isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="ml-1 text-gray-500">/month</span>
                  </motion.p>
                </AnimatePresence>
              </div>
              <motion.ul className="mb-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-center gap-3 text-gray-600"
                    variants={featureVariants}
                    custom={index}
                  >
                    <Check className="h-5 w-5 text-green-500" />
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    plan.recommended
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get started
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}