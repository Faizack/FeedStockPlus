import mongoose, { Schema } from 'mongoose';
import { AuditorType } from '../types/model.js';

// Define a schema for the company details
const CompanyDetailSchema = new Schema({
  company_name: { type: String, required: true },
  company_country: { type: String, required: true },
  country_code: { type: String, required: true },
  company_number: { type: String, required: true }
});



// Define the main schema
const AuditorSchema = new Schema({
  company_detail: { type: CompanyDetailSchema, required: true },
  eth_public_address: { type: String, required: true,unique: true },
  email: { type: String, required: true},

});



export const Auditor = mongoose.model<AuditorType>('Auditor', AuditorSchema);