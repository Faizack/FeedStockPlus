import { useState } from "react";

interface PropType {
  organization: string;
  description: string;
}

const OrganizationCard = ({ organization, description }: PropType) => {
  const [selected, setSelected] = useState<boolean>(false);

  function handleRadioChange() {
    setSelected(true);
  }

  function handleRadioUncheck() {
    setSelected(false);
  }

  return (
    <div className="Organization-card">
      <div className="details">
        <input
          type="radio"
          name="organization"
          id={`radio-${organization}`}
          onChange={handleRadioChange}
          onBlur={handleRadioUncheck} // Add onBlur event to handle deselection
        />
        <label htmlFor={`radio-${organization}`}>
          <h1>{organization}</h1>
          <p>{description}</p>
        </label>
      </div>
      <div className="btn">
        {selected && <button>Next</button>}
      </div>
    </div>
  );
};

export default OrganizationCard;
