## DentCare: A Cloud-Based Dental Management System for Automating Patient Records and Appointment Scheduling

**THIS CAPSTONE PROJECT FOCUSES ON DEVELOPING AN AUTOMATED `DENTAL CARE MANAGEMENT SYSTEM` DESIGNED TO REPLACE INEFFICIENT MANUAL RECORD-KEEPING. THE PLATFORM DIGITIZES PATIENT HISTORIES AND INTEGRATES AN INTELLIGENT SCHEDULING INTERFACE TO ELIMINATE APPOINTMENT NO-SHOWS. BY PROVIDING A SEAMLESS AND SECURE DIGITAL EXPERIENCE, THE SYSTEM OPTIMIZES CLINIC WORKFLOWS, ENSURES DATA ACCURACY, AND MAXIMIZES OPERATIONAL EFFICIENCY FOR DENTAL PRACTITIONERS AND THEIR PATIENTS.**

## Deployment  
- To deploy this project `Run/Add`.
     - `Git Clone repo`
     - `Add .env outside of src`.
     - `Npm i`
     - `Npm run dev`


## Documentation
    - **Milestone**
        - Backend authentication and authorization system with layered architecture, secure password hashing, JWT authentication, PostgreSQL integration, validation, and role-based access control (RBAC).
    - **Features Added**
        - Implemented a scalable layered structure:
        - Routes
        - Controllers
        - Services
        - Repositories
        - Validators
        - Middlewares
        - Utilities
        - Ensures clear separation of concerns for maintainability and scalability.
    - **PostgreSQL Integration (Raw SQL)**
        - Connected the application using the `pg` package.
        - Uses raw SQL queries instead of ORM tools.
        - Database operations are handled in the repository layer only.
    - **Automatic Database Initialization**
        - Automatically creates required tables on server startup:
            - `users`
            - `roles`
        - Inserts default roles if not existing:
            - `1 → Admin`
            - `2 → User`
    - **Password Security (Bcrypt)**
        - `Passwords are hashed `before saving to the database.
        - Prevents storing plain text passwords.
        - Uses `bcrypt` with `salt rounds` for secure hashing.
    - **JWT Authentication**
        - Implements login authentication system.
        - Generates `JWT token` upon successful login.
        - Encodes user `ID` and `role` information inside the token.
        - Used for securing protected routes.
    - **Role-Based Access Control (RBAC)**
        - Users are assigned roles through the roles table.
        - Uses `foreign key` relationship (role_id).
        - Supports:
            - Admin (role_id = 1)
            - User (role_id = 2)
    - **Authentication** Middleware**
        - Verifies JWT token from request headers.
        - Extracts and attaches user data to request object.
        - Blocks unauthorized access to protected routes.
    - **Admin Route Protection**
        - Restricts sensitive endpoints to `admin` users only.
        - Checks `role_id = 1` before allowing access.
        - Ensures proper` authorization control.`
    - **Input Validation (Zod)**
        - Validates request payloads before reaching service layer.
        - Ensures data integrity and type safety.
        - Prevents invalid database operations.
    - **Database Relationships** 
        - One role can be assigned to many users.
        - Users reference roles via foreign key (role_id).
        - Designed following Third Normal Form (3NF) principles to reduce redundancy and improve data consistency.