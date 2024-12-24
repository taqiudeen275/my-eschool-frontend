"use client";

import { Avatar, Card } from "@nextui-org/react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "MyEschool has revolutionized how we manage our institution. The AI-driven insights have been invaluable.",
    author: "Dr. Sarah Chen",
    role: "Principal, International Academy",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    quote: "The automated scheduling alone has saved us countless hours. This platform is a game-changer.",
    author: "Michael Thompson",
    role: "Administrator, Tech High",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  },
  {
    quote: "Student engagement has increased significantly since we started using MyEschool's virtual classrooms.",
    author: "Prof. Emily Rodriguez",
    role: "Department Head, Digital University",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Educators Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what education leaders are saying about MyEschool
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex flex-col h-full">
                  <blockquote className="text-gray-600 mb-6 flex-grow">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12" src={testimonial.image}>
                    </Avatar>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}