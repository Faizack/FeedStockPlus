import {  useNavigate } from 'react-router-dom';
const ButtonWrapper = () => {
  const navigate=useNavigate();

  const handleGoBack = () => {
    navigate("/user/dashboard")
  };
  return (
    <div className="buttonWrapper">
      <button className="white-btn"  onClick={handleGoBack}>Back</button>
      <div className="right-buttons">
        <button className="white-btn">Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
};

export default ButtonWrapper;
