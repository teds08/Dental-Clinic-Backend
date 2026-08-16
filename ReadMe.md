# 🦷 DentCare - Dental Clinic Backend

A comprehensive Node.js/TypeScript-based backend system for managing dental clinic operations, patient appointments, and administrative functions.

---

## 📋 Table of Contents

- [Quick Overview](#quick-overview)
- [Real Project Structure](#real-project-structure)
- [Actual Features](#actual-features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Project Architecture](#project-architecture)

---

## Quick Overview

**DentCare Backend** is a fully-functional dental clinic management system built with Express.js and TypeScript. It handles:
- Patient authentication and profile management
- Appointment scheduling and management
- Admin operations (user management, service management)
- Loyalty points system for patients
- Coupon/discount management
- In-app notifications
- Email notifications via NodeMailer
- Image uploads via Cloudinary

---

## Real Project Structure

```
src/
├── app.ts                          # Express app configuration
├── server.ts                       # Server entry point
│
├── config/                         # Configuration files
│   ├── cloudinary.ts              # Image upload service
│   ├── db.ts                      # Database connection
│   └── node_mailer.ts             # Email service
│
├── controllers/                    # Request handlers (8 controllers)
│   ├── admin.controller.ts
│   ├── appointment.controller.ts
│   ├── auth.controller.ts
│   ├── coupon.controller.ts
│   ├── notification.controller.ts
│   ├── points.controller.ts
│   ├── service.controller.ts
│   └── user.controller.ts
│
├── interfaces/                     # TypeScript interfaces
│   ├── appointment.interface.ts
│   ├── coupon.interface.ts
│   ├── service.interface.ts
│   └── user.interface.ts
│
├── middlewares/                    # Custom middleware
│   ├── admin.middleware.ts        # Admin authorization
│   └── auth.middleware.ts         # JWT authentication
│
├── repositories/                   # Data access layer
│   ├── admin/                     # Admin operations
│   ├── appointment/               # Appointment CRUD (9 operations)
│   ├── auth/                      # Auth operations
│   ├── manage-coupon/             # Coupon operations (10 operations)
│   ├── manage-patient-points/     # Points management (6 operations)
│   ├── manage-services/           # Service management (9 operations)
│   ├── manage-users/              # User management (6 operations)
│   ├── notification/              # Notification operations (6 operations)
│   └── user/                      # User operations (10 operations)
│
├── routes/                         # API route definitions
│   ├── admin.routes.ts
│   ├── appointment.routes.ts
│   ├── notification.routes.ts
│   ├── points.routes.ts
│   ├── public.routes.ts
│   ├── service.routes.ts
│   └── user.routes.ts
│
├── services/                       # Business logic
│   ├── admin/                     # Admin services (7 operations)
│   ├── appointment/               # Appointment logic (9 operations)
│   ├── auth/                      # Authentication (5 operations)
│   ├── coupon/                    # Coupon logic (7 operations)
│   ├── manage-services/           # Service logic (8 operations)
│   ├── notification/              # Notification logic (6 operations)
│   ├── points/                    # Points logic (2 operations)
│   └── user/                      # User logic (4 operations)
│
├── types/                          # TypeScript types
│   └── database.type.ts
│
├── utils/                          # Utility functions
│   ├── appointment.time.ts        # Time calculations
│   ├── init.tables.ts             # Database initialization
│   ├── jwt.ts                     # JWT token generation
│   └── password.bcrypt.ts         # Password hashing
│
└── validators/                     # Input validation
    ├── admin.service.validator.ts
    ├── appointment.validator.ts
    ├── auth.validator.ts
    ├── coupon.validator.ts
    └── user.validator.ts
```

---

## Actual Features

### 1. **Authentication System** 🔐
- User registration and login
- JWT-based authentication
- OTP verification for secure operations
- Password reset with email verification
- Forgot password functionality
- Account lockout after failed attempts
- Login attempt tracking

### 2. **User Management** 👥
- User profile creation and updates
- Profile information management
- Password change (authenticated users)
- User archiving/soft delete
- User restoration
- User listing with filters

### 3. **Appointment Management** 📅
- Create appointments
- Cancel appointments
- View appointment details
- Find all appointments (with filters)
- Personal appointment history ("My appointments")
- Approve appointments (admin)
- Reject appointments (admin)
- Complete appointments (admin)
- Check appointment conflicts (prevent double booking)
- Update appointment status

### 4. **Admin Panel** ⚙️
- Manage users (view, archive, restore, hard delete)
- View archived users list
- Manage services
- Manage coupons
- Manage patient points
- System statistics

### 5. **Service Management** 🏥
- Create dental services
- Update services
- Delete services (soft delete)
- Archive services
- Restore archived services
- View all services
- View archived services list

### 6. **Coupon/Discount System** 🎟️
- Create coupons
- Update coupon details
- Delete coupons
- Redeem coupons
- Track coupon usage
- Manage coupon status (active/inactive)
- Apply coupons to patient accounts
- View active coupons
- View all coupons
- Track patient-specific coupons

### 7. **Loyalty Points System** ⭐
- Create points transactions
- Track patient points balance
- Redeem points
- Update points for patients
- View points history
- Client points management

### 8. **Notification System** 🔔
- Create notifications
- Mark single notification as read
- Mark all notifications as read
- View notifications
- View unread notifications
- Track notification status

### 9. **External Integrations** 🔗
- **Cloudinary**: Image upload and management
- **NodeMailer**: Email notifications and password reset emails
- **JWT**: Secure token-based authentication

---

## Technology Stack

### Backend Framework
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js

### Database
- NEONDB

### Authentication & Security
- **JWT**: Token-based authentication
- **Bcrypt**: Password hashing
- **OTP**: One-time passwords for verification

### External Services
- **Cloudinary**: Cloud-based image management
- **NodeMailer**: Email service for notifications

### Development Tools
- **TypeScript**: Type-safe JavaScript
- **npm**: Package manager
- **tsconfig.json**: TypeScript configuration

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- NEONDB 
- Cloudinary account (for image uploads)
- Email credentials for NodeMailer

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/teds08/Dental-Clinic-Backend.git
cd Dental-Clinic-Backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file** (in project root, outside src/)
```bash
cp .env.example .env
# (ask the backend dev for .env)
```

4. **Start the application**
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build
npm start
```


## Running the Application

### Development Mode
```bash
npm run dev
```
- TypeScript files are compiled on the fly
- Hot reload enabled
- Server runs on `http://localhost:5000`

### Production Mode
```bash
npm run build
npm start
```

### Build Only
```bash
npm run build
# Creates `/dist` folder with compiled JavaScript
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /verify-otp` - Verify OTP
- `POST /resend-otp` - Resend OTP
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token

### User Routes (`/api/user`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `PUT /change-password` - Change password (authenticated)
- `GET /all` - Get all users (admin)
- `PUT /archive/:id` - Archive user (admin)
- `PUT /restore/:id` - Restore user (admin)
- `DELETE /delete/:id` - Hard delete user (admin)

### Appointment Routes (`/api/appointment`)
- `POST /` - Create appointment
- `GET /` - Get all appointments (admin)
- `GET /my-appointments` - Get user's appointments
- `GET /:id` - Get appointment details
- `PUT /:id` - Update appointment
- `PUT /:id/cancel` - Cancel appointment
- `PUT /:id/approve` - Approve appointment (admin)
- `PUT /:id/reject` - Reject appointment (admin)
- `PUT /:id/complete` - Mark as complete (admin)

### Service Routes (`/api/service`)
- `POST /` - Create service (admin)
- `GET /` - Get all active services
- `GET /all` - Get all services including archived (admin)
- `PUT /:id` - Update service (admin)
- `DELETE /:id` - Soft delete service (admin)
- `PUT /:id/archive` - Archive service (admin)
- `PUT /:id/restore` - Restore service (admin)

### Coupon Routes (`/api/coupon`)
- `POST /` - Create coupon (admin)
- `GET /` - Get all coupons
- `PUT /:id` - Update coupon (admin)
- `DELETE /:id` - Delete coupon (admin)
- `PUT /:id/status` - Toggle coupon status (admin)
- `POST /:id/redeem` - Redeem coupon (user)

### Points Routes (`/api/points`)
- `GET /` - Get user's points
- `GET /client` - Get client points balance

### Notification Routes (`/api/notification`)
- `GET /` - Get notifications
- `GET /unread` - Get unread notifications
- `POST /` - Create notification (admin)
- `PUT /:id/read` - Mark notification as read
- `PUT /mark-all-read` - Mark all as read

### Admin Routes (`/api/admin`)
- Various admin operations for managing the system

---

## Database Models

### Collections/Tables:
1. **Users** - User accounts with authentication
2. **Appointments** - Appointment scheduling
3. **Services** - Dental services offered
4. **Coupons** - Discount coupons
5. **PatientPoints** - Loyalty points tracking
6. **Notifications** - User notifications
7. **Sessions** - JWT session management

---

## Project Architecture

### Design Pattern: Repository + Service + Controller

```
Request → Routes → Controller → Service → Repository → Database
     ↓                  ↓
  Middleware         Validators
  (Auth, Admin)    (Input Validation)
```

### Layer Breakdown:

**1. Controllers** - Handle HTTP requests/responses
- Extract request data
- Call appropriate services
- Return JSON responses

**2. Services** - Business logic layer
- Process data
- Call repositories for data operations
- Handle validation
- Manage transactions

**3. Repositories** - Data access layer
- Query database
- Perform CRUD operations
- Handle specific data retrieval logic

**4. Middlewares** - Request processing
- JWT authentication
- Admin authorization
- Error handling

**5. Validators** - Input validation
- Validate request payloads
- Check data types and formats

---

## Key Implementation Details

### Security Features
✅ JWT-based authentication
✅ Bcrypt password hashing
✅ OTP verification
✅ Admin role-based access control
✅ Account lockout mechanism
✅ Login attempt tracking

### Data Management
✅ Soft delete (archive) functionality
✅ Restore archived records
✅ Hard delete for permanent removal
✅ Transaction support for coupons and points

### External Integrations
✅ Cloudinary for image management
✅ NodeMailer for email notifications
✅ OTP for secure verification

---

## Development Workflow

1. Create validator for request data
2. Create service with business logic
3. Create repository for data access
4. Create controller to handle requests
5. Define routes
6. Test endpoints

---

## Next Steps

1. **Read the original ReadMe.md** in your repo for project-specific info
2. **Check configuration files** (`src/config/`) for setup details
3. **Review interfaces** (`src/interfaces/`) to understand data models
4. **Test endpoints** using Postman or similar tool

---

**Last Updated:** August 2026
**Version:** 1.0
