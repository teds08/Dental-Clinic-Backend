import { pool } from "../config/db";

export const initTables = async () => {

    // Roles table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS roles (
      role_id SERIAL PRIMARY KEY,
      role_name VARCHAR(50) NOT NULL,
      description TEXT
    )
  `);


  // Insert default roles (only if empty)
  await pool.query(`
    INSERT INTO roles (role_name, description)
    SELECT 'admin', 'Administrator role'
    WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_id = 1)
  `);

  // Insert default user role (only if empty)
  await pool.query(`
    INSERT INTO roles (role_name, description)
    SELECT 'user', 'Default user role'
    WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_id = 2)
  `);




  


  // Users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password TEXT NOT NULL,
      contact_number VARCHAR(20),
      role_id INT DEFAULT 2,
      
      otp_code VARCHAR(10),
      otp_expires_at TIMESTAMP,
      otp_attempts INTEGER DEFAULT 0,
      otp_resend_available_at TIMESTAMP NULL,
      
      password_change_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      failed_login_attempts INT DEFAULT 0,
      locked_until TIMESTAMP NULL,
      deleted_at TIMESTAMP NULL,

      CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
    )
  `);


  // Session Table
  await pool.query(`
    
    CREATE TABLE IF NOT EXISTS password_reset_sessions (
      session_id UUID PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      otp_verified BOOLEAN DEFAULT FALSE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
    `);



    // Services Table
  await pool.query(`

    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      image TEXT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      image_public_id TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      deleted_at TIMESTAMP NULL
    );
    `);

  console.log("Tables  initialized");
};