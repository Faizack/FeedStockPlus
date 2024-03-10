import mongoose, { Schema, Document } from 'mongoose';
import { SupplierType } from '../types/model.js';

// Define a schema for the company details
const CompanyDetailSchema = new Schema({
  company_name: { type: String, required: true },
  company_country: { type: String, required: true },
  country_code: { type: String, required: true },
  company_number: { type: String, required: true }
});

// Define a schema for the address details
const AddressSchema = new Schema({
  street: { type: String, required: true },
  apartment: { type: String },
  postcode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true }
});

const ContactSchema = new Schema({
    phone: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true},
})


// Define the main schema
const SupplierSchema = new Schema({
  company_detail: { type: CompanyDetailSchema, required: true },
  address_detail: { type: AddressSchema, required: true },
  contact_detail: { type: ContactSchema, required: true },
  email: { type: String, required: true},
});



export const Supplier = mongoose.model<SupplierType>('Supplier', SupplierSchema);
