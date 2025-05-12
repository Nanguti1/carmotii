"use client";

import { Suspense, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Car,
  Star,
  ChevronRight,
  Clock,
  Key,
  ShieldCheck,
  User,
  Menu,
  X,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

// Types
interface CarType {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  location: string;
}

interface ReviewType {
  id: string;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
}

// 3D Car Model Component
function CarModel(props: any) {
  // This is a placeholder - in a real app you'd load an actual model
  // const { scene } = useGLTF("/car.glb");

  return (
    <mesh {...props} rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[3, 1, 6]} />
      <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      <mesh position={[1.5, 0.5, -2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-1.5, 0.5, -2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[1.5, 0.5, 2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-1.5, 0.5, 2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </mesh>
  );
}

// Hero Component
function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
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
            className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Find. Book.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Drive.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-xl text-gray-200 sm:text-2xl"
          >
            Peer-to-peer car sharing that just works.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="group bg-blue-500 px-8 py-6 text-lg font-semibold hover:bg-blue-600"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/10 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Learn More
            </Button>
          </motion.div>
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
  );
}

// Car Card Component with loading state
function CarCard({ car }: { car: CarType }) {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={car.image}
            alt={car.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{car.name}</CardTitle>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{car.rating}</span>
          </div>
        </div>
        <CardDescription className="mt-1">{car.location}</CardDescription>
        <div className="mt-4 text-xl font-bold text-blue-600">
          ${car.price}{" "}
          <span className="text-sm font-normal text-gray-500">/day</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 p-4">
        <Button
          variant="outline"
          size="sm"
          className="group-hover:border-blue-500 group-hover:text-blue-500"
        >
          Details
        </Button>
        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}

// Car Card Skeleton
function CarCardSkeleton() {
  return (
    <Card className="w-80 overflow-hidden">
      <div className="p-0">
        <Skeleton className="h-48 w-full" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="mt-2 h-4 w-32" />
        <Skeleton className="mt-4 h-8 w-24" />
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 p-4">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  );
}

// Featured Cars Section
function FeaturedCars() {
  // Fetch cars data
  const {
    data: cars,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get random car images
      const carImages = Array.from(
        { length: 12 },
        (_, i) => `/images/car-${i + 1}.jpg`
      );

      // Mock data with random images
      return [
        {
          id: "1",
          name: "Tesla Model 3",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 120,
          rating: 4.9,
          location: "San Francisco, CA",
        },
        {
          id: "2",
          name: "BMW i4",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 150,
          rating: 4.7,
          location: "Los Angeles, CA",
        },
        {
          id: "3",
          name: "Mercedes EQS",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 200,
          rating: 4.8,
          location: "New York, NY",
        },
        {
          id: "4",
          name: "Audi e-tron",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 180,
          rating: 4.6,
          location: "Chicago, IL",
        },
        {
          id: "5",
          name: "Porsche Taycan",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 250,
          rating: 4.9,
          location: "Miami, FL",
        },
        {
          id: "6",
          name: "Ford Mustang Mach-E",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 160,
          rating: 4.7,
          location: "Seattle, WA",
        },
      ] as CarType[];
    },
  });

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold">Featured Cars</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our most popular vehicles ready for your next adventure
          </p>
        </motion.div>

        {isError && (
          <Alert variant="destructive" className="mx-auto mb-8 max-w-md">
            <AlertDescription>
              Failed to load cars. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <CarCardSkeleton />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {cars?.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "List Your Car",
      description:
        "Create a free listing and set your own price, availability, and rules.",
      icon: <Car className="h-12 w-12 text-blue-500" />,
    },
    {
      id: "02",
      title: "Rent a Car",
      description:
        "Browse available cars in your area, book instantly without paperwork.",
      icon: <Key className="h-12 w-12 text-blue-500" />,
    },
    {
      id: "03",
      title: "Drive Safely",
      description:
        "Enjoy your trip with full insurance coverage and 24/7 roadside assistance.",
      icon: <ShieldCheck className="h-12 w-12 text-blue-500" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            Simple steps to start your journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-sm"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {step.icon}
              </motion.div>
              <h3 className="mt-6 text-2xl font-bold">{step.title}</h3>
              <p className="mt-4 text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Customer Reviews Section
function CustomerReviews() {
  // Fetch reviews data
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock data
      return [
        {
          id: "1",
          user: {
            name: "Sarah Johnson",
            image: "/images/testimonials/1.jpg",
          },
          rating: 5,
          comment:
            "Using this service was an absolute game-changer for my weekend getaway! The car was immaculate and the owner was super helpful.",
        },
        {
          id: "2",
          user: {
            name: "Michael Chen",
            image: "/images/testimonials/2.jpg",
          },
          rating: 4,
          comment:
            "Great experience overall. The booking process was seamless and the car was exactly as described.",
        },
        {
          id: "3",
          user: {
            name: "Jessica Patel",
            image: "/images/testimonials/3.jpg",
          },
          rating: 5,
          comment:
            "I've been using this platform for months now and it never disappoints. So much better than traditional rental companies!",
        },
      ] as ReviewType[];
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll reviews
  useEffect(() => {
    if (!reviews) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews]);

  if (isError) {
    return (
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Customer Reviews
          </h2>
          <Alert variant="destructive" className="mx-auto max-w-md">
            <AlertDescription>
              Failed to load reviews. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold">Customer Reviews</h2>
          <p className="mt-4 text-lg text-gray-600">
            See what our community is saying
          </p>
        </motion.div>

        <div className="relative mx-auto h-80 max-w-3xl">
          {isLoading ? (
            <div className="flex h-full flex-col items-center justify-center rounded-xl bg-white p-8 shadow-md">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="mt-4 h-6 w-32" />
              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-5 w-5" />
                ))}
              </div>
              <Skeleton className="mt-6 h-24 w-full" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {reviews?.map(
                (review, index) =>
                  index === activeIndex && (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex h-full flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-md"
                    >
                      <img
                        src={review.user.image}
                        alt={review.user.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <h3 className="mt-4 text-xl font-semibold">
                        {review.user.name}
                      </h3>
                      <div className="mt-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-6 text-gray-600">{review.comment}</p>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          )}

          {!isLoading && reviews && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    index === activeIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Call to Action Section
function CallToAction() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700" />
      <div className="absolute inset-0">
        <div className="flex h-full w-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                transition: { duration: 8, repeat: Infinity, delay: i * 0.5 },
              }}
              className="h-full w-1/5 border-r border-blue-500/20"
            />
          ))}
        </div>
        <div className="flex w-full flex-col">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                transition: { duration: 8, repeat: Infinity, delay: i * 0.5 },
              }}
              className="h-1/5 w-full border-b border-blue-500/20"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            List your car today and start earning.
          </h2>
          <p className="mt-6 max-w-lg text-xl text-blue-100">
            Turn your parked car into a passive income stream. Join thousands of
            car owners already earning with our platform.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <Button
              size="lg"
              className="bg-white px-8 py-6 text-lg font-semibold text-blue-600 hover:bg-blue-50"
            >
              Become a Host
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer

// Main Page Component
const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedCars />
      <HowItWorks />
      <CustomerReviews />
      <CallToAction />
    </main>
  );
};

export default Home;
