import express from "express";
import { parseFormidable } from "../utils";
const router = express.Router();

import stationsRouter from "./stations";

router.use("/stations", parseFormidable, stationsRouter);

export default router;
