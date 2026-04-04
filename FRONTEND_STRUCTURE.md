# Carmotii Frontend Structure

## 📁 Route Group Organization

The frontend has been successfully refactored to use Next.js 13+ route groups with clear separation of concerns:

### 🏠 **(client) Route Group**
**Purpose**: Public website pages with header and footer
**Layout**: Includes Navbar + Footer
**Pages**:
- `page.tsx` - Homepage with hero section and featured cars
- `about/page.tsx` - About the platform
- `browse/page.tsx` - Car browsing with filters
- `pricing/page.tsx` - Pricing plans and subscription options
- `support/page.tsx` - Customer support

**Components**:
- `components/Navbar.tsx` - Main navigation
- `components/Footer.tsx` - Site footer

### 🔐 **(auth) Route Group**
**Purpose**: Authentication pages with minimal layout (no header/footer)
**Layout**: Simple centered form layout
**Pages**:
- `login/page.tsx` - User login form
- `register/page.tsx` - User registration form
- `reset-password/page.tsx` - Password reset form

### 👨‍💼 **(admin) Route Group**
**Purpose**: Administrative dashboard with sidebar navigation
**Layout**: Sidebar + admin navbar + content area
**Pages**:
- `dashboard/page.tsx` - Admin dashboard with stats
- `cars/page.tsx` - Car management and approval
- `bookings/page.tsx` - Booking management
- `users/page.tsx` - User management and verification

### 🚗 **Root Structure**
```
app/
├── (client)/                👈 Public website
│   ├── layout.tsx          👈 Header + Footer
│   ├── page.tsx            (home)
│   ├── about/page.tsx
│   ├── browse/page.tsx
│   ├── pricing/page.tsx
│   ├── support/page.tsx
│   └── components/
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── (auth)/                 👈 Auth pages (NO header/footer)
│   ├── layout.tsx          👈 Minimal centered layout
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── reset-password/page.tsx
│
├── (admin)/                👈 Admin panel
│   ├── layout.tsx          👈 sidebar + admin navbar
│   ├── dashboard/page.tsx
│   ├── cars/page.tsx
│   ├── bookings/page.tsx
│   └── users/page.tsx
│
├── become-host/             👈 Legacy (to be refactored)
├── favicon.ico
├── globals.css
├── layout.tsx              👈 Root layout (no UI)
└── providers.tsx
```

## 🎯 **Route Group Benefits**

### **Clear Separation**
- **Client pages** have consistent header/footer branding
- **Auth pages** are distraction-free for better conversion
- **Admin pages** have dedicated workspace with sidebar navigation

### **Layout Hierarchy**
1. **Root Layout** (`app/layout.tsx`) - Global providers and fonts only
2. **Group Layouts** - Specific UI for each user type
3. **Pages** - Content within appropriate layout context

### **User Experience**
- **Public users** see professional website with navigation
- **Authenticating users** get focused, clean forms
- **Admin users** get comprehensive dashboard with tools

### **Development Benefits**
- **Scalable** - Easy to add new pages to appropriate groups
- **Maintainable** - Related pages share layouts and components
- **Type-safe** - Clear routing structure for Next.js 13+

## 🔄 **Next Steps**

1. **Refactor become-host** - Move to (client) or create dedicated host flow
2. **API Integration** - Connect all pages to Laravel backend
3. **Component Library** - Create reusable UI components
4. **State Management** - Implement proper data fetching and caching

## ✅ **Migration Complete**

All existing pages have been successfully reorganized into route groups while maintaining functionality and improving user experience.
