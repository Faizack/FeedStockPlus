import { Request, Response, NextFunction } from "express";
import { CompleteUserRequestBody, NewUserRequestBody } from "../types/types.js";
import { PendingUser, User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utitlity.js";
import { generateToken } from "../middlewares/auth.js";

import bcrypt from "bcrypt";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    console.log("Email ", email, password);
    if (!email || !password) {
      return next(new ErrorHandler("Please give all required parameters", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateToken({ email });

    const pendingUser = new PendingUser({
      email,
      password: hashedPassword,
      verificationToken,
    });
    await pendingUser.save();

    // Send verification email
    // sendVerificationEmail(email, verificationToken);

    return res.status(200).json({
      success: true,
      message: `'Signup successful. Please verify your email.', ${pendingUser.email} `,
    });
  }
);

export const completeUser = TryCatch(
  async (
    req: Request<{}, {}, CompleteUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, token, firstname, lastname, address, phone, mobile } =
      req.body;

    // Find pending user by verification token
    if (!token || !firstname || !lastname || !address || !phone || !mobile) {
      return next(new ErrorHandler("Please give all required parameters", 400));
    }
    
    const pendingUser = await PendingUser.findOne({ verificationToken: token });

    if (!pendingUser) {
      return next(new ErrorHandler("Failed to find pending user", 401));
    }

    // Create actual user from pending user data
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      token,
      email: pendingUser.email,
      password: pendingUser.password,
      address: {
        street: address.street,
        apartment: address.apartment,
        city: address.city,
        country: address.country,
        postcode: address.postcode,
      },
      phone: phone,
      mobile: mobile,
    });

    // Save actual user to database
    await user.save();

    // Delete pending user
    await PendingUser.deleteOne({ _id: pendingUser._id });

    res.status(200).send("Account setup completed successfully.");
  }
);


export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      throw new ErrorHandler("Please provide email and password", 400);
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, throw error
    if (!user) {
      throw new ErrorHandler("Invalid email or password", 401);
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);

    // If passwords don't match, throw error
    if (!match) {
      throw new ErrorHandler("Invalid email or password", 401);
    }

    // Create JWT token
    const token = generateToken({email:email,userId: String(user._id)})

    // Send token in response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};



export const getUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    if (!email) {
      return next(new ErrorHandler("Email parameter is required", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  }
);


export const updateRole = TryCatch(
  async (
    req: Request<{}, {},  {
      role: string;
      email: string;
    }>,
    res: Response,
    next: NextFunction
  ) => {
    const { role,email } = req.body;

    // Check if the role and email parameters are provided
    if (!role || !email) {
      return next(new ErrorHandler("Role or email parameter is missing", 400));
    }

    const user = await User.findOneAndUpdate({ email }, { role }, { new: true });

    // Check if the user exists
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).send("User role updated successfully.");
  }
);

export const deleteUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return next(new ErrorHandler("Invalid Format  ID", 400));

    const user = await User.deleteOne({ _id: id });

    if (user.deletedCount === 0)
      return next(new ErrorHandler("User not found", 404));

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
);
