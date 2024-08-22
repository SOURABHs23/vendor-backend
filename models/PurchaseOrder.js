import mongoose from "mongoose";

const PurchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, unique: true, required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  items: { type: Array, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  qualityRating: { type: Number, default: null },
  issueDate: { type: Date, required: true },
  acknowledgmentDate: { type: Date, default: null },
});

export default mongoose.model("PurchaseOrder", PurchaseOrderSchema);
