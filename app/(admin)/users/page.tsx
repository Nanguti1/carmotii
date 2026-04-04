"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Shield, 
  Ban,
  Check,
  X,
  MoreHorizontal
} from "lucide-react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  verification_status: string;
  is_active: boolean;
  is_banned: boolean;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock data - in real app, fetch from API
        const mockUsers: User[] = [
          {
            id: "1",
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone_number: "+254 700 000 001",
            verification_status: "verified",
            is_active: true,
            is_banned: false,
            created_at: "2024-01-15T10:30:00Z",
          },
          {
            id: "2",
            first_name: "Jane",
            last_name: "Smith",
            email: "jane@example.com",
            phone_number: "+254 700 000 002",
            verification_status: "pending",
            is_active: true,
            is_banned: false,
            created_at: "2024-02-20T14:15:00Z",
          },
          {
            id: "3",
            first_name: "Mike",
            last_name: "Johnson",
            email: "mike@example.com",
            phone_number: "+254 700 000 003",
            verification_status: "rejected",
            is_active: true,
            is_banned: false,
            created_at: "2024-03-10T09:45:00Z",
          },
          {
            id: "4",
            first_name: "Sarah",
            last_name: "Wilson",
            email: "sarah@example.com",
            phone_number: "+254 700 000 004",
            verification_status: "pending",
            is_active: true,
            is_banned: true,
            created_at: "2024-01-25T16:20:00Z",
          },
        ];

        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => {
        if (statusFilter === "verified") return user.verification_status === "verified";
        if (statusFilter === "pending") return user.verification_status === "pending";
        if (statusFilter === "rejected") return user.verification_status === "rejected";
        if (statusFilter === "banned") return user.is_banned;
        return true;
      });
    }

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleVerify = async (userId: string) => {
    // In real app, call API to verify user
    console.log("Verifying user:", userId);
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verification_status: "verified" } : user
    ));
  };

  const handleBan = async (userId: string) => {
    // In real app, call API to ban user
    console.log("Banning user:", userId);
    setUsers(users.map(user => 
      user.id === userId ? { ...user, is_banned: !user.is_banned } : user
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
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
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage user accounts, verification status, and access control</p>
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
                  placeholder="Search users..."
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
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {user.first_name} {user.last_name}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getVerificationColor(user.verification_status)}>
                    {user.verification_status}
                  </Badge>
                  {user.is_banned && (
                    <Badge className="bg-red-100 text-red-800">
                      <Ban className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{user.phone_number}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`font-medium capitalize ${
                  user.is_active ? "text-green-600" : "text-red-600"
                }`}>
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Joined: {new Date(user.created_at).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t">
                {user.verification_status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleVerify(user.id)}
                    className="flex items-center"
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Verify
                  </Button>
                )}
                <Button
                  size="sm"
                  variant={user.is_banned ? "default" : "destructive"}
                  onClick={() => handleBan(user.id)}
                  className="flex items-center"
                >
                  <Ban className="mr-1 h-4 w-4" />
                  {user.is_banned ? "Unban" : "Ban"}
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="mr-1 h-4 w-4" />
                  More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No users have registered yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
