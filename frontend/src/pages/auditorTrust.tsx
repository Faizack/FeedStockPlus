import React, { useState } from "react"; // Added "React," before useState
import { dummySupplierTable, dummysignleSupplierTable } from "../assets/dummy";
import Header from "../components/header";
import Logo from "../components/logo";
import SupplierTable from "../components/supplierTable";

const supplier = {
  id: "1",
  name: "Bio-World Energy",
  country: "Portugal",
  vat: "PT123456789",
  address: "Ínsua do Barata - Campo do Bolão 3025-300, Coimbra, Portugal",
  kycStatus: "Completed",
  verifierName: "Miguel Santos",
  verifierEmail: "miguel@bio-world.com",
  dateOfRequest: "01/12/2023",
  verificationType: "ISCC EU",
  certification: "REDII",
  registry: "ISCC",
  certificateId: "ISCC-PLUS-Cert-DE100-1076624",
  img: "https://content.wepik.com/statics/258344336/preview-page0.jpg",
};

const AuditorTrust = () => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };
  return (
    <div className="auditortrust">
      <aside>
        <Logo navigator={true} />
      </aside>
      <div className="head-content">
        <Header />
        <main>
          {show ? (
            <div className="single-supplier">
              <SupplierTable data={dummysignleSupplierTable} />
              <article>
                <div className="alldetailS">
                  <div className="detail">
                    <h2>{supplier.name}</h2>
                    <p>
                      Country: {supplier.country} <br />
                      VAT: {supplier.vat} <br />
                      Address: {supplier.address}
                    </p>
                    <p>KYC Status: {supplier.kycStatus}</p>
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
                    <div className="btn">
                      <button>Approve</button>
                      <button>Deline</button>
                    </div>
                  </div>
                  <div className="image">
                    <img src={supplier.img} alt="Certificate" />
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <SupplierTable data={dummySupplierTable} />
          )}
        </main>
        <button onClick={toggle}>Toogle</button>
      </div>
    </div>
  );
};

export default AuditorTrust;
