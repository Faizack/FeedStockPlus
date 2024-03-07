import { useState } from "react";
import toast from "react-hot-toast";
import ButtonWrapper from "../components/buttonWrapper";
import Header from "../components/header";
import Logo from "../components/logo";
import { AuditorFormData, GetVerificationData } from "../types/user";

const certificateType: string[] = ["certi_1", "certi_2"]; // Initialize certificateType array with options

const GetVerify = () => {
  const [formData, setFormData] = useState<GetVerificationData>({
    certificateType: "",
    scheme: "",
    certificateNumber: "",
  });

  const [auditorFormData, setAuditorFormData] = useState<AuditorFormData>({
    auditorName: "",
    auditorEmail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuditorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuditorFormData({ ...auditorFormData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key as keyof GetVerificationData] === "") {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }
    console.log(formData);
    toast.success("GetVerificationData submitted successfully");
  };

  const handleAuditorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const key in auditorFormData) {
      if (auditorFormData[key as keyof AuditorFormData] === "") {
        toast.error(`Please fill in ${key}`);
        return;
      }
    }

    console.log(auditorFormData);
    toast.success("Auditor invitation sent successfully");
  };

  return (
    <div className="getVerify">
      <aside>
        <Logo />
      </aside>
      <div className="head-content">
        <Header />
        <ButtonWrapper />

        <main>
          <article className="verify-info">
            <h2>Get Verified</h2>
            <p>
              If you are a holder of a Sustainability certification such as a
              REDII certification from one of the EU-approved voluntary schemes,
              you will need to get verified by a third-party validator
              registered on our platform. Alternatively, you can use your own
              auditor who will need to register first.
            </p>
          </article>

          <div className="allform">
            <div className="cerificate_form">
              <form onSubmit={handleSubmit}>
                <h2>Your Certificate</h2>
                <label>Type</label>
                <select
                  name="certificateType"
                  value={formData.certificateType}
                  onChange={handleChange}
                >
                  <option value="">Type</option>
                  {certificateType.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <br />
                <label>Scheme/Registry name</label>
                <input
                  type="text"
                  name="scheme"
                  placeholder="eg. ISCC"
                  value={formData.scheme}
                  onChange={handleChange}
                />
                <br />
                <label>Certificate Number</label>
                <input
                  type="text"
                  name="certificateNumber"
                  placeholder="eg. ISCC"
                  value={formData.certificateNumber}
                  onChange={handleChange}
                />

                <p>
                  The verification can take up to 5 working days. You will be
                  notified via email.
                </p>

                <button type="submit">Get Verified</button>
              </form>
            </div>

            <div className="cerificate_form">
              <form onSubmit={handleAuditorSubmit}>
                <h2>Invite Auditor</h2>
                <label>Name</label>
                <input
                  type="text"
                  name="auditorName"
                  placeholder="Auditor's Name"
                  value={auditorFormData.auditorName}
                  onChange={handleAuditorChange}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="auditorEmail"
                  placeholder="Auditor's Email"
                  value={auditorFormData.auditorEmail}
                  onChange={handleAuditorChange}
                />
                <p>The auditor will have to be approved first</p>

                <button type="submit">Send Invitation</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GetVerify;
