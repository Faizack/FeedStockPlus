import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Auditor } from "../models/auditor.js";
import { User } from "../models/user.js";
import { NewAditoryRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utitlity.js";

export const newAuditor = TryCatch(
  async (
    req: Request<{}, {}, NewAditoryRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { company_detail, eth_public_address, email } = req.body;

    if (!eth_public_address || !company_detail)
      return next(new ErrorHandler("All fields must be required", 400));

    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("Unable to find User", 404));

    const auditor = await new Auditor({
      company_detail,
      email: user.email,
      eth_public_address,
    });

    await auditor.save();

    return res.status(200).json({
      success: true,
      message: "auditor account setup successful.",
      auditor,
    });
  }
);

export const GetVerification = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { certificateType, scheme, certificateNumber } = req.body;

    if (!certificateType || !scheme || !certificateNumber)
      return next(new ErrorHandler("All field are required", 400));
  }
);
