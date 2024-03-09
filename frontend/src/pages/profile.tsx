import React, { useState } from "react";
import { cities, countries, countries_code } from "../assets/dummy";
import ButtonWrapper from "../components/buttonWrapper";
import Header from "../components/header";
import Logo from "../components/logo";
import logo from "../assets/svg/trusVeri.svg";

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    apartment: "",
    postcode: "",
    city: "",
    country: "",
    phone: "",
    mobile: "",
    company_name: "",
    company_country: "",
    country_code: "",
    company_number: "",
  });

  const handleUserDetailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add functionality for handling user detail form submission
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="profilePage">
      <aside>
        <Logo />
      </aside>
      <div className="head-content">
        <Header />
        <ButtonWrapper />
        <div className="userSection">
          <h2>User Account</h2>
          <form onSubmit={handleUserDetailSubmit}>
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
        </div>
        <div className="supplierSection">
          <h2>Supplier Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-detail">
              <div className="company-detail">
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

              <h2>Billing/Contacts Address</h2>

              <div className="verify-details">
                <br />
                <div className="basic-details">
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
                  <h2>Contact </h2>
                  <br />
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
        </div>

        <article>
          <h3> FeedstockPlus Trust Verification Protocol</h3>
          <div className="vertification">
            <div className="detail">
              <p>Your currently have no verification badge. </p>
              <p>
                A Verification badge means your certification credentials (such
                as an EU RED-II certificate) will be verified by a accredited
                third party validator using our Feedstock Trust
                <b>
                  <u>decentralized verification protocol</u>
                </b>
                . This will increase trust of potential buyers in your products
                and services on the platform.
              </p>
            </div>
            <div>
              <img src={logo}  />
            </div>
          </div>

          <button>Get Verified</button>
          <button>Back</button>
        </article>
      </div>
    </div>
  );
};

export default ProfilePage;
