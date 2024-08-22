import PurchaseOrder from "../models/PurchaseOrder.js";
import Vendor from "../models/Vendor.js";
import {
  updateVendorMetrics,
  recordHistoricalPerformance,
} from "../utils/calculateMetrics.js";

// Create a purchase order
export const createPurchaseOrder = async (req, res) => {
  try {
    console.log("In create order");
    const newPO = new PurchaseOrder(req.body);
    const po = await newPO.save();

    // Update metrics after PO creation
    const vendor = await updateVendorMetrics(po.vendor);
    if (vendor) {
      await recordHistoricalPerformance(vendor);
    }

    res.json(po);
  } catch (err) {
    console.error("Error creating purchase order:", err);
    res.status(500).send("Server Error");
  }
};

// List all purchase orders with optional vendor filter
export const listPurchaseOrders = async (req, res) => {
  try {
    const { vendorId } = req.query;
    const filter = vendorId ? { vendor: vendorId } : {};
    const purchaseOrders = await PurchaseOrder.find(filter);
    res.json(purchaseOrders);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Get a specific purchase order
export const getPurchaseOrder = async (req, res) => {
  try {
    const po = await PurchaseOrder.findById(req.params.poId);
    if (!po) {
      return res.status(404).json({ msg: "Purchase order not found" });
    }
    res.json(po);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Update a purchase order
export const updatePurchaseOrder = async (req, res) => {
  try {
    const po = await PurchaseOrder.findByIdAndUpdate(
      req.params.poId,
      req.body,
      { new: true }
    );
    if (!po) {
      return res.status(404).json({ msg: "Purchase order not found" });
    }

    // Update metrics after PO update
    const vendor = await updateVendorMetrics(po.vendor);
    if (vendor) {
      await recordHistoricalPerformance(vendor);
    }

    res.json(po);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Delete a purchase order
export const deletePurchaseOrder = async (req, res) => {
  try {
    const po = await PurchaseOrder.findByIdAndDelete(req.params.poId);
    if (!po) {
      return res.status(404).json({ msg: "Purchase order not found" });
    }

    // Update metrics after PO deletion
    const vendor = await updateVendorMetrics(po.vendor);
    if (vendor) {
      await recordHistoricalPerformance(vendor);
    }

    res.json({ msg: "Purchase order deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Acknowledge a purchase order
export const acknowledgePurchaseOrder = async (req, res) => {
  try {
    const po = await PurchaseOrder.findById(req.params.poId);
    if (!po) {
      return res.status(404).json({ msg: "Purchase order not found" });
    }

    // Update the acknowledgment date
    po.acknowledgmentDate = new Date();
    await po.save();

    // Update metrics after acknowledgment
    const vendor = await updateVendorMetrics(po.vendor);
    if (vendor) {
      await recordHistoricalPerformance(vendor);
    }

    res.json(po);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// // Update a purchase order
// export const updatePurchaseOrder = async (req, res) => {
//   try {
//     let po = await PurchaseOrder.findById(req.params.poId);
//     if (!po) {
//       return res.status(404).json({ msg: "Purchase order not found" });
//     }

//     po = await PurchaseOrder.findByIdAndUpdate(
//       req.params.poId,
//       { $set: req.body },
//       { new: true }
//     );
//     res.json(po);
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// };
