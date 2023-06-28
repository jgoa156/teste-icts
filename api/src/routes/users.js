import express from "express";
import reservationsController from "../controllers/reservations";

const router = express.Router();

// GET
router.get("/:userId/reservations", reservationsController.list);

// POST
router.post("/:userId/placeReservation", reservationsController.add);

export default router;
