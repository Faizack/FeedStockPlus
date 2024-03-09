import React from 'react';

interface VerificationSuccessModalProps {
  onClose: () => void;
  onDashboardClick?: () => void;
}

const VerificationSuccessModal: React.FC<VerificationSuccessModalProps> = ({
  onClose,
  onDashboardClick,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Thank you</h2>
        <p>
          The request has been sent to our network of approved validators on
          the Feedstock Trust decentralized verification protocol.
        </p>
        <p>
          The verification can take up to 5 working days. You will be
          notified.
        </p>
        <button onClick={onClose}>OK</button>
        <button onClick={onDashboardClick}>Take me to dashboard</button>
      </div>
    </div>
  );
};

export default VerificationSuccessModal;
