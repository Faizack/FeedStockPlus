import React, { ChangeEvent, FormEvent, useState } from "react";
import Logo from "../components/logo";
import toast from "react-hot-toast";
import { SupplierData } from "../types/user";
import { cities, countries, countries_code, fetchbasic } from "../assets/dummy";

const SupplierSetup: React.FC = () => {

  const [formData, setFormData] = useState<SupplierData>({
    firstName: fetchbasic.firstName,
    lastName: fetchbasic.lastName,
    street: fetchbasic.street,
    apartment: fetchbasic.apartment,
    city: fetchbasic.city,
    country: fetchbasic.country,
    postcode: fetchbasic.postcode,
    phone: fetchbasic.phone,
    mobile: fetchbasic.mobile,
    company_name: "",
    company_country: "",
    company_number: "",
    country_code: "",
  });

  // Dummy data for cities and countries

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key as keyof SupplierData] === "") {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }

    console.log(formData);
    toast.success("Successfully Save Detail!");
  };

  return (
    <div className="acoountSetup">
      <aside>
        <Logo />
      </aside>
      <main>
        <div className="buttonWrapper">
          <button className="white-btn">Back</button>
          <div className="right-buttons">
            <button className="white-btn">Cancel</button>
            <form onSubmit={handleSubmit}>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
        <h2>Setup your Supplier Account</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-detail">
            <div className="company-detail">
              <h3>Identification</h3>

              <label>Company name</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
              />

              <label>Country</label>
              <select
                name="company_country"
                value={formData.company_country}
                onChange={handleChange}
              >
                <option value="">Select code</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <div className="vat-number">
                <label>VAT Number</label>

                <select
                  name="country_code"
                  value={formData.country_code}
                  onChange={handleChange}
                >
                  <option value="">Select Country code</option>
                  {countries_code.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="company_number"
                  placeholder="Insert VAT Number"
                  value={formData.company_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2>Verify Details</h2>

            <div className="verify-details">
              <br />
              <div className="basic-details">
                <div className="name">
                  <label>
                    First Name
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    Last Name
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="address">
                  <label>Address </label>
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                  <div className="addition-addr">
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      name="postcode"
                      placeholder="Postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="dropDrop">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value="">Select City</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>

                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="advacedDeatail">
                <label>
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Mobile
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </label>
                <br />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SupplierSetup;
