import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signUp"));
const Home = lazy(() => import("./pages/home"));
const Afterlogin = lazy(() => import("./pages/afterlogin"));

const AccountSetup = lazy(() => import("./pages/acoountSetup"));
const SupplierSetup = lazy(() => import("./pages/supplierSetup"));
const ChooseOrganization = lazy(() => import("./pages/chooseOrganization"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const Notification = lazy(() => import("./pages/notification"));
const GetVerify = lazy(() => import("./pages/getVerify"));
const Inventory = lazy(() => import("./pages/inventory"));

const AuditorTrust = lazy(() => import("./pages/auditorTrust"));

const ChatGpt = lazy(() => import("./pages/chatGpt"));

function App() {
  const [user, setUser] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [token]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth */}
          <Route>
            <Route path="/" element={<Home />} />
            <Route
              // element={<ProtectedRoute isAuthenticated={user ? false : true} />}
            >
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route
                path="/signup/pending/:verificationCode"
                element={<AccountSetupWithParams />}
              />
            </Route>
            <Route path="/user/supplier/detail" element={<SupplierSetup />} />

            // Afterlogin
            <Route
              element={<ProtectedRoute isAuthenticated={user ? true : false} />}
            >
              <Route
                path="/user/oraganization"
                element={<ChooseOrganization />}
              />
              <Route path="/user/home" element={<Afterlogin />} />
              <Route path="/user/chat" element={<ChatGpt />} />

              <Route path="/user/dashboard" element={<Dashboard />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/notification" element={<Notification />} />
              <Route path="/user/profile/verify" element={<GetVerify />} />
              <Route path="/user/inventory" element={<Inventory />} />
            </Route>
            <Route path="/auditor/trust" element={<AuditorTrust />} />
            <Route path="*" element={<div>Page Not Found</div>} />
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
  return <AccountSetup verificationCode={verificationCode || ""} />;
}

export default App;
