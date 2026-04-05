import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Get environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Carmotii';

// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        (config.headers as any)['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 unauthorized
    if (error.response?.status === 401) {
      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // Redirect to login page
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
  },
  
  // Car endpoints
  CARS: {
    LIST: '/cars',
    SHOW: (id: string | number) => `/cars/${id}`,
    CREATE: '/cars',
    UPDATE: (id: string | number) => `/cars/${id}`,
    DELETE: (id: string | number) => `/cars/${id}`,
    UPLOAD_IMAGES: (id: string | number) => `/cars/${id}/images`,
    DELETE_IMAGE: (id: string | number) => `/cars/images/${id}`,
    UPDATE_AVAILABILITY: (id: string | number) => `/cars/${id}/availability`,
  },
  
  // Booking endpoints
  BOOKINGS: {
    LIST: '/bookings',
    SHOW: (id: string | number) => `/bookings/${id}`,
    CREATE: '/bookings',
    UPDATE: (id: string | number) => `/bookings/${id}`,
    CANCEL: (id: string | number) => `/bookings/${id}/cancel`,
    CONFIRM: (id: string | number) => `/bookings/${id}/confirm`,
    COMPLETE: (id: string | number) => `/bookings/${id}/complete`,
  },
  
  // Review endpoints
  REVIEWS: {
    LIST: '/reviews',
    CAR_REVIEWS: (carId: string | number) => `/reviews/car/${carId}`,
    CREATE: '/reviews',
    UPDATE: (id: string | number) => `/reviews/${id}`,
    DELETE: (id: string | number) => `/reviews/${id}`,
  },
  
  // Payment endpoints
  PAYMENTS: {
    INITIATE_MPESA: '/payments/mpesa/initiate',
    CALLBACK: '/payments/mpesa/callback',
    SHOW: (transactionId: string) => `/payments/${transactionId}`,
  },
  
  // User endpoints
  USERS: {
    LIST: '/users',
    SHOW: (id: string | number) => `/users/${id}`,
    CARS: (id: string | number) => `/users/${id}/cars`,
    BOOKINGS: (id: string | number) => `/users/${id}/bookings`,
    REVIEWS: (id: string | number) => `/users/${id}/reviews`,
    VERIFY: (id: string | number) => `/users/${id}/verify`,
    BAN: (id: string | number) => `/users/${id}/ban`,
  },
  
  // Pricing Plan endpoints
  PRICING_PLANS: {
    LIST: '/pricing-plans',
    SUBSCRIBE: '/subscribe',
    CURRENT_SUBSCRIPTION: '/subscription',
  },
  
  // Notification endpoints
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string | number) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    UNREAD_COUNT: '/notifications/unread-count',
  },
  
  // Analytics endpoints
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    REVENUE: '/analytics/revenue',
    USERS: '/analytics/users',
    BOOKINGS: '/analytics/bookings',
    CAR_PERFORMANCE: '/analytics/car-performance',
    TOP_CARS: '/analytics/top-cars',
  },
  
  // Report endpoints
  REPORTS: {
    LIST: '/reports',
    GENERATE: '/reports/generate',
    DOWNLOAD: '/reports/download',
    DOWNLOAD_FILE: (filepath: string) => `/reports/download-file/${filepath}`,
  },
};

// API client object
export const apiClient = {
  axiosInstance,
  
  // Auth methods
  auth: {
    register: (data: any) => axiosInstance.post(ENDPOINTS.AUTH.REGISTER, data),
    login: (data: any) => axiosInstance.post(ENDPOINTS.AUTH.LOGIN, data),
    logout: () => axiosInstance.post(ENDPOINTS.AUTH.LOGOUT),
    me: () => axiosInstance.get(ENDPOINTS.AUTH.ME),
    updateProfile: (data: any) => axiosInstance.put(ENDPOINTS.AUTH.UPDATE_PROFILE, data),
  },
  
  // Car methods
  cars: {
    list: () => axiosInstance.get(ENDPOINTS.CARS.LIST),
    show: (id: string | number) => axiosInstance.get(ENDPOINTS.CARS.SHOW(id)),
    create: (data: any) => axiosInstance.post(ENDPOINTS.CARS.CREATE, data),
    update: (id: string | number, data: any) => axiosInstance.put(ENDPOINTS.CARS.UPDATE(id), data),
    delete: (id: string | number) => axiosInstance.delete(ENDPOINTS.CARS.DELETE(id)),
    uploadImages: (id: string | number, data: any) => axiosInstance.post(ENDPOINTS.CARS.UPLOAD_IMAGES(id), data),
    deleteImage: (id: string | number) => axiosInstance.delete(ENDPOINTS.CARS.DELETE_IMAGE(id)),
    updateAvailability: (id: string | number, data: any) => axiosInstance.put(ENDPOINTS.CARS.UPDATE_AVAILABILITY(id), data),
  },
  
  // Booking methods
  bookings: {
    list: () => axiosInstance.get(ENDPOINTS.BOOKINGS.LIST),
    show: (id: string | number) => axiosInstance.get(ENDPOINTS.BOOKINGS.SHOW(id)),
    create: (data: any) => axiosInstance.post(ENDPOINTS.BOOKINGS.CREATE, data),
    update: (id: string | number, data: any) => axiosInstance.put(ENDPOINTS.BOOKINGS.UPDATE(id), data),
    cancel: (id: string | number) => axiosInstance.put(ENDPOINTS.BOOKINGS.CANCEL(id), {}),
    confirm: (id: string | number) => axiosInstance.put(ENDPOINTS.BOOKINGS.CONFIRM(id), {}),
    complete: (id: string | number) => axiosInstance.put(ENDPOINTS.BOOKINGS.COMPLETE(id), {}),
  },
  
  // Review methods
  reviews: {
    list: () => axiosInstance.get(ENDPOINTS.REVIEWS.LIST),
    carReviews: (carId: string | number) => axiosInstance.get(ENDPOINTS.REVIEWS.CAR_REVIEWS(carId)),
    create: (data: any) => axiosInstance.post(ENDPOINTS.REVIEWS.CREATE, data),
    update: (id: string | number, data: any) => axiosInstance.put(ENDPOINTS.REVIEWS.UPDATE(id), data),
    delete: (id: string | number) => axiosInstance.delete(ENDPOINTS.REVIEWS.DELETE(id)),
  },
  
  // Payment methods
  payments: {
    initiateMpesa: (data: any) => axiosInstance.post(ENDPOINTS.PAYMENTS.INITIATE_MPESA, data),
    show: (transactionId: string) => axiosInstance.get(ENDPOINTS.PAYMENTS.SHOW(transactionId)),
  },
  
  // User methods
  users: {
    list: () => axiosInstance.get(ENDPOINTS.USERS.LIST),
    show: (id: string | number) => axiosInstance.get(ENDPOINTS.USERS.SHOW(id)),
    cars: (id: string | number) => axiosInstance.get(ENDPOINTS.USERS.CARS(id)),
    bookings: (id: string | number) => axiosInstance.get(ENDPOINTS.USERS.BOOKINGS(id)),
    reviews: (id: string | number) => axiosInstance.get(ENDPOINTS.USERS.REVIEWS(id)),
  },
  
  // Pricing Plan methods
  pricingPlans: {
    list: () => axiosInstance.get(ENDPOINTS.PRICING_PLANS.LIST),
    subscribe: (data: any) => axiosInstance.post(ENDPOINTS.PRICING_PLANS.SUBSCRIBE, data),
    currentSubscription: () => axiosInstance.get(ENDPOINTS.PRICING_PLANS.CURRENT_SUBSCRIPTION),
  },
  
  // Notification methods
  notifications: {
    list: (params?: any) => axiosInstance.get(ENDPOINTS.NOTIFICATIONS.LIST, { params }),
    markAsRead: (id: string | number) => axiosInstance.put(ENDPOINTS.NOTIFICATIONS.MARK_READ(id), {}),
    markAllAsRead: () => axiosInstance.put(ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ, {}),
    unreadCount: () => axiosInstance.get(ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT),
  },
  
  // Analytics methods
  analytics: {
    dashboard: () => axiosInstance.get(ENDPOINTS.ANALYTICS.DASHBOARD),
    revenue: (params?: any) => axiosInstance.get(ENDPOINTS.ANALYTICS.REVENUE, { params }),
    users: (params?: any) => axiosInstance.get(ENDPOINTS.ANALYTICS.USERS, { params }),
    bookings: (params?: any) => axiosInstance.get(ENDPOINTS.ANALYTICS.BOOKINGS, { params }),
    carPerformance: () => axiosInstance.get(ENDPOINTS.ANALYTICS.CAR_PERFORMANCE),
    topCars: (params?: any) => axiosInstance.get(ENDPOINTS.ANALYTICS.TOP_CARS, { params }),
  },
  
  // Report methods
  reports: {
    list: () => axiosInstance.get(ENDPOINTS.REPORTS.LIST),
    generate: (data: any) => axiosInstance.post(ENDPOINTS.REPORTS.GENERATE, data),
    download: (data: any) => axiosInstance.post(ENDPOINTS.REPORTS.DOWNLOAD, data),
    downloadFile: (filepath: string) => axiosInstance.get(ENDPOINTS.REPORTS.DOWNLOAD_FILE(filepath), {
      responseType: 'blob',
    }),
  },
};

// Export for easy use
export { API_BASE_URL, APP_NAME };
export default apiClient;
