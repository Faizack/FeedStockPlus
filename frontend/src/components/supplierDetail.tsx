// SupplierDetailsModal.jsx


const SupplierDetailsModal = ({ supplier, onClose }) => {
  return (
    <div className="supplier-details-modal">
      <h2>{supplier.name}</h2>
      <p>
        Country: {supplier.country} <br />
        VAT: {supplier.vat} <br />
        Address: {supplier.address}
      </p>
      <p>
        KYC Status: {supplier.kycStatus}
      </p>
      <h3>Verification Request</h3>
      <p>
        Name: {supplier.verifierName} <br />
        Email: {supplier.verifierEmail} <br />
        Date of Request: {supplier.dateOfRequest} <br />
        Type: {supplier.verificationType} <br />
        Certification: {supplier.certification} <br />
        Registry: {supplier.registry} <br />
        Certificate ID: {supplier.certificateId}
      </p>
      <button onClick={onClose}>Close</button>
      <button onClick={() => handleApproveClick(supplier.id)}>Approve</button>
    </div>
  );
};

export default SupplierDetailsModal;
