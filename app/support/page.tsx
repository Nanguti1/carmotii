"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  FileText,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// FAQ Data
const faqs = [
  {
    question: "How do I book a car?",
    answer:
      "To book a car, simply browse our available vehicles, select your preferred dates, and complete the booking process. You'll need to provide your driver's license and payment information.",
  },
  {
    question: "What are the insurance requirements?",
    answer:
      "All rentals include comprehensive insurance coverage. However, you must have a valid driver's license and meet our minimum age requirements. Additional insurance options are available during booking.",
  },
  {
    question: "How do I cancel a booking?",
    answer:
      "You can cancel your booking through your account dashboard or by contacting our support team. Please refer to our cancellation policy for details on refunds and fees.",
  },
  {
    question: "What happens if the car breaks down?",
    answer:
      "We provide 24/7 roadside assistance. If your car breaks down, contact our support team immediately, and we'll arrange for assistance or a replacement vehicle.",
  },
  {
    question: "How do I become a host?",
    answer:
      "To become a host, visit our 'Become a Host' page, complete the registration process, and list your car. You'll need to provide vehicle documentation and complete our verification process.",
  },
];

// Safety Guidelines
const safetyGuidelines = [
  {
    title: "Vehicle Inspection",
    description:
      "Always inspect the vehicle before driving. Check for any existing damage and report it immediately.",
    icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Emergency Contacts",
    description:
      "Save our emergency contact numbers in your phone. We're available 24/7 for assistance.",
    icon: <Phone className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Safe Driving",
    description:
      "Follow all traffic laws and speed limits. Never drive under the influence of alcohol or drugs.",
    icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Documentation",
    description:
      "Keep all rental documents and insurance information in the vehicle at all times.",
    icon: <FileText className="h-6 w-6 text-blue-500" />,
  },
];

// Refund Policy
const refundPolicy = {
  title: "Refund & Cancellation Policy",
  sections: [
    {
      title: "Cancellation Window",
      description:
        "Free cancellation up to 24 hours before the rental start time. Cancellations within 24 hours may incur a fee.",
    },
    {
      title: "Refund Processing",
      description:
        "Refunds are processed within 5-7 business days. The amount refunded depends on the cancellation timing and any applicable fees.",
    },
    {
      title: "No-Show Policy",
      description:
        "Failure to pick up the vehicle without prior cancellation will result in a charge of one day's rental fee.",
    },
    {
      title: "Force Majeure",
      description:
        "In case of natural disasters or other force majeure events, we offer full refunds or rescheduling options.",
    },
  ],
};

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

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
              backgroundImage: "url('/images/car-12.jpg')",
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
              How Can We{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Help?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 text-lg text-gray-200 sm:text-xl"
            >
              Find answers to your questions or get in touch with our support
              team
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <span>+254 700 000 000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <span>support@carmotii.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - FAQs and Guidelines */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                        className="flex w-full items-center justify-between"
                      >
                        <span className="font-medium">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-gray-600"
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Safety Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-500" />
                  Safety Guidelines
                </CardTitle>
                <CardDescription>
                  Important safety information for all users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {safetyGuidelines.map((guideline, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-gray-200 p-4"
                    >
                      {guideline.icon}
                      <div>
                        <h4 className="font-medium">{guideline.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {guideline.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Refund Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  {refundPolicy.title}
                </CardTitle>
                <CardDescription>
                  Understanding our refund and cancellation policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {refundPolicy.sections.map((section, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <h4 className="font-medium">{section.title}</h4>
                      <p className="mt-1 text-gray-600">
                        {section.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
