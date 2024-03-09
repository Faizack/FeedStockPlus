import React, { ChangeEvent, FormEvent, useState } from "react";
import Logo from "../components/logo";
import { UserAccountData } from "../types/user";
import toast from "react-hot-toast";
import { cities, countries } from "../assets/dummy";

const AcoountSetup: React.FC = () => {
  // Dummy data for cities and countries

  const initialData: UserAccountData = {
    firstName: "",
    lastName: "",
    street: "",
    apartment: "",
    city: "",
    country: "",
    postcode: "",
    phone: "",
    mobile: "",
  };

  const [formData, setFormData] = useState<UserAccountData>(initialData);

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
      if (formData[key as keyof UserAccountData] === "") {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }

    console.log(formData);
    setFormData(initialData);
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
        <h1>User Account</h1>
        <br />
        <form onSubmit={handleSubmit}>
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
        </form>
      </main>
    </div>
  );
};

export default AcoountSetup;
