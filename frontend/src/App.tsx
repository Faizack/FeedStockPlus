import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signUp"));
const Home = lazy(() => import("./pages/home"));

const AccountSetup = lazy(() => import("./pages/acoountSetup"));
const SupplierSetup = lazy(() => import("./pages/supplierSetup"));
const ChooseOrganization = lazy(() => import("./pages/chooseOrganization"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const GetVerify = lazy(() => import("./pages/getVerify"));
const Inventory=lazy(() => import("./pages/inventory"));

const AuditorTrust = lazy(() => import("./pages/auditorTrust"));

const ChatGpt =  lazy(() => import("./pages/chatGpt"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth */}
          <Route
          // element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/user/finish" element={<AccountSetup />} />

            <Route
              path="/user/oraganization"
              element={<ChooseOrganization />}
            />
            <Route path="/user/supplier/detail" element={<SupplierSetup />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/profile/verify" element={<GetVerify />} />
            <Route path="/user/inventory" element={<Inventory />} />
            <Route path="/user/chat" element={<ChatGpt />} />

            
            
            <Route path="/auditor/trust" element={<AuditorTrust />} />


            

          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
