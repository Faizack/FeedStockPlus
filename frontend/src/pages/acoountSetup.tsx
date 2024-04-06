import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cities, countries } from "../assets/dummy";
import Logo from "../components/logo";
import { useSignupFinishMutation } from "../redux/api/userAPI";
import { setUser } from "../redux/reducer/userReducer";
import { MessageResponse, SignupCompleteResponse } from "../types/api";
import { UserAccountData } from "../types/user";

interface AccountSetupProps {
  verificationCode: string | undefined;
}

const AccountSetup: React.FC<AccountSetupProps> = ({ verificationCode }) => {
  // Dummy data for cities and countries

  const initialData: UserAccountData = {
    firstname: "",
    lastname: "",
    street: "",
    apartment: "",
    city: "",
    country: "",
    postcode: "",
    phone: "",
    mobile: "",
  };

  const [signUpFinish, { data, error, isLoading }] = useSignupFinishMutation(
    {}
  );
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [formData, setFormData] = useState<UserAccountData>(initialData);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verifytoken = verificationCode;

    const formDataWithToken = { ...formData, verifytoken };

    for (const key in formDataWithToken) {
      if (formDataWithToken[key as keyof UserAccountData] === "") {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }

    console.log(formDataWithToken);

    console.log(data, error, isLoading);

    const res = await signUpFinish(formDataWithToken);

    if ("data" in res) {
      const data = res.data as SignupCompleteResponse;
      const message = data.message || "null";

      console.log("success Completed");

      dispatch(setUser({ user: data.data?.user }));
      localStorage.setItem("token", res.data.data.token)


      setFormData(initialData);
      toast.success(message);

      navigator("/user/oraganization");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBack = () => {
    setFormData(initialData);

    navigator("/login");
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
        <h1>User Account</h1>
        <br />
        <form onSubmit={handleSubmit}>
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
        </form>
      </main>
    </div>
  );
};

export default AccountSetup;
