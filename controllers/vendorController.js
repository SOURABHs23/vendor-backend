import Vendor from "../models/Vendor.js";

// Create a new vendor
export const createVendor = async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const vendor = await newVendor.save();
    res.json(vendor);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// List all vendors
export const listVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Get a specific vendor
export const getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId);
    if (!vendor) {
      return res.status(404).json({ msg: "Vendor not found" });
    }
    res.json(vendor);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Update a vendor
export const updateVendor = async (req, res) => {
  try {
    let vendor = await Vendor.findById(req.params.vendorId);
    console.log(vendor);
    if (!vendor) {
      return res.status(404).json({ msg: "Vendor not found" });
    }

    vendor = await Vendor.findByIdAndUpdate(
      req.params.vendorId,
      { $set: req.body },
      { new: true }
    );
    res.json(vendor);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

export const deleteVendor = async (req, res) => {
  try {
    console.log("In delete", req.params.vendorId); // Log the vendorId for debugging
    const result = await Vendor.findByIdAndDelete(req.params.vendorId);

    if (!result) {
      return res.status(404).json({ msg: "Vendor not found" });
    }

    res.json({ msg: "Vendor removed" });
  } catch (err) {
    console.error("Error deleting vendor:", err); // Log the error details
    res.status(500).send("Server Error");
  }
};

// Get vendor performance metrics
export const getVendorPerformance = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId);
    if (!vendor) {
      return res.status(404).json({ msg: "Vendor not found" });
    }

    const performance = {
      onTimeDeliveryRate: vendor.onTimeDeliveryRate,
      qualityRatingAvg: vendor.qualityRatingAvg,
      averageResponseTime: vendor.averageResponseTime,
      fulfillmentRate: vendor.fulfillmentRate,
    };

    res.json(performance);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
