import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import OrganizationCard from "../components/oragnizationCard"; // Correct import statement for OrganizationCard
import { useSetUserRoleMutation } from "../redux/api/userAPI";
import { MessageResponse } from "../types/api";

const ChooseOrganization = () => {
  const navigator = useNavigate(); // Initialize useHistory hook
  const [selectedOrganization, setSelectedOrganization] = useState(""); 

  const [setUserRole, { isLoading, isSuccess }] = useSetUserRoleMutation();

  const handleBack = () => {
    navigator("/login"); // Navigate to the login page
  };

  const handleSave = async () => {
    console.log(isLoading, isSuccess);

    const data={role:selectedOrganization}

    // Call setUserRole mutation with selectedOrganization
    const res = await setUserRole(data);

    console.log("response", res);

    if ("data" in res) {
      const message = (res.data as MessageResponse).message || "";
      toast.success(message);
      navigator('/user/supplier/detail')
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  return (
    <div className="chooseOrganization">
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
            <button onClick={handleSave}>Save</button>{" "}
            {/* Call handleSave on Save button click */}
          </div>
        </div>
        <h1>Create Organization</h1>

        {/* Pass selectedOrganization and setSelectedOrganization as props */}
        <OrganizationCard
          organization="Buyer"
          description="Are your looking to source and buy sustainable feedstocks for bioenergy? Discover plenty of verified suppliers and trusted feedstocks."
          selectedOrganization={selectedOrganization}
          setSelectedOrganization={setSelectedOrganization}
        />
        <OrganizationCard
          organization="Auditor"
          description="Accredited auditors play a key role to guarantee trust and transparency in the Feedstock platform."
          selectedOrganization={selectedOrganization}
          setSelectedOrganization={setSelectedOrganization}
        />
        <OrganizationCard
          organization="Supplier"
          description="Do you have available sustainable biomass or bio-circular waste materials available for bioenergy? Register them and start selling."
          selectedOrganization={selectedOrganization}
          setSelectedOrganization={setSelectedOrganization}
        />
      </main>
    </div>
  );
};

export default ChooseOrganization;
