import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewSupplierRequestBody, NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utitlity.js";
import { Supplier } from "../models/supplier.js";
import { User } from "../models/user.js";

export const newSupplier = TryCatch(
    async (
      req: Request<{}, {}, NewSupplierRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { address_detail, company_detail, contact_detail, email } = req.body;
  
      console.log(address_detail, company_detail, contact_detail, email);
  
      if (!address_detail || !company_detail || !contact_detail || !email) {
        return next(new ErrorHandler("All fields must be required", 400));
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return next(new ErrorHandler("Unable to find User", 404));
      }
  
      const supplier = await new Supplier({
        address_detail,
        company_detail,
        contact_detail,
        email: user.email
      });
  
      await supplier.save();
  
      return res.status(200).json({
        success: true,
        message: 'Supplier account setup successful.',
        supplier,
      });
    }
  );

