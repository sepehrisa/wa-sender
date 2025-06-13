const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

dotenv.config();

const app = express(); 

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'WA Sender API',
    version: '1.0.0',
    description: 'API documentation for your project',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);

const messageRoutes = require("./routes/message.routes");
app.use("/api/messages", messageRoutes);

const excelRoutes = require('./routes/excelRoutes');
app.use('/api/excel', excelRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ DB Error:", err));

module.exports = app;
