import { pool } from "../config/db";

export const initTables = async () => {

  try{

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
      points INT NOT NULL DEFAULT 0,
      duration_minutes INT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      deleted_at TIMESTAMP NULL
    );
    `);

  
    //admin coupon creation
    await pool.query(`
      
    CREATE TABLE IF NOT EXISTS coupons (

    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('EVENT','NORMAL')),
    discount_percent NUMERIC(5,2) NOT NULL
    CHECK (discount_percent > 0 AND discount_percent <= 100),
    required_points INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP

);
      `);


    // Patient Coupon
    await pool.query(

`
CREATE TABLE IF NOT EXISTS patient_coupons (

    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_coupon_id INT NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL
    CHECK (status IN ('UNUSED','USED','EXPIRED'))
    DEFAULT 'UNUSED',
    redeemed_at TIMESTAMP NOT NULL
    DEFAULT NOW(),
    used_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL
    DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL
    DEFAULT NOW(),
    deleted_at TIMESTAMP

);
`

);



    // Patient Points Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patient_points (
    id SERIAL PRIMARY KEY,

    user_id INT NOT NULL UNIQUE
        REFERENCES users(id)
        ON DELETE CASCADE,

    total_points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    );
      `);



    // Appointments Table
    await pool.query(`
      
    CREATE TABLE IF NOT EXISTS appointments (

    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_id INT NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    patient_name VARCHAR(150) NOT NULL,
    age INT NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL
    CHECK (status IN ('PENDING','APPROVED','REJECTED','COMPLETED','CANCELLED'))
    DEFAULT 'PENDING',
    coupon_id INT REFERENCES coupons(id) ON DELETE SET NULL,
    patient_coupon_id INT REFERENCES patient_coupons(id) ON DELETE SET NULL,
    original_amount DECIMAL(10,2),
    discount_amount DECIMAL(10,2) DEFAULT 0,
    final_amount DECIMAL(10,2),
    points_earned INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP

);

    `);


    // Point Transactions Table
    await pool.query(`
      
      CREATE TABLE IF NOT EXISTS point_transactions (

    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,
    appointment_id INT
        REFERENCES appointments(id)
        ON DELETE SET NULL,
    patient_coupon_id INT
      REFERENCES coupons(id)
      ON DELETE SET NULL,
    transaction_type VARCHAR(20) NOT NULL,
    points INT NOT NULL,
    balance_before INT NOT NULL,
    balance_after INT NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT NOW()

);
      
      `);



    // Notifications Table
    await pool.query(`
      
      CREATE TABLE IF NOT EXISTS notifications (

    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()

);
      
      `);


    console.log("Tables  initialized");
  }
  catch(error){
    console.error("Table Error", error);
  }
    
};