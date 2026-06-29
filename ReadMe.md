## DentCare: A Cloud-Based Dental Management System for Automating Patient Records and Appointment Scheduling

**THIS CAPSTONE PROJECT FOCUSES ON DEVELOPING AN AUTOMATED `DENTAL CARE MANAGEMENT SYSTEM` DESIGNED TO REPLACE INEFFICIENT MANUAL RECORD-KEEPING. THE PLATFORM DIGITIZES PATIENT HISTORIES AND INTEGRATES AN INTELLIGENT SCHEDULING INTERFACE TO ELIMINATE APPOINTMENT NO-SHOWS. BY PROVIDING A SEAMLESS AND SECURE DIGITAL EXPERIENCE, THE SYSTEM OPTIMIZES CLINIC WORKFLOWS, ENSURES DATA ACCURACY, AND MAXIMIZES OPERATIONAL EFFICIENCY FOR DENTAL PRACTITIONERS AND THEIR PATIENTS.**

## Deployment  
- To deploy this project `Add/Install/Run`.
     - `Git Clone repo`.
     - `Add .env outside of src`.
     - `Npm i`.
     - `Npm run dev`.


## Documentation
- **Milestone**
- 
- **Features Added**
- 

## Features Documentation
- **Feature: Authentication & Password Management**
- *MAY 29 2026*
     - 1. User Registration
          - Register new user account.
          - Validate user information.
          - Store encrypted password.
     - 2. Password Management with NodeMailer for OTP Email Verification System
          - Change password using Bearer Token authentication.
          - Send OTP through Nodemailer.
          - Verify OTP.
          - Resend OTP.
          - Allow password change after successful OTP verification.

## Feature Update MAY 30 2026
- Features: Resend OTP `for Bearer Token Only`.
     - Changes Added: Cooldown time for 5 mins.


## Feature: Authentication , Password Recovery (for none `Bearer Token`) & User Profile Management
- *JUNE 1 to JUNE 5 2026*
     - 1. User Login
          - Authenticate user credentials
          - Generate Bearer Token for secure access
          - Validate user authentication
     - 2. User Profile Management
          - Get user profile.
          - Update user profile information except for password `(Token Bearer)`.
     - 3. Account Recovery (Email OTP using Nodemailer)
          - Request OTP
          - Verify OTP
          - Reset Password
          - Resend OTP

## Feature Update JUNE 7 to JUNE 10 2026
- Features: Login, Verify Otp, Resend Otp
     - Changes Added: 
          - `Anti Brute Force` 5 attempts.
          - Locked User / Giving a Cooldown Time for 5 mins
     - Features : Account Recovery 
          Changes Added:  
          - Now in Session Table
          - id int into uuid
     - Bug Fixed
          - Fix Bug where user can create multiple Session.
          - Delete Session when user Successfully Change Password.


## Feature:  Admin User Management
- *JUNE 13  to JUNE 18 2026*
     - 1. User Management
          - Get all registered users
          - View user information
          - Create new users or admin accounts
     - 2. User Archive Management
          - Archive users using soft delete
          - View archived users
          - Restore archived users
     - 3. User Deletion Management
          - Permanently delete users using hard delete
          - Remove user records from the database


## Feature: Service Management
- *JUNE 20 to JUNE 24 2026*
     - 1.  Service CRUD Management
          - Create new services
          - Get all available services
          - Update service information
     - 2.  Service Archive Management
          - Archive services using soft delete
          - View archived service list
          - Restore archived services
     - 3. Service Deletion Management
          - Permanently delete services using hard delete
          - Remove service records from the database

## Feature: Update June 25 2026
- Features: Service Management
     - Changes Added: 
          - Refactor Service code change local store image into cloud
          - Delete Package multer
          - Integrate to the Cloudinary where we store image through cloud
     - Bug Fixed:
          - Where image is not deleted in cloudinary website when calling Delete/Update method.

## Feature Update and Modify CODE JUNE 27 2026
- Features: Service Management
     - Changes Added:
          - Add a points for every services created

- Code : auth.middleware
     - Changes Added:
          - add AuthRequest export in auth.middleware in line 4
          - remove res.local.user.id or res.local.user
          - replace it into req.user


## 










# API Documentation
## guest.routes.ts 
1. **POST /login**
- *Description*
     - Authenticate an existing user.
- Request Body Example
     - {
     - `"email": "user@gmail.com",`
     - `"password": "password123"`
     - }
- Response : Returns authenticated user token.

2. **POST /forgot/password**
- *Description*
     - Starts the forgot password process. Sends `OTP` to user's `email`.

- **POST /verify/otp**
- *Description*
     - Verifies OTP during password recovery.
- Request Body Example
     - {
     -   `"otp":"325123"`
     - }

3. **POST /reset/password**
- *Description*
     - Changes password after `OTP` verification.
- Request Body Example
     - {
     -    `"newPassword":"new123",`
     -    `"confirmPassword":"new123"`
     - }

4. **POST /resend/otp**
- *Description*
     - Resends OTP if the previous one expires or the user didn't get the 1st otp.

## user.routes.ts
1. **POST /create**
- *Description*
     - Create/Register a new user.
- Request Body Example
     - {
     -    `"username":"john",`
     -    `"email":"john@gmail.com",`
     -    `"password":"123456",`
     -    `"contact_number":"09xx-32xx-4xx"`
     - }

2. **PUT /update/info/:id**
- *Description*
     - Update user information except for password.
- Request Body Example
     - {
     -    `"username":"new John Doe"`
     - }

3. **GET /profile**
- *Description*
     - Get logged-in user's profile.

4. **POST /auth/user/send/otp**
- *Description*
     - Send OTP for logged-in user for password change.

5. **POST /auth/user/verify/otp**
- *Description*
     - Verify OTP before changing password.
- Request Body Example
     - `{
     -    `"otp":"322xx32"`
     - }`

6. **POST /auth/user/change/password**
- *Description*
     - Change password after OTP verification.
- Request Body Example
     - `{
     -    `"currentPassword":"123pass",`
     -    `"newPassword":"newpass123",`
     -    `"confirmPassword":"newpass123"`
     - }`

7. **POST /auth/user/resend/otp**
- *Description*
     - Resend password-change OTP.

## admin.routes.ts
1. **GET /active/users**
- *Description*
     - Get all active users.

2. **PATCH /restore/user/:id**
- *Description*
     - Restore a soft-deleted user.
- Example:
     - `PATCH /restore/user/10`

3. **POST /admin/create**
- *Description*
     - Create a new admin/user account.
- Request Body Example: `1. admin 2. user`
     - {
     -    `"username":"john",`
     -    `"email":"john@gmail.com",`
     -    `"password":"123456",`
     -    `"contact_number":"09xx-32xx-4xx",`
     -    `"role_id":"1 or 2"`
     - }

4. **GET /archive/users**
- *Description*
     - View archived/soft-deleted users.

5. **PATCH /soft/delete/:id**
- *Description*
     - Soft delete a user.
- Parameter
     - `:id = user ID`

6. **DELETE /hard/delete/:id**
- *Description*
     - Permanently remove a user.
- Parameter
     - `:id = user ID`


## service.routes.ts
1. **POST /create/services**
- *Description*
     - Create a new dental service.
- Request Body Example
     - {
     -    `"title": "Orthodontics",`
     -    `"description": "lorem ipsum, lorem ipsumlorem lorem ipsum lorem ipsum",`
     -    `"price": 3500,`
     -    `"image": "url in Cloudinary",`
     -    `"image_public_id":"public id in Cloudinary",`
     -    `"points": 5`
     - }
- `Step 1 -> upload image in Cloudinary -> Get the url and public id -> paste it in Request Body.`

2. **PATCH /update/services/:id**
- *Description
     - Update existing service information.
- Request Body Example
     - {
     -    `"price":300`
     - }
- Parameter -> `:id = service ID`

3. **PATCH /archive/services/:id**
- *Description*
     - Archive/SoftDelete a service.
- Parameter -> `:id = service ID`

4. **PATCH /restore/services/:id**
- *Description
     - Restore archived service.
- Parameter -> `:id = service ID`

5. **GET /services/archive**
- *Description*
     - Retrieve archived/softdeleted services.

6. **GET /active/services**
- *Description*
     - Get all active dental services.

7. **DELETE /delete/service/:id**
- *Description*
     - Permanently delete a service.
- Parameter -> `:id = service ID`
