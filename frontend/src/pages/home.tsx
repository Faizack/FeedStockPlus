import { Link } from "react-router-dom";




const Home = () => {
  return (
    <div className="Home">
      <aside>aside</aside>
      <main>
        <div className="routing-container">
          <Link to={"/login"}>login </Link>
          <Link to={"/signUp"}>SignUp</Link>
          <Link to={"/user/finish"} id="finish">
            FinishUP
          </Link>
          <Link to={"/user/oraganization"} id="organuz">
            ChooseOrganganization
          </Link>
          <Link to={"/user/supplier/detail"} id="Supplier">
            SupplierSetup
          </Link>
          <Link to={"/user/dashboard"} id="dashboard">
            Dashboard
          </Link>
          <Link to={"/user/profile"} id="Profile">
            Profile
          </Link>
          <Link to={"/user/profile/verify"} id="Profile">
            VerifySupplier
          </Link>

          <Link to={"/user/inventory"} id="Profile">
          inventory
          </Link>

          <Link to={"/auditor/trust"} id="Trust">
          Trust
          </Link>
          <Link to={"/user/chat"} id="Trust">
          chat
          </Link>
          

        </div>

      </main>

    </div>
  );
};

export default Home;
