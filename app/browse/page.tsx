"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from "@/components/ui/slider";
import {
  Car,
  Star,
  ChevronRight,
  Search,
  Filter,
  X,
  MapPin,
  DollarSign,
  Car as CarIcon,
} from "lucide-react";

// Types
interface CarType {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  type: string;
  transmission: string;
  fuelType: string;
  seats: number;
}

// Filter Types
interface Filters {
  search: string;
  location: string;
  carType: string;
  priceRange: [number, number];
  transmission: string;
  fuelType: string;
  seats: string;
}

// Car Card Component
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
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          {car.location}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
            {car.type}
          </span>
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
            {car.transmission}
          </span>
          <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600">
            {car.fuelType}
          </span>
          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-600">
            {car.seats} seats
          </span>
        </div>
        <div className="mt-4 text-xl font-bold text-blue-600">
          Kes. {car.price.toLocaleString()}{" "}
          <span className="text-sm font-normal text-gray-500">/day</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 p-4">
        <Button
          variant="outline"
          size="sm"
          className="group relative cursor-pointer overflow-hidden border-gray-200 transition-all duration-300 hover:border-blue-500 hover:text-blue-500 hover:shadow-sm"
        >
          <span className="relative z-10">Details</span>
          <div className="absolute inset-0 -z-10 translate-y-full bg-blue-50 transition-transform duration-300 group-hover:translate-y-0" />
        </Button>
        <Button
          size="sm"
          className="group relative cursor-pointer overflow-hidden bg-blue-500 transition-all duration-300 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500/25"
        >
          <span className="relative z-10">Book Now</span>
          <div className="absolute inset-0 -z-10 translate-y-full bg-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// Filter Sidebar Component
function FilterSidebar({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) {
  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setFilters({
              search: "",
              location: "",
              carType: "",
              priceRange: [0, 50000],
              transmission: "",
              fuelType: "",
              seats: "",
            })
          }
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset All
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Location
          </label>
          <Select
            value={filters.location}
            onValueChange={(value) =>
              setFilters({ ...filters, location: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nairobi">Nairobi</SelectItem>
              <SelectItem value="mombasa">Mombasa</SelectItem>
              <SelectItem value="kisumu">Kisumu</SelectItem>
              <SelectItem value="nakuru">Nakuru</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Car Type
          </label>
          <Select
            value={filters.carType}
            onValueChange={(value) =>
              setFilters({ ...filters, carType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select car type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Price Range (Kes/day)
          </label>
          <div className="mt-2 px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  priceRange: value as [number, number],
                })
              }
              min={0}
              max={50000}
              step={1000}
              className="w-full"
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Kes. {filters.priceRange[0].toLocaleString()}</span>
              <span>Kes. {filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Transmission
          </label>
          <Select
            value={filters.transmission}
            onValueChange={(value) =>
              setFilters({ ...filters, transmission: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Fuel Type
          </label>
          <Select
            value={filters.fuelType}
            onValueChange={(value) =>
              setFilters({ ...filters, fuelType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Seats
          </label>
          <Select
            value={filters.seats}
            onValueChange={(value) => setFilters({ ...filters, seats: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select seats" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Seats</SelectItem>
              <SelectItem value="4">4 Seats</SelectItem>
              <SelectItem value="5">5 Seats</SelectItem>
              <SelectItem value="7">7 Seats</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// Browse Cars Page
export default function BrowseCars() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    location: "",
    carType: "",
    priceRange: [0, 50000],
    transmission: "",
    fuelType: "",
    seats: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch cars data
  const {
    data: cars,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cars", filters],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get random car images
      const carImages = Array.from(
        { length: 12 },
        (_, i) => `/images/car-${i + 1}.jpg`
      );

      // Mock data with random images
      const mockCars = [
        {
          id: "1",
          name: "Tesla Model 3",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 12000,
          rating: 4.9,
          location: "Nairobi",
          type: "Sedan",
          transmission: "Automatic",
          fuelType: "Electric",
          seats: 5,
        },
        {
          id: "2",
          name: "BMW i4",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 15000,
          rating: 4.7,
          location: "Mombasa",
          type: "Sedan",
          transmission: "Automatic",
          fuelType: "Electric",
          seats: 5,
        },
        {
          id: "3",
          name: "Mercedes EQS",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 20000,
          rating: 4.8,
          location: "Kisumu",
          type: "Luxury",
          transmission: "Automatic",
          fuelType: "Electric",
          seats: 5,
        },
        {
          id: "4",
          name: "Audi e-tron",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 18000,
          rating: 4.6,
          location: "Nakuru",
          type: "SUV",
          transmission: "Automatic",
          fuelType: "Electric",
          seats: 5,
        },
        {
          id: "5",
          name: "Porsche Taycan",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 25000,
          rating: 4.9,
          location: "Nairobi",
          type: "Sports",
          transmission: "Automatic",
          fuelType: "Electric",
          seats: 4,
        },
        {
          id: "6",
          name: "Ford Mustang Mach-E",
          image: carImages[Math.floor(Math.random() * carImages.length)],
          price: 16000,
          rating: 4.7,
          location: "Mombasa",
          type: "SUV",
          transmission: "Automatic",
          fuelType: "Electric",
          seats: 5,
        },
      ] as CarType[];

      // Apply filters
      return mockCars.filter((car) => {
        if (
          filters.search &&
          !car.name.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }
        if (
          filters.location &&
          car.location.toLowerCase() !== filters.location.toLowerCase()
        ) {
          return false;
        }
        if (
          filters.carType &&
          car.type.toLowerCase() !== filters.carType.toLowerCase()
        ) {
          return false;
        }
        if (
          car.price < filters.priceRange[0] ||
          car.price > filters.priceRange[1]
        ) {
          return false;
        }
        if (
          filters.transmission &&
          car.transmission.toLowerCase() !== filters.transmission.toLowerCase()
        ) {
          return false;
        }
        if (
          filters.fuelType &&
          car.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()
        ) {
          return false;
        }
        if (filters.seats && car.seats.toString() !== filters.seats) {
          return false;
        }
        return true;
      });
    },
  });

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
              backgroundImage: "url('/images/car-9.jpg')",
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
              Browse Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Fleet
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 text-lg text-gray-200 sm:text-xl"
            >
              Find the perfect car for your next adventure
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mx-auto mt-6 max-w-2xl"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search cars..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="h-12 rounded-full border-0 bg-white/10 pl-12 pr-4 text-white placeholder:text-white/70 backdrop-blur-sm"
                />
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
              </div>
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

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full"
              variant="outline"
            >
              <Filter className="mr-2 h-4 w-4" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full lg:w-80"
              >
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Car Grid */}
          <div className="flex-1">
            {isError ? (
              <div className="rounded-lg bg-red-50 p-4 text-red-600">
                Failed to load cars. Please try again later.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading
                  ? // Loading skeletons
                    Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="mt-2 h-4 w-1/2" />
                          <Skeleton className="mt-4 h-8 w-1/4" />
                        </CardContent>
                      </Card>
                    ))
                  : // Car cards
                    cars?.map((car) => (
                      <motion.div
                        key={car.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -5 }}
                      >
                        <CarCard car={car} />
                      </motion.div>
                    ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && cars?.length === 0 && (
              <div className="mt-8 text-center">
                <CarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No cars found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
