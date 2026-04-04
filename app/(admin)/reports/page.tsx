"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Search,
  TrendingUp,
  DollarSign,
  Users,
  Car
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: string;
  description: string;
  generatedAt: string;
  size: string;
  status: string;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Mock data - in real app, fetch from API
        const mockReports: Report[] = [
          {
            id: "1",
            name: "Monthly Revenue Report",
            type: "financial",
            description: "Revenue breakdown for March 2024",
            generatedAt: "2024-04-01T09:00:00Z",
            size: "2.4 MB",
            status: "completed",
          },
          {
            id: "2",
            name: "User Activity Report",
            type: "analytics",
            description: "User engagement and activity metrics",
            generatedAt: "2024-04-01T08:30:00Z",
            size: "1.8 MB",
            status: "completed",
          },
          {
            id: "3",
            name: "Booking Summary",
            type: "operational",
            description: "All bookings for Q1 2024",
            generatedAt: "2024-04-01T07:45:00Z",
            size: "3.2 MB",
            status: "completed",
          },
          {
            id: "4",
            name: "Car Utilization Report",
            type: "operational",
            description: "Car usage and availability metrics",
            generatedAt: "2024-03-31T16:20:00Z",
            size: "1.5 MB",
            status: "completed",
          },
          {
            id: "5",
            name: "Payment Processing Report",
            type: "financial",
            description: "M-Pesa transaction summary",
            generatedAt: "2024-03-31T15:10:00Z",
            size: "2.1 MB",
            status: "processing",
          },
        ];

        setReports(mockReports);
        setFilteredReports(mockReports);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((report) => report.type === typeFilter);
    }

    setFilteredReports(filtered);
  }, [searchTerm, typeFilter, reports]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "financial":
        return "bg-green-100 text-green-800";
      case "analytics":
        return "bg-blue-100 text-blue-800";
      case "operational":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = (reportId: string) => {
    console.log("Downloading report:", reportId);
    // In real app, initiate download
  };

  const handleGenerateReport = () => {
    console.log("Generating new report...");
    // In real app, open report generation modal
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and download platform reports</p>
        </div>
        <Button onClick={handleGenerateReport} className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-gray-600">Generated reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.type === "financial").length}
            </div>
            <p className="text-xs text-gray-600">Revenue reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational</CardTitle>
            <Car className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.type === "operational").length}
            </div>
            <p className="text-xs text-gray-600">Operations reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.type === "analytics").length}
            </div>
            <p className="text-xs text-gray-600">Analytics reports</p>
          </CardContent>
        </Card>
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
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="financial">Financial</option>
              <option value="analytics">Analytics</option>
              <option value="operational">Operational</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg truncate">{report.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{report.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  <Calendar className="inline h-3 w-3 mr-1" />
                  {new Date(report.generatedAt).toLocaleDateString()}
                </span>
                <span className="font-medium">{report.size}</span>
              </div>
              <Button
                size="sm"
                onClick={() => handleDownload(report.id)}
                disabled={report.status === "processing"}
                className="w-full"
              >
                <Download className="mr-1 h-4 w-4" />
                {report.status === "processing" ? "Processing..." : "Download"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">
              {searchTerm || typeFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No reports have been generated yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
