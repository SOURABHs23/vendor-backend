import Vendor from "../models/Vendor.js";
import PurchaseOrder from "../models/PurchaseOrder.js";
import HistoricalPerformance from "../models/historicalPerformance.js";

export const updateVendorMetrics = async (vendorId) => {
  try {
    // Get all purchase orders for the vendor
    const purchaseOrders = await PurchaseOrder.find({ vendor: vendorId });

    if (purchaseOrders.length === 0) {
      return null;
    }

    const totalPOs = purchaseOrders.length;
    const completedPOs = purchaseOrders.filter(
      (po) => po.status === "completed"
    );
    const fulfilledPOs = completedPOs.filter(
      (po) => po.issueDate && po.acknowledgmentDate
    );

    const onTimeDeliveryCount = completedPOs.filter(
      (po) => po.deliveryDate <= po.orderDate
    ).length;
    const onTimeDeliveryRate =
      completedPOs.length > 0
        ? (onTimeDeliveryCount / completedPOs.length) * 100
        : 0;

    const qualityRatings = completedPOs
      .map((po) => po.qualityRating)
      .filter((rating) => rating != null);
    const qualityRatingAvg =
      qualityRatings.length > 0
        ? qualityRatings.reduce((a, b) => a + b) / qualityRatings.length
        : 0;

    const responseTimes = fulfilledPOs.map(
      (po) =>
        (new Date(po.acknowledgmentDate) - new Date(po.issueDate)) /
        (1000 * 60 * 60 * 24)
    ); // in days
    const averageResponseTime =
      responseTimes.length > 0
        ? responseTimes.reduce((a, b) => a + b) / responseTimes.length
        : 0;

    const fulfillmentRate =
      totalPOs > 0 ? (fulfilledPOs.length / totalPOs) * 100 : 0;

    // Update vendor metrics
    const vendor = await Vendor.findById(vendorId);
    if (vendor) {
      vendor.onTimeDeliveryRate = Number(onTimeDeliveryRate);
      vendor.qualityRatingAvg = Number(qualityRatingAvg);
      vendor.averageResponseTime = Number(averageResponseTime);
      vendor.fulfillmentRate = Number(fulfillmentRate);
      await vendor.save();
    }

    return vendor;
  } catch (err) {
    console.error("Error updating vendor metrics:", err);
    throw err;
  }
};

export const recordHistoricalPerformance = async (vendor) => {
  try {
    const historicalPerformance = new HistoricalPerformance({
      vendor: vendor._id,
      date: new Date(),
      onTimeDeliveryRate: vendor.onTimeDeliveryRate,
      qualityRatingAvg: vendor.qualityRatingAvg,
      averageResponseTime: vendor.averageResponseTime,
      fulfillmentRate: vendor.fulfillmentRate,
    });

    await historicalPerformance.save();
  } catch (err) {
    console.error("Error recording historical performance:", err);
    throw err;
  }
};
