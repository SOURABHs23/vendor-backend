import "./env.js";
import express from "express";
import connectDB from "./config/db.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes.js";
import auth from "./middleware/auth.js";

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(auth);

// Define Routes
app.use("/api/vendors", vendorRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  // Connect Database
  connectDB();
});
