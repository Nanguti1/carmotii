"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Globe,
  Mail,
  Lock,
  Save,
  RefreshCw,
  CheckCircle
} from "lucide-react";

interface SystemSettings {
  siteName: string;
  siteEmail: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  maxCarsPerUser: number;
  commissionRate: number;
  supportPhone: string;
  supportEmail: string;
  timezone: string;
  currency: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  bookingAlerts: boolean;
  paymentAlerts: boolean;
  userRegistrationAlerts: boolean;
  systemAlerts: boolean;
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("system");
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: "Carmotii",
    siteEmail: "admin@carmotii.com",
    maintenanceMode: false,
    allowRegistrations: true,
    maxCarsPerUser: 10,
    commissionRate: 15,
    supportPhone: "+254 700 000 000",
    supportEmail: "support@carmotii.com",
    timezone: "Africa/Nairobi",
    currency: "KES",
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    paymentAlerts: true,
    userRegistrationAlerts: true,
    systemAlerts: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  const handleSystemSettingsChange = (field: keyof SystemSettings, value: any) => {
    setSystemSettings({
      ...systemSettings,
      [field]: value,
    });
  };

  const handleNotificationSettingsChange = (field: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: value,
    });
  };

  const handleSaveSettings = async () => {
    setSaveStatus("saving");
    setIsLoading(true);
    
    try {
      // Mock API call - in real app, save to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaveStatus("idle");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "system", label: "System", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage platform configuration and preferences</p>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      {activeTab === "system" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-blue-600" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic platform configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <Input
                    value={systemSettings.siteName}
                    onChange={(e) => handleSystemSettingsChange("siteName", e.target.value)}
                    placeholder="Enter site name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Email
                  </label>
                  <Input
                    type="email"
                    value={systemSettings.siteEmail}
                    onChange={(e) => handleSystemSettingsChange("siteEmail", e.target.value)}
                    placeholder="admin@carmotii.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Phone
                  </label>
                  <Input
                    value={systemSettings.supportPhone}
                    onChange={(e) => handleSystemSettingsChange("supportPhone", e.target.value)}
                    placeholder="+254 700 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <Input
                    type="email"
                    value={systemSettings.supportEmail}
                    onChange={(e) => handleSystemSettingsChange("supportEmail", e.target.value)}
                    placeholder="support@carmotii.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5 text-green-600" />
                Platform Settings
              </CardTitle>
              <CardDescription>
                Configure platform behavior and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Cars Per User
                  </label>
                  <Input
                    type="number"
                    value={systemSettings.maxCarsPerUser}
                    onChange={(e) => handleSystemSettingsChange("maxCarsPerUser", parseInt(e.target.value))}
                    min="1"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commission Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={systemSettings.commissionRate}
                    onChange={(e) => handleSystemSettingsChange("commissionRate", parseFloat(e.target.value))}
                    min="0"
                    max="50"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Maintenance Mode
                    </label>
                    <p className="text-xs text-gray-500">
                      Temporarily disable the platform for maintenance
                    </p>
                  </div>
                  <button
                    onClick={() => handleSystemSettingsChange("maintenanceMode", !systemSettings.maintenanceMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      systemSettings.maintenanceMode ? "bg-red-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        systemSettings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Allow New Registrations
                    </label>
                    <p className="text-xs text-gray-500">
                      Enable or disable user registration
                    </p>
                  </div>
                  <button
                    onClick={() => handleSystemSettingsChange("allowRegistrations", !systemSettings.allowRegistrations)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      systemSettings.allowRegistrations ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        systemSettings.allowRegistrations ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-purple-600" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Configure system notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()} Notifications
                    </label>
                    <p className="text-xs text-gray-500">
                      Receive {key.replace(/([A-Z])/g, ' $1').toLowerCase()} alerts
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationSettingsChange(key as keyof NotificationSettings, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Settings */}
      {activeTab === "security" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-red-600" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage platform security and authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Password Policy</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Minimum Length</label>
                    <Input type="number" defaultValue="8" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Require Special Characters</label>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Session Management</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Session Timeout (minutes)</label>
                    <Input type="number" defaultValue="30" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Force Re-authentication</label>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integrations Settings */}
      {activeTab === "integrations" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-yellow-600" />
              Integrations
            </CardTitle>
            <CardDescription>
              Manage third-party service integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">M-Pesa API</h4>
                    <p className="text-xs text-gray-500">Payment processing integration</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Key:</span>
                    <span className="font-mono">••••••••••</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shortcode:</span>
                    <span className="font-mono">174379</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Service</h4>
                    <p className="text-xs text-gray-500">Transactional emails</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span>SendGrid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="flex items-center"
        >
          {saveStatus === "saving" ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saveStatus === "success" ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
