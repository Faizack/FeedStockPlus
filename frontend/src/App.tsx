import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signUp"));
const Home = lazy(() => import("./pages/home"));
const AccountSetup = lazy(() => import("./pages/acoountSetup"));
const SupplierSetup = lazy(() => import("./pages/supplierSetup"));
const ChooseOrganization = lazy(() => import("./pages/chooseOrganization"));


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
            <Route path="/user/oraganization" element={<ChooseOrganization />} />
            <Route path="/user/supplier/detail" element={<SupplierSetup />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />

    </Router>
  );
}

export default App;
