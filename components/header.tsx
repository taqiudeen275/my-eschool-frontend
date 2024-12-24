"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// interface HeaderProps {
//     bgOpacity: MotionValue<number>;
//   }
  
  const Header: React.FC = () => {
const { scrollYProgress } = useScroll();
  const headerBgOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <motion.header
      className="fixed top-0 z-50 w-full bg-white backdrop-blur-sm"
      style={{ backgroundColor: `rgba(255, 255, 255, ${headerBgOpacity})` }}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center text-xl font-bold text-gray-900"
        >
          My <span className="text-primary-600 ml-2">E</span>School
        </motion.div>
  
        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden items-center gap-8 md:flex"
        >
          {["Features", "Pricing", "Contact"].map((item) => (
            <motion.a
              key={item}
              whileHover={{ y: -2 }}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {item}
            </motion.a>
          ))}
          <Link href={"/auth/login"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
            >
              Sign in
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Get Started
          </motion.button>
        </motion.div>
  
        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="flex flex-col gap-1.5"
            >
              <span className="block h-0.5 w-6 bg-gray-900"></span>
              <span className="block h-0.5 w-6 bg-gray-900"></span>
              <span className="block h-0.5 w-6 bg-gray-900"></span>
            </motion.div>
          </button>
        </div>
      </nav>
  
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute inset-x-0 top-16 bg-white shadow-lg md:hidden"
        >
          <div className="flex flex-col items-center gap-4 px-4 py-4">
            {["Features", "Pricing", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Link href={"/auth/login"}>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
              >
                Sign in
              </button>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
    );
  };
  
export default Header;