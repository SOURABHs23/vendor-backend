import express from "express";
import {
  createVendor,
  listVendors,
  getVendor,
  updateVendor,
  deleteVendor,
  getVendorPerformance,
} from "../controllers/vendorController.js";

const router = express.Router();

router.post("/", createVendor);
router.get("/", listVendors);
router.get("/:vendorId", getVendor);
router.put("/:vendorId", updateVendor);
router.delete("/:vendorId", deleteVendor);
router.get("/:vendorId/performance", getVendorPerformance);

export default router;
