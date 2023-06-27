import express from "express";
import stationsController from "../controllers/stations";
import auth from "../auth";

const router = express.Router();

// GET
router.get("/", /*auth.verifyAuth,*/ stationsController.list);
router.get("/:id", /*auth.verifyAuth,*/ stationsController.list);

// POST
router.post("/", /*auth.verifyAuth,*/ stationsController.add);
router.post("/batch", /*auth.verifyAuth,*/ stationsController.batchAdd);

export default router;
