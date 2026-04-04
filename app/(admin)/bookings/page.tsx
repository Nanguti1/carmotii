"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Search, 
  Filter, 
  Car, 
  User, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";

interface Booking {
  id: string;
  car: {
    name: string;
    make: string;
    model: string;
  };
  user: {
    name: string;
    email: string;
  };
  start_date: string;
  end_date: string;
  duration_days: number;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Mock data - in real app, fetch from API
        const mockBookings: Booking[] = [
          {
            id: "1",
            car: {
              name: "2020 Toyota Camry",
              make: "Toyota",
              model: "Camry",
            },
            user: {
              name: "John Doe",
              email: "john@example.com",
            },
            start_date: "2024-04-15T10:00:00Z",
            end_date: "2024-04-17T10:00:00Z",
            duration_days: 3,
            total_amount: 9000,
            status: "confirmed",
            created_at: "2024-04-10T14:30:00Z",
          },
          {
            id: "2",
            car: {
              name: "2021 Honda CR-V",
              make: "Honda",
              model: "CR-V",
            },
            user: {
              name: "Jane Smith",
              email: "jane@example.com",
            },
            start_date: "2024-04-20T14:00:00Z",
            end_date: "2024-04-22T14:00:00Z",
            duration_days: 3,
            total_amount: 13500,
            status: "pending",
            created_at: "2024-04-18T09:15:00Z",
          },
          {
            id: "3",
            car: {
              name: "2019 BMW X5",
              make: "BMW",
              model: "X5",
            },
            user: {
              name: "Mike Johnson",
              email: "mike@example.com",
            },
            start_date: "2024-04-05T09:00:00Z",
            end_date: "2024-04-07T09:00:00Z",
            duration_days: 3,
            total_amount: 24000,
            status: "completed",
            created_at: "2024-04-01T16:20:00Z",
          },
          {
            id: "4",
            car: {
              name: "2022 Mazda CX-5",
              make: "Mazda",
              model: "CX-5",
            },
            user: {
              name: "Sarah Wilson",
              email: "sarah@example.com",
            },
            start_date: "2024-04-25T10:00:00Z",
            end_date: "2024-04-27T10:00:00Z",
            duration_days: 3,
            total_amount: 10500,
            status: "cancelled",
            created_at: "2024-04-22T11:45:00Z",
          },
        ];

        setBookings(mockBookings);
        setFilteredBookings(mockBookings);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "active":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      case "active":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Booking Management</h1>
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
        <h1 className="text-2xl font-semibold text-gray-900">Booking Management</h1>
        <p className="text-gray-600">Monitor and manage all booking transactions on the platform</p>
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
                  placeholder="Search bookings..."
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
              <option value="confirmed">Confirmed</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg truncate">
                  {booking.car.name}
                </CardTitle>
                <Badge className={getStatusColor(booking.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status}</span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{booking.car.make}</div>
                  <div className="text-xs text-gray-500">{booking.car.model}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{booking.user.name}</div>
                  <div className="text-xs text-gray-500">{booking.user.email}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="font-medium">{booking.duration_days} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total:</span>
                <span className="font-bold text-green-600">KES {booking.total_amount.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div>
                  <span className="block">Start:</span>
                  <span className="font-medium text-gray-700">
                    {new Date(booking.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="block">End:</span>
                  <span className="font-medium text-gray-700">
                    {new Date(booking.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Booked: {new Date(booking.created_at).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t">
                <Button size="sm" variant="outline">
                  <DollarSign className="mr-1 h-4 w-4" />
                  View Payment
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="mr-1 h-4 w-4" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No bookings have been made yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
