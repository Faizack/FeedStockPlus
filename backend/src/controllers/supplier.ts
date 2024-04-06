import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewSupplierRequestBody, NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utitlity.js";
import { Supplier } from "../models/supplier.js";
import { User } from "../models/user.js";
import { SupplierType } from "../types/model.js";

export const newSupplier = TryCatch(
  async (
    req: Request<{}, {}, SupplierType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      company_country,
      company_name,
      company_number,
      country_code,
      userId,
    } = req.body;

    console.log(company_country, company_name, company_number, country_code);

    if (!company_country || !company_country || !company_country || !userId) {
      return next(new ErrorHandler("All fields must be required", 400));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("Unable to find User", 404));
    }

    const supplier = await new Supplier({
      company_country,
      company_name,
      company_number,
      country_code,
      userId: user._id, // Storing the userId for reference
    });

    await supplier.save();

    return res.status(200).json({
      success: true,
      message: "Supplier account setup successful.",
      data:supplier,
    });
  }
);
