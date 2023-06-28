import express from "express";
import stationsController from "../controllers/stations";
import auth from "../auth";

const router = express.Router();

// GET
router.get("/", stationsController.list);
router.get("/:id", stationsController.list);

// POST
router.post("/", stationsController.add);
router.post("/batch", stationsController.batchAdd);

export default router;
