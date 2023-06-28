import express from "express";
import { parseFormidable } from "../utils";
const router = express.Router();

import stationsRouter from "./stations";
import usersRouter from "./users";

router.use("/stations", parseFormidable, stationsRouter);
router.use("/users", parseFormidable, usersRouter);

export default router;
