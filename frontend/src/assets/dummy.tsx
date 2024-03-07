import {  SupplierData, UserAccountData } from "../types/user";

export const fetchbasic:UserAccountData={
    firstName: "John",
    lastName: "Doe",
    street: "123 Street",
    apartment: "Apt 101",
    city: "New York",
    country: "USA",
    postcode: "10001",
    phone: "123-456-7890",
    mobile: "987-654-3210",
  }

export const fetchSupplier:SupplierData={
  firstName: fetchbasic.firstName,
  lastName: fetchbasic.lastName,
  street: fetchbasic.street,
  apartment: fetchbasic.apartment,
  city: fetchbasic.city,
  country: fetchbasic.country,
  postcode: fetchbasic.postcode,
  phone: fetchbasic.phone,
  mobile: fetchbasic.mobile,
  company_name: "USA",
  company_country: "1",
  company_number: "123-456-7890",
  country_code: "+1",
}

export  const cities:string[] = ["New York", "London", "Paris", "Tokyo"];
export  const countries:string[] = ["USA", "UK", "France", "Japan"];
export  const countries_code:string[] = ["+1", "+91"];

export const dummyProducts = [
  {
    name: "Product 1",
    availability: "In Stock",
    location: "Location 1",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 2",
    availability: "Out of Stock",
    location: "Location 2",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 3",
    availability: "In Stock",
    location: "Location 3",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 4",
    availability: "In Stock",
    location: "Location 4",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 5",
    availability: "Out of Stock",
    location: "Location 5",
    imageUrl: "https://via.placeholder.com/150",
  },
];