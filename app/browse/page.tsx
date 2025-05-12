"use client";

import { useState, useEffect, ChangeEvent } from "react";
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
import { Slider } from "@/components/ui/slider";
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
  Calendar,
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
  location: string;
  dates: string;
  priceRange: [number, number];
  carType: string;
  transmission: string;
  fuelType: string;
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

// Browse Cars Page
export default function BrowseCars() {
  const [filters, setFilters] = useState<Filters>({
    location: "",
    dates: "",
    priceRange: [0, 50000],
    carType: "",
    transmission: "",
    fuelType: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value as [number, number],
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: keyof Filters) => (value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Perfect Ride
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 text-lg text-gray-200 sm:text-xl"
            >
              Browse through our extensive collection of cars
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="container mx-auto -mt-8 px-4">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <Input
                  name="location"
                  placeholder="Location"
                  value={filters.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <Input
                  name="dates"
                  type="date"
                  value={filters.dates}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-gray-400" />
                <Select
                  value={filters.carType}
                  onValueChange={handleSelectChange("carType")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Car Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Cars
              </Button>
            </div>

            {/* Advanced Filters */}
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price Range (KES)
                </label>
                <div className="mt-2 px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={50000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between text-sm text-gray-600">
                    <span>KES {filters.priceRange[0]}</span>
                    <span>KES {filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <Select
                  value={filters.transmission}
                  onValueChange={handleSelectChange("transmission")}
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
                  onValueChange={handleSelectChange("fuelType")}
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Cars</h2>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isError ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-600">
              Failed to load cars. Please try again later.
            </div>
          ) : isLoading ? (
            // Loading skeletons
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
          ) : (
            // Car cards
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
            ))
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
    </main>
  );
}
