"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  XCircle,
  Phone,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  Car,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

// Pricing plans data
const plans = [
  {
    name: "Basic",
    price: "2,000",
    description: "Perfect for occasional car sharing",
    features: [
      "One-time listing fee",
      "Basic listing features",
      "Standard support",
      "Basic insurance coverage",
      "Up to 5 bookings per month",
    ],
    limitations: [
      "No priority listing",
      "Standard verification process",
      "Basic analytics",
    ],
    recommended: false,
  },
  {
    name: "Premium",
    price: "5,000",
    description: "Best for active car owners",
    features: [
      "One-time listing fee",
      "Priority listing placement",
      "Premium support",
      "Enhanced insurance coverage",
      "Unlimited bookings",
      "Advanced analytics",
      "Fast-track verification",
      "Featured in search results",
    ],
    limitations: [],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "10,000",
    description: "For fleet owners and businesses",
    features: [
      "One-time listing fee",
      "Multiple car listings",
      "Dedicated account manager",
      "Premium insurance coverage",
      "Unlimited bookings",
      "Advanced analytics & reporting",
      "Instant verification",
      "Priority support 24/7",
      "Custom branding options",
      "API access",
    ],
    limitations: [],
    recommended: false,
  },
];

// M-Pesa Integration Component
function MPesaPayment({ plan }: { plan: string }) {
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
          Pay the one-time listing fee via M-Pesa
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
                Pay Kes. {plans.find((p) => p.name === plan)?.price}
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

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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
              backgroundImage: "url('/images/car-10.jpg')",
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
              Simple,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Transparent
              </span>{" "}
              Pricing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 text-lg text-gray-200 sm:text-xl"
            >
              Choose the perfect plan for your car sharing needs
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

      {/* Pricing Plans Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`relative h-full ${
                    plan.recommended ? "border-2 border-blue-500 shadow-lg" : ""
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-sm text-white">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">
                        Kes. {plan.price}
                      </span>
                      <span className="text-gray-500"> /one-time</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold">What's included:</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="mb-2 font-semibold">Limitations:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation) => (
                              <li
                                key={limitation}
                                className="flex items-center gap-2 text-gray-500"
                              >
                                <XCircle className="h-5 w-5" />
                                <span>{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.recommended ? "default" : "outline"}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      {selectedPlan && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold">Complete Your Purchase</h2>
                <p className="mt-4 text-gray-600">
                  Pay securely via M-Pesa to activate your {selectedPlan} plan
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8"
              >
                <MPesaPayment plan={selectedPlan} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
      )}

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  How does the one-time fee work?
                </h3>
                <p className="text-gray-600">
                  The one-time listing fee is a single payment that activates
                  your car listing on our platform. There are no recurring
                  charges or hidden fees.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  Can I upgrade my plan later?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade your plan at any time. The difference in
                  the one-time fee will be calculated and charged accordingly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  Is the M-Pesa payment secure?
                </h3>
                <p className="text-gray-600">
                  Yes, all M-Pesa transactions are secure and encrypted. We use
                  Safaricom's official API for all payments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  What happens after payment?
                </h3>
                <p className="text-gray-600">
                  After successful payment, your listing will be activated
                  immediately. You can then complete your car details and start
                  accepting bookings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
