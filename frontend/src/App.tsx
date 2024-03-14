import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signUp"));
const Home = lazy(() => import("./pages/home"));
const Afterlogin = lazy(() => import("./pages/afterlogin"));

const AccountSetup = lazy(() => import("./pages/acoountSetup"));
const SupplierSetup = lazy(() => import("./pages/supplierSetup"));
const ChooseOrganization = lazy(() => import("./pages/chooseOrganization"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const GetVerify = lazy(() => import("./pages/getVerify"));
const Inventory = lazy(() => import("./pages/inventory"));

const AuditorTrust = lazy(() => import("./pages/auditorTrust"));

const ChatGpt = lazy(() => import("./pages/chatGpt"));

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
            <Route
              path="/signup/pending/:verificationCode"
              element={<AccountSetupWithParams />}
            />

            <Route
              path="/user/oraganization"
              element={<ChooseOrganization />}
            />
            <Route path="/user/home" element={<Afterlogin />} />
            <Route path="/user/chat" element={<ChatGpt />} />

            <Route path="/user/supplier/detail" element={<SupplierSetup />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/profile/verify" element={<GetVerify />} />
            <Route path="/user/inventory" element={<Inventory />} />

            <Route path="/auditor/trust" element={<AuditorTrust />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

// Component to capture verification code parameter

function AccountSetupWithParams() {
  const { verificationCode } = useParams();

  // Render AccountSetup component with verificationCode
  return <AccountSetup verificationCode={verificationCode|| ""} />;
}

export default App;
