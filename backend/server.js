import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/api", routes)
app.use('/uploads', express.static('uploads'));

// Conexão
app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`)
})