const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes"); // Importa le rotte

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection failed:", error));

// Utilizza le rotte
app.use("/api", todoRoutes); // Prefissa le rotte con /api

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
