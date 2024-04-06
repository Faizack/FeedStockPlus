import mongoose, { Document } from "mongoose";

export interface IPendingUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  verificationToken: string;
}

export interface Address {
  street?: string;
  apartment?: string;
  city: string;
  country: string;
  postcode: string;
}

export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  street?: string;
  apartment?: string;
  city: string;
  country: string;
  postcode: string;
  phone: string;
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define a TypeScript interface for the form data
export interface SupplierType extends Document {
    company_name: string;
    company_country: string;
    country_code: string;
    company_number: string;
    userId: string,


}

export interface AuditorType extends Document {
  company_detail: {
    company_name: string;
    company_country: string;
    country_code: string;
    company_number: string;
  };
  eth_public_address: string;
  email: string;
}


interface ChatPart {
  role: string;
  parts: string;
}

export interface ChatType extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  data: {
    chatId?: mongoose.Schema.Types.ObjectId;
    chats: ChatPart[];
  }[];
}