'use server'
import postgres from 'postgres'

const connectionString = process.env.POSTGRES_URL as string
const sql = postgres(connectionString)

export default sql