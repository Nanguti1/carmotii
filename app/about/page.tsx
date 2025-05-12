"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Car,
  Users,
  Heart,
  ShieldCheck,
  Star,
  ChevronRight,
  Target,
  Lightbulb,
  Globe,
} from "lucide-react";

// Values Data
const values = [
  {
    title: "Community First",
    description:
      "We believe in building a strong community of car owners and renters who trust and support each other.",
    icon: <Users className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Sustainable Mobility",
    description:
      "By enabling car sharing, we're reducing the number of cars on the road and promoting sustainable transportation.",
    icon: <Globe className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Trust & Safety",
    description:
      "We prioritize the safety and security of our community through rigorous verification and insurance coverage.",
    icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Innovation",
    description:
      "We continuously innovate to provide the best car sharing experience through technology and user feedback.",
    icon: <Lightbulb className="h-8 w-8 text-blue-500" />,
  },
];

// Team Stats
const stats = [
  {
    value: "10K+",
    label: "Active Users",
    icon: <Users className="h-6 w-6 text-blue-500" />,
  },
  {
    value: "5K+",
    label: "Cars Listed",
    icon: <Car className="h-6 w-6 text-blue-500" />,
  },
  {
    value: "4.9",
    label: "User Rating",
    icon: <Star className="h-6 w-6 text-blue-500" />,
  },
  {
    value: "24/7",
    label: "Support",
    icon: <Heart className="h-6 w-6 text-blue-500" />,
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[33vh] w-full overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/car-13.jpg')",
              transform: "scale(1.1)",
            }}
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Story
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 text-lg text-gray-200 sm:text-xl"
            >
              Revolutionizing car sharing in Kenya
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Brand Story */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold">Our Journey</h2>
              <p className="mt-6 text-lg text-gray-600">
                Carmotii was born from a simple observation: too many cars sit
                idle while others struggle to find affordable transportation. We
                saw an opportunity to create a community-driven solution that
                benefits both car owners and those in need of temporary
                transportation.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Starting in Nairobi in 2023, we've grown from a small team of
                passionate individuals to a platform serving thousands of users
                across Kenya. Our success is built on trust, innovation, and a
                deep commitment to our community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    To make car ownership more accessible and sustainable by
                    creating a trusted community where car sharing becomes a
                    natural part of daily life. We're committed to providing
                    affordable, convenient, and safe transportation solutions
                    while empowering car owners to earn from their assets.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-500" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    To become Kenya's leading car sharing platform, transforming
                    how people think about car ownership and transportation. We
                    envision a future where car sharing is the norm, reducing
                    traffic congestion and environmental impact while making
                    transportation more accessible to all.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="mt-4 text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mb-2 flex justify-center">{stat.icon}</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-blue-600 px-8 py-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="mt-4 text-blue-100">
              Be part of Kenya's fastest-growing car sharing platform
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="group relative cursor-pointer overflow-hidden bg-white px-8 py-6 text-lg font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg hover:shadow-white/25"
              >
                <span className="relative z-10 flex items-center">
                  List Your Car
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-10 translate-y-full bg-blue-50 transition-transform duration-300 group-hover:translate-y-0" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group relative cursor-pointer overflow-hidden border-white/20 bg-white/10 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
              >
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 -z-10 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
