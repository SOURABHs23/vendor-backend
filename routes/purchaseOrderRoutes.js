import express from "express";
import {
  createPurchaseOrder,
  listPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  acknowledgePurchaseOrder,
} from "../controllers/purchaseOrderController.js";

const router = express.Router();

router.post("/", createPurchaseOrder);
router.get("/", listPurchaseOrders);
router.get("/:poId", getPurchaseOrder);
router.put("/:poId", updatePurchaseOrder);
router.delete("/:poId", deletePurchaseOrder);
router.post("/:poId/acknowledge", acknowledgePurchaseOrder);

export default router;
