"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Car, 
  DollarSign,
  Activity,
  Eye,
  Calendar,
  BarChart3
} from "lucide-react";

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  avgSessionDuration: string;
  bounceRate: number;
  pageViews: number;
  conversionRate: number;
  revenueGrowth: number;
  userGrowth: number;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: "0:00",
    bounceRate: 0,
    pageViews: 0,
    conversionRate: 0,
    revenueGrowth: 0,
    userGrowth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Mock data - in real app, fetch from API
        setTimeout(() => {
          setData({
            totalViews: 45678,
            uniqueVisitors: 12456,
            avgSessionDuration: "4:32",
            bounceRate: 32.5,
            pageViews: 89234,
            conversionRate: 12.8,
            revenueGrowth: 23.4,
            userGrowth: 18.2,
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const statsCards = [
    {
      title: "Total Views",
      value: data.totalViews.toLocaleString(),
      description: "Page views this month",
      icon: Eye,
      trend: "+12%",
      color: "text-blue-600",
    },
    {
      title: "Unique Visitors",
      value: data.uniqueVisitors.toLocaleString(),
      description: "Unique users this month",
      icon: Users,
      trend: "+8%",
      color: "text-green-600",
    },
    {
      title: "Avg. Session Duration",
      value: data.avgSessionDuration,
      description: "Average time on site",
      icon: Calendar,
      trend: "+15%",
      color: "text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: `${data.conversionRate}%`,
      description: "Booking conversion rate",
      icon: TrendingUp,
      trend: "+3%",
      color: "text-yellow-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
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
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Monitor platform performance and user behavior</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600">{stat.description}</p>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
              Revenue Overview
            </CardTitle>
            <CardDescription>
              Monthly revenue trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <BarChart3 className="h-12 w-12 mr-3" />
              <span>Revenue Chart</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-green-600" />
              User Activity
            </CardTitle>
            <CardDescription>
              Daily active users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <Activity className="h-12 w-12 mr-3" />
              <span>Activity Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Metrics</CardTitle>
          <CardDescription>
            Platform growth over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+{data.userGrowth}%</div>
              <p className="text-sm text-gray-600">User Growth</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">+{data.revenueGrowth}%</div>
              <p className="text-sm text-gray-600">Revenue Growth</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{data.pageViews.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Page Views</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
