import mongoose, { Schema, Document } from 'mongoose';
import { SupplierType } from '../types/model.js';


// Define the main schema
const SupplierSchema = new  Schema({
  company_name: { type: String, required: true },
  company_country: { type: String, required: true },
  country_code: { type: String, required: true },
  company_number: { type: String, required: true },
  
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
})


export const Supplier = mongoose.model<SupplierType>('Supplier', SupplierSchema);
