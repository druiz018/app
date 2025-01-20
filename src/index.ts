import express from "express";
import homeRoute from "./routes/home.router";

const app = express()

app.get('/', homeRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Servidor corriendo por http://localhost:',PORT)
})