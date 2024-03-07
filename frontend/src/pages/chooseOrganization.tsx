import ButtonWrapper from "../components/buttonWrapper";
import Logo from "../components/logo";
import OrganizationCard from "../components/oragnizationCard";

const ChooseOrganization = () => {
  return (
    <div className="chooseOrganization">
      <aside>
        <Logo />
      </aside>
      <main>
        <ButtonWrapper />
        <h1>Create Organization</h1>

        <OrganizationCard organization="Buyer" description="Are your looking to source and buy sustainable feedstocks for bioenergy? Discover plenty of verified suppliers and trusted feedstocks." />
        <OrganizationCard organization="Auditor" description="Accredited auditors play a key role to guarantee trust and transparency in the Feedstock platform."/>
        <OrganizationCard organization="Supplier" description="Do you have available sustainable biomass or bio-circular waste materials available for bioenergy? Register them and start selling." />

      </main>
    </div>
  );
};

export default ChooseOrganization;
