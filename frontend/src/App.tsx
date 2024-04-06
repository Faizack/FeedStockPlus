import { lazy, Suspense, useEffect } from "react";
import axios from "axios";

import { Toaster } from "react-hot-toast";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import { resetUser, setUser } from "./redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InitialUserState } from "./types/types";
import { UserAccountData } from "./types/user";
import Loading from "./components/loader/loading";

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
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector(
    (state: { userReducer: InitialUserState }) => state.userReducer
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://127.0.0.1:5000/api/v1/user/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data as UserAccountData;
          dispatch(setUser({ user: data }));
        } else {
          dispatch(resetUser());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(resetUser());
      }
    };

    fetchUserData();
  }, [dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth */}
          <Route
                path="/user/oraganization"
                element={<ChooseOrganization />}
              />
          <Route>
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={!user ? true : false}
                  redirect="/"
                />
              }
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


              <Route path="/user/home" element={<Home />} />

              <Route path="/" element={<Afterlogin />} />
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
