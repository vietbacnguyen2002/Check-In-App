import express from "express";
import {
  checkInCustomer,
  createCustomer,
  deleteCustomer,
  exportCustomers,
  getCustomer,
  getCustomers,
  getDashboard,
  importCustomers,
  updateCustomer,
} from "../controllers/customer.controller.js";
import uploadFile from "../middlewares/upload.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

// create new customer
router.post("/", protectRoute(["ADMIN", "USER"]), createCustomer);
// get all customers
router.get("/", protectRoute(["ADMIN","USER"]), getCustomers);
// get customer by id
router.get("/dashboard", protectRoute(["ADMIN"]), getDashboard);

router.get("/export", protectRoute(["ADMIN"]), exportCustomers);

router.post(
  "/import",
  protectRoute(["ADMIN"]),
  uploadFile.single("file"),
  importCustomers
);

router.get("/:id", protectRoute(["ADMIN"]), getCustomer);

// update customer by id
router.put("/:id", protectRoute(["ADMIN"]), updateCustomer);
// delete customer by id
router.delete("/:id", protectRoute(["ADMIN"]), deleteCustomer);

router.post("/check-in", protectRoute(["ADMIN"]), checkInCustomer);

export default router;
