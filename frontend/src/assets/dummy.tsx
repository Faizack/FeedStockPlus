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


// export const dummyProducts =[]

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

interface Supplier {
  ID: string;
  Supplier: string;
  Country: string;
  Date_request: string;
  Status: string;
  Verifier: string;
}

export const dummySupplierTable: Supplier[] = [
  {
    ID: "S321",
    Supplier: "Bio-World",
    Country: "PT",
    Date_request: "01/12/2023",
    Status: "pending",
    Verifier: "S320",
  },
  {
    ID: "S322",
    Supplier: "Tech-Trade",
    Country: "US",
    Date_request: "02/15/2023",
    Status: "approved",
    Verifier: "S320",
  },
  {
    ID: "S323",
    Supplier: "MediCorp",
    Country: "UK",
    Date_request: "03/21/2023",
    Status: "pending",
    Verifier: "S324",
  },
  {
    ID: "S324",
    Supplier: "BioHealth",
    Country: "DE",
    Date_request: "04/05/2023",
    Status: "rejected",
    Verifier: "S322",
  },
  {
    ID: "S321",
    Supplier: "Bio-World",
    Country: "PT",
    Date_request: "01/12/2023",
    Status: "pending",
    Verifier: "S320",
  },
  {
    ID: "S322",
    Supplier: "Tech-Trade",
    Country: "US",
    Date_request: "02/15/2023",
    Status: "approved",
    Verifier: "S320",
  },
  {
    ID: "S323",
    Supplier: "MediCorp",
    Country: "UK",
    Date_request: "03/21/2023",
    Status: "pending",
    Verifier: "S324",
  },
  {
    ID: "S324",
    Supplier: "BioHealth",
    Country: "DE",
    Date_request: "04/05/2023",
    Status: "rejected",
    Verifier: "S322",
  },
];


export const dummysignleSupplierTable: Supplier[] = [
  {
    ID: "S321",
    Supplier: "Bio-World",
    Country: "PT",
    Date_request: "01/12/2023",
    Status: "pending",
    Verifier: "S320",
  },

];
