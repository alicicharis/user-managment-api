import { Router as expressRouter } from "express";

import userRouter from "./user";

const router = expressRouter();

router.use("/", userRouter);

export default router;
