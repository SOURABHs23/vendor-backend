import mongoose from "mongoose";

const HistoricalPerformanceSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  date: { type: Date, required: true },
  onTimeDeliveryRate: { type: Number, required: true },
  qualityRatingAvg: { type: Number, required: true },
  averageResponseTime: { type: Number, required: true },
  fulfillmentRate: { type: Number, required: true },
});

export default mongoose.model(
  "HistoricalPerformance",
  HistoricalPerformanceSchema
);
