# DentCare Backend - Directory Map & Structure

Quick reference guide to navigate the project structure.

---

## 📁 Project Structure Overview

```
dental-clinic-backend/
├── src/
│   ├── app.ts                    Express app configuration
│   ├── server.ts                 Server entry point
│   ├── config/                   Configuration files
│   ├── controllers/              Request handlers
│   ├── interfaces/               TypeScript interfaces
│   ├── middlewares/              Custom middleware
│   ├── repositories/             Data access layer
│   ├── routes/                   API route definitions
│   ├── services/                 Business logic
│   ├── types/                    Type definitions
│   ├── utils/                    Utility functions
│   └── validators/               Input validators
├── .env                          Environment variables
├── .env.example                  Example environment file
├── .gitignore                    Git ignore rules
├── package.json                  Dependencies & scripts
├── tsconfig.json                 TypeScript config
└── ReadMe.md                     Original project README
```

---

## 🔧 Configuration Files (`src/config/`)

Handles external integrations and database connections.

| File | Purpose | Dependencies |
|------|---------|--------------|
| `cloudinary.ts` | Image upload service | Cloudinary API |
| `db.ts` | Database connection | MongoDB connection string |
| `node_mailer.ts` | Email notifications | SMTP configuration |

**When to modify:**
- Change database: Update `db.ts`
- Upload functionality: Configure `cloudinary.ts`
- Email service: Update `node_mailer.ts`

---

## 👥 Controllers (`src/controllers/`)

Handle HTTP requests and responses. Entry point for API calls.

### Controller Files

| File | Handles | Methods |
|------|---------|---------|
| `auth.controller.ts` | Authentication | register, login, verify, reset |
| `user.controller.ts` | User profile | getProfile, updateProfile, changePassword |
| `appointment.controller.ts` | Appointments | create, cancel, approve, complete |
| `service.controller.ts` | Services | create, update, delete, archive |
| `coupon.controller.ts` | Coupons | create, redeem, status |
| `points.controller.ts` | Loyalty points | getPoints, transactions |
| `notification.controller.ts` | Notifications | create, read, markAsRead |
| `admin.controller.ts` | Admin ops | users, services, system |

**Flow:** Route → Controller → Service → Repository → Database

---

## 📄 Interfaces (`src/interfaces/`)

TypeScript interfaces defining data structures.

| File | Defines | Used In |
|------|---------|---------|
| `user.interface.ts` | User data structure | Auth, User management |
| `appointment.interface.ts` | Appointment data | Scheduling |
| `coupon.interface.ts` | Coupon structure | Discount system |
| `service.interface.ts` | Service details | Service management |

**Why:** Type safety and better IDE autocomplete.

---

## 🛡️ Middlewares (`src/middlewares/`)

Process requests before reaching controllers.

| File | Purpose | Protected Routes |
|------|---------|------------------|
| `auth.middleware.ts` | JWT verification | User, appointment, etc. |
| `admin.middleware.ts` | Admin access check | Admin operations |

**Execution Order:** Request → Auth Middleware → Admin Middleware → Controller

---

## 📦 Repositories (`src/repositories/`)

Data access layer - handles all database operations.

### Repository Organization

```
repositories/
├── admin/                    Admin database ops
├── appointment/              Appointment CRUD (9 operations)
├── auth/                     Auth database ops
├── manage-coupon/            Coupon database ops (10 operations)
├── manage-patient-points/    Points database ops (6 operations)
├── manage-services/          Service database ops (9 operations)
├── manage-users/             User database ops (6 operations)
├── notification/             Notification database ops (6 operations)
└── user/                     User profile database ops (10 operations)
```

### Key Points

- **One repository = One entity/feature**
- **Each file = One specific operation**
- **Example:** `repositories/appointment/create.appointment.ts` = Create appointment in database
- **Pattern:** Separate concerns, single responsibility
---

## 🛣️ Routes (`src/routes/`)

API endpoint definitions and mapping.

| File | Base Path | Features |
|------|-----------|----------|
| `auth.routes.ts` | `/api/auth` | Register, login, verify, reset |
| `user.routes.ts` | `/api/user` | Profile, password, archive |
| `appointment.routes.ts` | `/api/appointment` | Schedule, cancel, approve |
| `service.routes.ts` | `/api/service` | CRUD operations |
| `coupon.routes.ts` | `/api/coupon` | Create, redeem, manage |
| `points.routes.ts` | `/api/points` | Get balance, history |
| `notification.routes.ts` | `/api/notification` | Notifications |
| `admin.routes.ts` | `/api/admin` | Admin operations |
| `public.routes.ts` | `/api/public` | Public endpoints |

**Structure:**
```typescript
router.post('/endpoint', middleware, controller.method);
```

---

## ⚙️ Services (`src/services/`)

Business logic layer - contains the "how things work".

### Service Organization

```
services/
├── admin/                  Admin business logic (7 files)
├── appointment/            Appointment logic (9 files)
├── auth/                   Authentication logic (5 files)
├── coupon/                 Coupon logic (7 files)
├── manage-services/        Service logic (8 files)
├── notification/           Notification logic (6 files)
├── points/                 Points logic (2 files)
└── user/                   User logic (4 files)
```

### Service Responsibilities

- **Validation** - Check data is correct
- **Business Logic** - Process data according to rules
- **Data Manipulation** - Transform data as needed
- **Repository Calls** - Interact with database
- **Error Handling** - Handle exceptions

**Example Service Flow:**
```typescript
Service receives request data
  ↓
Validates input
  ↓
Applies business rules
  ↓
Calls repository to get/save data
  ↓
Returns result to controller
```

---

## 🔤 Types (`src/types/`)

Custom TypeScript type definitions.

| File | Defines |
|------|---------|
| `database.type.ts` | Database connection types |

---

## 🛠️ Utilities (`src/utils/`)

Reusable utility functions.

| File | Purpose | Used By |
|------|---------|---------|
| `jwt.ts` | Generate/verify JWT tokens | Auth |
| `password.bcrypt.ts` | Hash/compare passwords | Auth, User |
| `appointment.time.ts` | Time validation & calculations | Appointment |
| `init.tables.ts` | Database initialization | Server startup |

---

## ✔️ Validators (`src/validators/`)

Input validation rules for different endpoints.

| File | Validates |
|------|-----------|
| `auth.validator.ts` | Register, login, password |
| `user.validator.ts` | Profile updates |
| `appointment.validator.ts` | Appointment creation |
| `coupon.validator.ts` | Coupon data |
| `admin.service.validator.ts` | Service creation/updates |

**When to add validation:**
1. New endpoint needs input
2. Create corresponding validator file
3. Add validation rules
4. Use in controller

---

## 📋 Configuration Files (Root Level)

| File | Purpose |
|------|---------|
| `.env` | Environment variables (don't commit) |
| `.env.example` | Template for environment variables |
| `.gitignore` | Files to exclude from git |
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript compiler options |
| `ReadMe.md` | Original project documentation |

---

## 📚 Navigation Guide

### To add a new feature:
1. Create interface in `src/interfaces/`
2. Create repository files in `src/repositories/feature/`
3. Create service files in `src/services/feature/`
4. Create controller in `src/controllers/`
5. Create routes in `src/routes/`
6. Create validators in `src/validators/`
7. Update `src/app.ts` to include routes
8. Test endpoints

### To modify authentication:
- Change rules: `src/services/auth/`
- Change validation: `src/validators/auth.validator.ts`
- Change middleware: `src/middlewares/auth.middleware.ts`
- Update JWT: `src/utils/jwt.ts`

### To add validation:
1. Check `src/validators/`
2. Find relevant validator or create new
3. Add validation rule
4. Use in controller

### To add external service:
1. Add config in `src/config/`
2. Create utility in `src/utils/` if needed
3. Use in appropriate service
4. Add environment variables to `.env`

---

## 🎯 Quick Reference

### Most Changed Files
- `src/config/` - When adding new services
- `src/services/` - When changing business logic
- `src/validators/` - When changing validation rules
- `src/routes/` - When adding endpoints
- `.env` - When configuring environment

### For New Developers
1. Start with `README_ACTUAL.md`
2. Read `FEATURES_AND_API.md`
3. Explore `src/controllers/` to see examples
4. Check `src/services/` to understand logic
5. Review `src/validators/` for patterns

---

**Last Updated:** August 2026
**For:** DentCare Backend Project
