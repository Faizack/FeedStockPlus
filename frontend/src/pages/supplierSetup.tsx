import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { countries, countries_code } from "../assets/dummy";
import Logo from "../components/logo";
import { SupplierData } from "../types/user";
import { useCreateSupplierMutation } from "../redux/api/supplierAPI";
import { MessageResponse } from "../types/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { setSupplier } from "../redux/reducer/supplierReducer";

const SupplierSetup: React.FC = () => {
  // const { user, isLoading } = useSelector(
  //   (state: { userReducer: InitialUserState }) => state.userReducer
  // );
  // console.log("user",user);

  const initialData: SupplierData = {
    company_name: "",
    company_country: "",
    company_number: "",
    country_code: "",
  };
  const navigator = useNavigate();

  const [createSupplier] = useCreateSupplierMutation();
  const dispatch=useDispatch();

  const handleBack = () => {
    navigator("/user/oraganization"); // Navigate to the oraganization page
  };

  const [formData, setFormData] = useState<SupplierData>(initialData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key as keyof SupplierData] === "") {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }

    console.log(formData);

    // Call setUserRole mutation with selectedOrganization
    const res = await createSupplier(formData);

    console.log("response", res);

    if ("data" in res) {
      const message = (res.data as MessageResponse).message || "";
      const data=res.data.data 
      dispatch(setSupplier({ data: data}));
      toast.success(message);
      navigator("/");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
    setFormData(initialData);

  };

  return (
    <div className="acoountSetup">
      <aside>
        <Logo />
      </aside>
      <main>
        <div className="buttonWrapper">
          <button className="white-btn" onClick={handleBack}>
            Back
          </button>
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

            {/* <div className="verify-details">
              <br />
              <div className="basic-details">
                <div className="name">
                  <label>
                    First Name
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    Last Name
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
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
            </div> */}
          </div>
        </form>
      </main>
    </div>
  );
};

export default SupplierSetup;
