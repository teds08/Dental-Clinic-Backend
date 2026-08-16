# DentCare - Features & API Documentation

Complete documentation of all features and API endpoints.

---

## Table of Contents

1. [Features Overview](#features-overview)
2. [Authentication](#authentication)
3. [User Management](#user-management)
4. [Appointment System](#appointment-system)
5. [Service Management](#service-management)
6. [Coupon System](#coupon-system)
7. [Points System](#points-system)
8. [Notifications](#notifications)
9. [Admin Functions](#admin-functions)

---

## Features Overview

Your DentCare backend implements **9 major feature modules** with **65+ individual operations**:

| Feature | Files | Operations |
|---------|-------|-----------|
| Authentication | 5 service files | Login, Register, OTP, Password Reset |
| User Management | 10 repository files | CRUD, Archive, Restore, Profile |
| Appointments | 9 repository + 9 service files | Create, Cancel, Approve, Complete, etc. |
| Services | 9 repository + 8 service files | CRUD with Archive/Restore |
| Coupons | 10 repository + 7 service files | Create, Redeem, Status Management |
| Points | 6 repository + 2 service files | Track, Redeem, Transaction History |
| Notifications | 6 repository + 6 service files | Create, Read, Mark as Read |
| Admin | 2 repository + 7 service files | User Management, System Control |

---

## Authentication

### Feature: Secure User Authentication

**Files:**
- `services/auth/auth.service.ts` - Main auth logic
- `services/auth/verify.OTP.ts` - OTP verification
- `services/auth/forgot.password.ts` - Password reset flow
- `services/auth/reset.Password.ts` - Password reset execution
- `services/auth/resend.OTP.ts` - Resend OTP
- `repositories/auth/Session_repo.ts` - Session management
- `repositories/auth/ForgotPassword_repo.ts` - Password reset tracking

**Operations:**
1. **User Registration**
   - Create new user account
   - Validate input (email, password format)
   - Hash password with bcrypt
   - Generate OTP for verification
   - Send verification email

2. **User Login**
   - Validate credentials
   - Track login attempts
   - Lock account after failed attempts
   - Generate JWT token
   - Create session

3. **OTP Verification**
   - Verify OTP code
   - Check OTP expiry (10 minutes default)
   - Activate user account
   - Clear OTP

4. **Forgot Password**
   - Validate email exists
   - Generate reset token
   - Send reset link via email
   - Track password reset request

5. **Reset Password**
   - Validate reset token
   - Hash new password
   - Update user password
   - Invalidate reset token
   - Clear login attempts

6. **Resend OTP**
   - Generate new OTP
   - Update expiry
   - Send email

### API Endpoints

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}

Response: { userId, token, message }
```

```
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: { userId, token, userRole }
```

```
POST /api/auth/verify-otp
{
  "email": "user@example.com",
  "otp": "123456"
}

Response: { message: "Account verified" }
```

```
POST /api/auth/resend-otp
{
  "email": "user@example.com"
}

Response: { message: "OTP sent" }
```

```
POST /api/auth/forgot-password
{
  "email": "user@example.com"
}

Response: { message: "Reset link sent to email" }
```

```
POST /api/auth/reset-password
{
  "token": "reset_token",
  "newPassword": "NewPass123!"
}

Response: { message: "Password reset successfully" }
```

---

## User Management

### Feature: User Profile & Account Management

**Files:**
- `repositories/user/` (10 files for data access)
- `services/user/` (4 files for business logic)
- `controllers/user.controller.ts` - Handle requests
- `validators/user.validator.ts` - Input validation

**Operations:**

1. **Create User** (`Create_User.ts`)
   - Register user account
   - Validate unique email
   - Set default role
   - Initialize profile

2. **Find User by ID** (`Find_User_ID.ts`)
   - Retrieve user by ID
   - Return user details (excluding password)

3. **Find User by Email** (`Find_User_Email.ts`)
   - Search user by email
   - Used during login

4. **Get User Profile** (`Get_User_Profile.ts`)
   - Retrieve complete profile
   - Include preferences
   - Include appointment history

5. **Update Profile** (`Update_Profile.ts`)
   - Update user information
   - Update phone, address, etc.
   - Validate changes

6. **Change Password** (`Secured_Change_Password.ts`)
   - Verify current password
   - Hash new password
   - Update password
   - Require authentication

7. **Login Attempts** (`Login_Attempts.ts`)
   - Track failed login attempts
   - Increment counter

8. **Reset Attempts** (`Reset_Attempts.ts`)
   - Clear failed login attempts
   - Unlock account

9. **Lock User** (`Lock_User.ts`)
   - Lock account after failed attempts
   - Set lock expiry time

10. **Archive User** (soft delete)
    - Mark user as inactive
    - Preserve data

### API Endpoints

```
GET /api/user/profile
Headers: Authorization: Bearer <token>

Response: { userId, email, firstName, lastName, phone, profile }
```

```
PUT /api/user/profile
Headers: Authorization: Bearer <token>
{
  "phone": "+1234567891",
  "address": "123 Main St",
  "city": "New York"
}

Response: { message: "Profile updated", updatedUser }
```

```
PUT /api/user/change-password
Headers: Authorization: Bearer <token>
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}

Response: { message: "Password changed successfully" }
```

```
GET /api/user/all
Headers: Authorization: Bearer <token> (Admin only)

Response: { users: [...] }
```

```
PUT /api/user/archive/:id
Headers: Authorization: Bearer <token> (Admin only)

Response: { message: "User archived" }
```

```
PUT /api/user/restore/:id
Headers: Authorization: Bearer <token> (Admin only)

Response: { message: "User restored" }
```

```
DELETE /api/user/delete/:id
Headers: Authorization: Bearer <token> (Admin only)

Response: { message: "User permanently deleted" }
```

---

## Appointment System

### Feature: Schedule & Manage Appointments

**Files:**
- `repositories/appointment/` (9 files)
- `services/appointment/` (9 files)
- `controllers/appointment.controller.ts`
- `validators/appointment.validator.ts`
- `utils/appointment.time.ts` - Time calculations

**Operations:**

1. **Create Appointment** (`create.appointment.ts`)
   - Schedule new appointment
   - Check dentist availability
   - Prevent double booking
   - Calculate appointment duration
   - Check for conflicts

2. **Check Appointment Conflict** (`check.conflict.appointment.ts`)
   - Verify time slot not taken
   - Ensure no overlapping appointments
   - Check dentist availability

3. **Find All Appointments** (`find_all.appointments.ts`)
   - List all appointments
   - Filter by status, date, user
   - Pagination support

4. **My Appointments** (`my.appointment.ts`)
   - Retrieve user's personal appointments
   - Show only user's bookings

5. **Get Appointment Details** (`details.appointment.ts`)
   - Retrieve full appointment info
   - Include service details
   - Show status

6. **Update Appointment** (`update.appointment.ts`)
   - Modify appointment details
   - Check new time slot availability
   - Update notes

7. **Cancel Appointment** (`cancel.appointment.ts`)
   - Mark as cancelled
   - Free up time slot
   - Notify dentist
   - Refund if applicable

8. **Approve Appointment** (admin)
   - Confirm appointment
   - Change status to "approved"
   - Notify patient

9. **Reject Appointment** (admin)
   - Decline appointment
   - Change status to "rejected"
   - Notify patient with reason

10. **Complete Appointment** (admin)
    - Mark as completed
    - Record service completion
    - Award loyalty points

### Status Flow

```
Created → Pending → Approved → Completed
              ↓
           Rejected
              ↓
          Cancelled
```

### API Endpoints

```
POST /api/appointment
Headers: Authorization: Bearer <token>
{
  "serviceId": "123",
  "date": "2024-09-20",
  "time": "10:30",
  "notes": "Regular checkup"
}

Response: { appointmentId, status: "pending", confirmationCode }
```

```
GET /api/appointment
Headers: Authorization: Bearer <token> (Admin)
Query: ?status=approved&date=2024-09-20&page=1&limit=10

Response: { appointments: [...], total, pages }
```

```
GET /api/appointment/my-appointments
Headers: Authorization: Bearer <token>

Response: { appointments: [...] }
```

```
GET /api/appointment/:id
Headers: Authorization: Bearer <token>

Response: { appointmentId, serviceId, date, time, status, dentist }
```

```
PUT /api/appointment/:id
Headers: Authorization: Bearer <token>
{
  "date": "2024-09-21",
  "time": "14:00",
  "notes": "Updated notes"
}

Response: { message: "Appointment updated" }
```

```
PUT /api/appointment/:id/cancel
Headers: Authorization: Bearer <token>

Response: { message: "Appointment cancelled" }
```

```
PUT /api/appointment/:id/approve
Headers: Authorization: Bearer <token> (Admin)

Response: { message: "Appointment approved" }
```

```
PUT /api/appointment/:id/complete
Headers: Authorization: Bearer <token> (Admin)
{
  "completionNotes": "Procedure completed successfully"
}

Response: { message: "Appointment completed" }
```

---

## Service Management

### Feature: Manage Dental Services

**Files:**
- `repositories/manage-services/` (9 files)
- `services/manage-services/` (8 files)
- `controllers/service.controller.ts`
- `validators/admin.service.validator.ts`

**Operations:**

1. **Create Service** (`Create_Service.ts`)
   - Add new dental service
   - Set service name, description
   - Set price
   - Set duration
   - Set category

2. **Get All Services** (`All_Service.ts`)
   - List active services
   - Include service details
   - Pagination

3. **Find Service** (`Find_Service.ts`)
   - Get specific service by ID
   - Include full details

4. **Update Service** (`Update_Service.ts`)
   - Modify service details
   - Update pricing
   - Update description

5. **Soft Delete Service** (`soft.delete-serv.ts`)
   - Mark as inactive
   - Don't remove from DB
   - Prevent new bookings

6. **Hard Delete Service** (`Delete_Service.ts`)
   - Permanently remove
   - Remove associated data

7. **Archive Service** (`Archive_Service.ts`)
   - Move to archive
   - Different from soft delete

8. **Archive List** (`ArchiveList_Service.ts`)
   - List archived services
   - View inactive services

9. **Restore Service** (`Restore_Service.ts`)
   - Reactivate archived service
   - Make bookable again

### API Endpoints

```
POST /api/service
Headers: Authorization: Bearer <token> (Admin)
{
  "name": "Root Canal",
  "description": "Complete root canal treatment",
  "price": 500,
  "duration": 60,
  "category": "Endodontics"
}

Response: { serviceId, message: "Service created" }
```

```
GET /api/service
Query: ?page=1&limit=10

Response: { services: [...], total }
```

```
GET /api/service/all
Headers: Authorization: Bearer <token> (Admin)

Response: { services: [...], archived: [...] }
```

```
GET /api/service/:id

Response: { serviceId, name, price, duration, description }
```

```
PUT /api/service/:id
Headers: Authorization: Bearer <token> (Admin)
{
  "price": 550,
  "description": "Updated description"
}

Response: { message: "Service updated" }
```

```
DELETE /api/service/:id
Headers: Authorization: Bearer <token> (Admin)

Response: { message: "Service soft deleted" }
```

```
PUT /api/service/:id/archive
Headers: Authorization: Bearer <token> (Admin)

Response: { message: "Service archived" }
```

```
PUT /api/service/:id/restore
Headers: Authorization: Bearer <token> (Admin)

Response: { message: "Service restored" }
```

```
GET /api/service/archive/list
Headers: Authorization: Bearer <token> (Admin)

Response: { archivedServices: [...] }
```

---

## Coupon System

### Feature: Discount Coupons & Promotions

**Files:**
- `repositories/manage-coupon/` (10 files)
- `services/coupon/` (7 files)
- `controllers/coupon.controller.ts`
- `validators/coupon.validator.ts`

**Operations:**

1. **Create Coupon** (`create.coupon.ts`)
   - Add new discount code
   - Set discount percentage or amount
   - Set expiry date
   - Set usage limits

2. **Find All Coupons** (`find.all.coupon.ts`)
   - List all coupons
   - Include expiry, usage, status

3. **Find Active Coupons** (`find.active.coupon.ts`)
   - Show only valid coupons
   - Not expired
   - Still have usage

4. **Update Coupon** (`update.coupon.ts`)
   - Modify coupon details
   - Change discount amount
   - Update expiry

5. **Delete Coupon** (`delete.coupon.ts`)
   - Remove coupon
   - Prevent further usage

6. **Toggle Coupon Status** (`status.coupon.ts`)
   - Activate/deactivate coupon
   - Disable without deletion

7. **Redeem Coupon** (`redeem.coupon.ts`)
   - Apply coupon to appointment
   - Validate coupon code
   - Calculate discount
   - Reduce usage count

8. **Create Patient Coupon** (`create.patient.coupon.ts`)
   - Assign coupon to specific patient
   - For loyalty programs

9. **Find Patient Coupons** (`find.patient.coupon.ts`)
   - List patient's available coupons
   - Show redeemable coupons

10. **Update Patient Coupon** (`update.patient.coupon.ts`)
    - Mark as used/unused
    - Track redemption

### API Endpoints

```
POST /api/coupon
Headers: Authorization: Bearer <token> (Admin)
{
  "code": "SUMMER20",
  "discountType": "percentage",
  "discountValue": 20,
  "expiryDate": "2024-12-31",
  "maxUsage": 100
}

Response: { couponId, message: "Coupon created" }
```

```
GET /api/coupon
Headers: Authorization: Bearer <token>

Response: { coupons: [...] }
```

```
GET /api/coupon/active
Headers: Authorization: Bearer <token>

Response: { activeCoupons: [...] }
```

```
PUT /api/coupon/:id
Headers: Authorization: Bearer <token> (Admin)
{
  "discountValue": 25
}

Response: { message: "Coupon updated" }
```

```
DELETE /api/coupon/:id
Headers: Authorization: Bearer <token> (Admin)

Response: { message: "Coupon deleted" }
```

```
PUT /api/coupon/:id/status
Headers: Authorization: Bearer <token> (Admin)

Response: { message: "Status toggled" }
```

```
POST /api/coupon/:id/redeem
Headers: Authorization: Bearer <token>

Response: { discountAmount, newTotal }
```

---

## Points System

### Feature: Loyalty Points for Patients

**Files:**
- `repositories/manage-patient-points/` (6 files)
- `services/points/` (2 files)
- `controllers/points.controller.ts`

**Operations:**

1. **Get Client Points** (`get.client.points.ts`)
   - Retrieve patient's current points balance
   - Show points breakdown

2. **Get All Patient Points** (`client.points.ts`)
   - Admin: view all patient points

3. **Create Point Transaction** (`create.point.transactions.ts`)
   - Record point earning/redemption
   - Award points for appointments
   - Deduct for redemption

4. **Find Patient Points** (`find.patient.points.ts`)
   - Retrieve specific patient's points

5. **Update Patient Points** (`update.patient.points.ts`)
   - Add or subtract points
   - For manual adjustment

6. **Point Transactions History** (implied)
   - Track all point movements
   - Earning history

### Point Rules

```
- Award points: 1 point per currency unit spent
- Redeem: 100 points = discount amount (configurable)
- Bonus: First appointment = bonus points
- Tier system: More points = higher tier = better benefits
```

### API Endpoints

```
GET /api/points
Headers: Authorization: Bearer <token>

Response: { pointsBalance, totalEarned, totalRedeemed, transactions }
```

```
GET /api/points/client
Headers: Authorization: Bearer <token>

Response: { currentPoints, history: [...] }
```

```
POST /api/points/create-transaction
Headers: Authorization: Bearer <token> (Admin)
{
  "patientId": "patient123",
  "points": 50,
  "type": "earn",
  "description": "Appointment completed"
}

Response: { message: "Points credited", newBalance }
```

---

## Notifications

### Feature: In-App Notifications

**Files:**
- `repositories/notification/` (6 files)
- `services/notification/` (6 files)
- `controllers/notification.controller.ts`

**Operations:**

1. **Create Notification** (`create.notify.ts`)
   - Send notification to user
   - Set title and message
   - Assign notification type

2. **Find Notifications** (`find.notify.ts`)
   - Retrieve user's notifications
   - Pagination support

3. **Get Unread Notifications** (`unread.notify.ts`)
   - Show only unread
   - Count unread messages

4. **Mark Notification as Read** 
   - Update single notification status
   - Remove from unread count

5. **Mark All as Read** (`marked.all.notify.ts`)
   - Clear all unread
   - Batch update

### Notification Types

```
- Appointment Approved
- Appointment Rejected
- Appointment Reminder (24 hours)
- Appointment Completed
- Points Earned
- Coupon Available
- Password Reset Confirmation
- New Service Available
```

### API Endpoints

```
GET /api/notification
Headers: Authorization: Bearer <token>
Query: ?page=1&limit=20

Response: { notifications: [...], total, unreadCount }
```

```
GET /api/notification/unread
Headers: Authorization: Bearer <token>

Response: { unreadNotifications: [...], count }
```

```
PUT /api/notification/:id/read
Headers: Authorization: Bearer <token>

Response: { message: "Marked as read" }
```

```
PUT /api/notification/mark-all-read
Headers: Authorization: Bearer <token>

Response: { message: "All marked as read" }
```

```
POST /api/notification
Headers: Authorization: Bearer <token> (Admin)
{
  "userId": "user123",
  "title": "Appointment Approved",
  "message": "Your appointment is confirmed",
  "type": "appointment_approved"
}

Response: { notificationId }
```

---

## Admin Functions

### Feature: System Administration

**Files:**
- `repositories/admin/` (2 files)
- `services/admin/` (7 files)
- `controllers/admin.controller.ts`
- `middlewares/admin.middleware.ts`

**Operations:**

1. **Find All Admins**
   - List admin users

2. **Create User** (admin)
   - Admin can create any user type

3. **Find All Users** (admin)
   - View all system users
   - Filter and search

4. **Archive List Users**
   - View archived/inactive users
   - Restore if needed

5. **Restore User**
   - Reactivate archived user

6. **Soft Delete User**
   - Deactivate user

7. **Hard Delete User**
   - Permanently remove user

### Admin Middleware

Protects admin-only endpoints:
```typescript
// middleware/admin.middleware.ts
- Verifies user role = "admin"
- Checks JWT token validity
- Logs admin actions
- Prevents unauthorized access
```

### API Endpoints

```
GET /api/admin/users
Headers: Authorization: Bearer <token> (Admin)

Response: { users: [...] }
```

```
GET /api/admin/users/archived
Headers: Authorization: Bearer <token> (Admin)

Response: { archivedUsers: [...] }
```

```
POST /api/admin/users
Headers: Authorization: Bearer <token> (Admin)
{
  "email": "newadmin@example.com",
  "role": "admin",
  "firstName": "Admin",
  "lastName": "User"
}

Response: { userId, message: "User created" }
```

```
PUT /api/admin/users/:id/restore
Headers: Authorization: Bearer <token> (Admin)

Response: { message: "User restored" }
```

---

## Middleware & Validators

### Authentication Middleware (`auth.middleware.ts`)
- Verifies JWT token
- Extracts user info
- Checks token expiry
- Attaches user to request

### Admin Middleware (`admin.middleware.ts`)
- Checks user role = "admin"
- Prevents non-admin access
- Logs admin actions

### Validators
- **auth.validator.ts** - Email, password format
- **user.validator.ts** - Profile data validation
- **appointment.validator.ts** - Date, time validation
- **coupon.validator.ts** - Coupon code format
- **admin.service.validator.ts** - Service data validation

---

## Utility Functions

### JWT Utils (`utils/jwt.ts`)
- Generate JWT token
- Verify token signature
- Decode token
- Set token expiry

### Password Utils (`utils/password.bcrypt.ts`)
- Hash password
- Compare password
- Validate strength

### Appointment Time Utils (`utils/appointment.time.ts`)
- Check time slot availability
- Calculate appointment duration
- Validate appointment times
- Handle timezone

### Init Tables (`utils/init.tables.ts`)
- Initialize database
- Create indexes
- Set up collections
- Seed default data


**Last Updated:** August 2026
