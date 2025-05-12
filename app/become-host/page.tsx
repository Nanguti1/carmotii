"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Car,
  ShieldCheck,
  Wallet,
  Clock,
  Star,
  ChevronRight,
  CheckCircle2,
  Phone,
  CreditCard,
  ArrowRight,
  Search,
  Calendar,
  MapPin,
} from "lucide-react";

// Benefits data
const benefits = [
  {
    icon: <Wallet className="h-8 w-8 text-blue-500" />,
    title: "Earn Passive Income",
    description:
      "Turn your parked car into a source of income. Set your own rates and availability.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
    title: "Fully Insured",
    description:
      "All rentals are covered by comprehensive insurance. Your car is protected 24/7.",
  },
  {
    icon: <Clock className="h-8 w-8 text-blue-500" />,
    title: "Flexible Schedule",
    description:
      "Choose when your car is available. Block dates for personal use anytime.",
  },
  {
    icon: <Star className="h-8 w-8 text-blue-500" />,
    title: "Verified Renters",
    description:
      "All renters are verified and rated. You can review their profiles before accepting.",
  },
];

// Process steps for owners
const ownerSteps = [
  {
    number: "01",
    title: "Create Your Listing",
    description:
      "Add your car details, photos, and set your availability and pricing.",
    icon: <Car className="h-6 w-6 text-blue-500" />,
  },
  {
    number: "02",
    title: "Verify Your Identity",
    description:
      "Complete our verification process to ensure a safe community.",
    icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
  },
  {
    number: "03",
    title: "Pay Listing Fee",
    description:
      "Pay a one-time listing fee of Kes. 2,000 via M-Pesa to activate your listing.",
    icon: <Wallet className="h-6 w-6 text-blue-500" />,
  },
  {
    number: "04",
    title: "Start Earning",
    description:
      "Your car will be visible to potential renters. Start earning from day one.",
    icon: <Star className="h-6 w-6 text-blue-500" />,
  },
];

// Process steps for renters
const renterSteps = [
  {
    number: "01",
    title: "Browse Cars",
    description:
      "Search and filter through our extensive collection of vehicles.",
    icon: <Search className="h-6 w-6 text-blue-500" />,
  },
  {
    number: "02",
    title: "Book Your Ride",
    description: "Select your dates and complete the booking process.",
    icon: <Calendar className="h-6 w-6 text-blue-500" />,
  },
  {
    number: "03",
    title: "Verify & Pay",
    description: "Complete identity verification and pay securely via M-Pesa.",
    icon: <CreditCard className="h-6 w-6 text-blue-500" />,
  },
  {
    number: "04",
    title: "Hit the Road",
    description: "Pick up your car and enjoy your journey with peace of mind.",
    icon: <MapPin className="h-6 w-6 text-blue-500" />,
  },
];

// M-Pesa Integration Component
function MPesaPayment() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate M-Pesa payment process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    // Here you would integrate with actual M-Pesa API
  };

  return (
    <Card className="border-2 border-blue-100 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Phone className="h-5 w-5 text-blue-500" />
          M-Pesa Payment
        </CardTitle>
        <CardDescription>
          Pay the one-time listing fee of Kes. 2,000 via M-Pesa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              M-Pesa Phone Number
            </label>
            <Input
              type="tel"
              placeholder="e.g., 254700000000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            onClick={handlePayment}
            disabled={!phoneNumber || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                Pay Kes. 2,000
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-xs text-gray-500">
            You will receive an M-Pesa prompt on your phone to complete the
            payment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BecomeHost() {
  const [activeTab, setActiveTab] = useState("owner");

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
              backgroundImage: "url('/images/car-11.jpg')",
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
              Become a{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Host
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 text-lg text-gray-200 sm:text-xl"
            >
              Turn your car into a source of income. Join our community of car
              owners.
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center text-white/50"
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronRight className="h-5 w-5 rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold">Why Host with Us?</h2>
            <p className="mt-4 text-gray-600">
              Join thousands of car owners who are already earning with our
              platform
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">{benefit.icon}</div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-gray-600">
              Simple steps for both car owners and renters
            </p>
          </motion.div>

          {/* Tabs for Owner/Renter */}
          <div className="mt-12">
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className={`rounded-full px-8 ${
                  activeTab === "owner"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("owner")}
              >
                For Car Owners
              </Button>
              <Button
                variant="outline"
                className={`rounded-full px-8 ${
                  activeTab === "renter"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("renter")}
              >
                For Renters
              </Button>
            </div>

            {/* Owner Steps */}
            <AnimatePresence mode="wait">
              {activeTab === "owner" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-12"
                >
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {ownerSteps.map((step, index) => (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="relative h-full overflow-hidden">
                          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50" />
                          <CardContent className="relative p-6">
                            <div className="mb-4 flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                {step.icon}
                              </div>
                              <div className="text-4xl font-bold text-blue-500">
                                {step.number}
                              </div>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                              {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                            {index < ownerSteps.length - 1 && (
                              <ChevronRight className="absolute right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-gray-300 lg:block" />
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Renter Steps */}
              {activeTab === "renter" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-12"
                >
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {renterSteps.map((step, index) => (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="relative h-full overflow-hidden">
                          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50" />
                          <CardContent className="relative p-6">
                            <div className="mb-4 flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                {step.icon}
                              </div>
                              <div className="text-4xl font-bold text-blue-500">
                                {step.number}
                              </div>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                              {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                            {index < renterSteps.length - 1 && (
                              <ChevronRight className="absolute right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-gray-300 lg:block" />
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="mt-4 text-gray-600">
                Complete your listing by paying the one-time fee via M-Pesa
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <MPesaPayment />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-500">
                By proceeding, you agree to our{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
