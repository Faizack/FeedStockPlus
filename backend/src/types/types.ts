import { NextFunction,Request,Response } from "express";
import mongoose from "mongoose";
import { Address, AuditorType, SupplierType } from "./model.js";



// User
export interface NewUserRequestBody {
    email: string;
    password: string;
}



export interface CompleteUserRequestBody {
    name: string;
    token: string;
    firstname: string;
    lastname: string;
    address: Address;
    phone: string;
    mobile: string;

}

// Supplier
export interface NewSupplierRequestBody extends SupplierType {
    email: string;
    
}

export interface NewAditoryRequestBody extends AuditorType{

}



export interface NewProductRequestBody {
    name: string;
    photo: string;
    price: number;
    stock: number;
    category: string;
}

export interface UpdateProductFields {
    name?: string;
    price?: number;
    stock?: number;
    category?: string;
    photo?: string; 
  }

  export interface searchProductFields {
    search?: string;
    price?: {
        minPrice?: number;
        maxPrice?: number;
    };
    sort?: number;
    category?: string;
    page?: number;
}


export type ControllerType = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;



export interface NewCouponRequestBody {
    code: string;
    amount: number;
}

export interface OrderItem {
    productId: mongoose.ObjectId;
    quantity: number;
    name: string;
    photo: string;
    price: number;
}

interface ShippingInfo {
    address: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
}

export interface NewOrderRequestBody  {
    ShippingInfo: ShippingInfo;
    user: mongoose.ObjectId; 
    subtotal: number;
    tax: number;
    discount: number;
    shippingCharges: number;
    total: number;
    orderItems: OrderItem[];
}


