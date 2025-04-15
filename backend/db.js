import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || process.env.DB_NAME || 'banco_petshop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// Test the connection
try {
    const connection = await pool.getConnection()
    console.log("Conectado ao MySQL!")
    connection.release()
} catch (error) {
    console.error("Erro ao conectar ao MySQL:", error)
    process.exit(1) // Exit if DB connection fails
}

export default pool