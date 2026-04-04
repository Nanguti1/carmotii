"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  MoreHorizontal
} from "lucide-react";

interface Car {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  type: string;
  location: string;
  daily_price: number;
  status: string;
  owner: {
    name: string;
    email: string;
  };
  created_at: string;
}

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Mock data - in real app, fetch from API
        const mockCars: Car[] = [
          {
            id: "1",
            name: "2020 Toyota Camry",
            make: "Toyota",
            model: "Camry",
            year: 2020,
            type: "sedan",
            location: "Nairobi",
            daily_price: 3000,
            status: "approved",
            owner: {
              name: "John Doe",
              email: "john@example.com",
            },
            created_at: "2024-01-15T10:30:00Z",
          },
          {
            id: "2",
            name: "2021 Honda CR-V",
            make: "Honda",
            model: "CR-V",
            year: 2021,
            type: "suv",
            location: "Mombasa",
            daily_price: 4500,
            status: "pending",
            owner: {
              name: "Jane Smith",
              email: "jane@example.com",
            },
            created_at: "2024-02-20T14:15:00Z",
          },
          {
            id: "3",
            name: "2019 BMW X5",
            make: "BMW",
            model: "X5",
            year: 2019,
            type: "luxury",
            location: "Kisumu",
            daily_price: 8000,
            status: "rejected",
            owner: {
              name: "Mike Johnson",
              email: "mike@example.com",
            },
            created_at: "2024-03-10T09:45:00Z",
          },
        ];

        setCars(mockCars);
        setFilteredCars(mockCars);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let filtered = cars;

    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((car) => car.status === statusFilter);
    }

    setFilteredCars(filtered);
  }, [searchTerm, statusFilter, cars]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = async (carId: string) => {
    // In real app, call API to approve car
    console.log("Approving car:", carId);
    setCars(cars.map(car => 
      car.id === carId ? { ...car, status: "approved" } : car
    ));
  };

  const handleReject = async (carId: string) => {
    // In real app, call API to reject car
    console.log("Rejecting car:", carId);
    setCars(cars.map(car => 
      car.id === carId ? { ...car, status: "rejected" } : car
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Car Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Car Management</h1>
        <p className="text-gray-600">Review and manage all car listings on the platform</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card key={car.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{car.name}</CardTitle>
                <Badge className={getStatusColor(car.status)}>
                  {car.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Type:</span>
                <span className="font-medium capitalize">{car.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Location:</span>
                <span className="font-medium">{car.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Daily Price:</span>
                <span className="font-bold text-green-600">KES {car.daily_price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Owner:</span>
                <span className="font-medium">{car.owner.name}</span>
              </div>
              <div className="text-xs text-gray-500">
                Listed: {new Date(car.created_at).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t">
                {car.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(car.id)}
                      className="flex items-center"
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(car.id)}
                      className="flex items-center"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline">
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Car className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No cars have been listed yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
