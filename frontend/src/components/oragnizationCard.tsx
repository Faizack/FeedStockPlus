interface PropType {
  organization: string;
  description: string;
  selectedOrganization: string; 
  setSelectedOrganization: (organization: string) => void; 
}

const OrganizationCard = ({
  organization,
  description,
  selectedOrganization,
  setSelectedOrganization,
}: PropType) => {
  const handleRadioChange = () => {
    setSelectedOrganization(organization); // Set selected organization
  };

  return (
    <div className="Organization-card">
      <div className="details">
        <input
          type="radio"
          name="organization"
          id={`radio-${organization}`}
          onChange={handleRadioChange}
          checked={selectedOrganization === organization} 
        />
        <label htmlFor={`radio-${organization}`}>
          <h1>{organization}</h1>
          <p>{description}</p>
        </label>
      </div>
    </div>
  );
};

export default OrganizationCard;
