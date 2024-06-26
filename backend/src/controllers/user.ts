import { Request, Response, NextFunction } from "express";
import { CompleteUserRequestBody, NewUserRequestBody } from "../types/types.js";
import { PendingUser, User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utitlity.js";
import { generateToken } from "../middlewares/auth.js";

import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../mail/send.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    console.log("Email ", email, password);
    if (!email || !password)
      return next(
        new ErrorHandler("Please Enter all required parameters", 400)
      );

    // Find user by email
    const user = await User.findOne({ email });

    // If user  found, send error message
    if (user) return next(new ErrorHandler("User Already Exist", 400));

    // Find user by email
    const pending = await PendingUser.findOne({ email });

    // If pending found, send error message
    if (pending)
      return next(
        new ErrorHandler("Peding User Please complete Verification ", 400)
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateToken({ email });

    const pendingUser = new PendingUser({
      email,
      password: hashedPassword,
      verificationToken,
    });
    await pendingUser.save();

    // Send verification email
    sendVerificationEmail(email, verificationToken);

    return res.status(200).json({
      success: true,
      message: `Signup successful. Please verify your email : ${pendingUser.email} `,
    });
  }
);

export const completeUser = TryCatch(
  async (
    req: Request<{}, {}, CompleteUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      verifytoken,
      firstname,
      lastname,
      street,
      apartment,
      city,
      country,
      postcode,
      phone,
      mobile,
    } = req.body;

    // Find pending user by verification token
    if (!verifytoken || !firstname || !lastname || !phone || !mobile) {
      return next(new ErrorHandler("Please give all required parameters", 400));
    }

    const pendingUser = await PendingUser.findOne({
      verificationToken: verifytoken,
    });

    if (!pendingUser) {
      return next(new ErrorHandler("Failed to find pending user", 401));
    }

    // Create actual user from pending user data
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: pendingUser.email,
      password: pendingUser.password,
      street: street,
      apartment: apartment,
      city: city,
      country: country,
      postcode: postcode,
      phone: phone,
      mobile: mobile,
    });

    // Save actual user to database
    await user.save();

    // Delete pending user
    await PendingUser.deleteOne({ _id: pendingUser._id });

    const token = generateToken({
      email: user.email,
      userId: String(user._id),
    });

    // Send token in response
    return res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Account setup completed successfully.",
        data: { token: token, user: user },
      });
  }
);

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  // Find user by email
  const user = await User.findOne({ email });

  // If user not found, throw error
  if (!user) {
    return next(new ErrorHandler("user not found please signup", 401));
  }

  // Compare passwords
  const match = await bcrypt.compare(password, user.password);

  // If passwords don't match, throw error
  if (!match) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Create JWT token
  const token = generateToken({ email: email, userId: String(user._id) });

  // Send token in response
  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Login successful",
      data: { token: token, user: user },
    });
};

export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export const getUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    if (!userId) {
      return next(new ErrorHandler("U parameter is required", 400));
    }

    const user = await User.findById(userId);
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
    req: Request<
      {},
      {},
      {
        role: string;
        userId: string;
      }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { role, userId } = req.body;

    console.log("in update role", role, userId);

    // Check if the role and email parameters are provided
    if (!role || !userId) {
      return next(new ErrorHandler("Role or email parameter is missing", 400));
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {  role: role.toLowerCase() },
      { new: true }
    );

    // Check if the user exists
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
    });
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
