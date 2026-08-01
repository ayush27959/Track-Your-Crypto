import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Guard from "./Guard";

// Fixed: Removed non-existent 'shared' path prefix
const Loader = lazy(() => import("./components/Loader"));

const Homepage = lazy(() => import("./components/Home"));
const Homelayout = lazy(() => import("./layout/Homelayout"));
const Login = lazy(() => import("./components/Home/login"));
const Signup = lazy(() => import("./components/Home/Signup"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const UserLayout = lazy(() => import("./components/user/UserLayout"));
const ForgotPassword = lazy(() => import("./components/forgotPassword"));

// Fixed: Corrected component paths based on VS Code sidebar
const Dashboard = lazy(() => import("./components/Dashboard"));
const Reports = lazy(() => import("./components/Reports"));
const Transaction = lazy(() => import("./components/Transaction"));
const AdminLayout = lazy(() => import("./components/Admin/AdminLayout"));
const Users = lazy(() => import("./components/Users"));
const Account = lazy(() => import("./components/Account"));

// Fixed: Removed 'shared' folder from CryptoNews path
const CryptoNews = lazy(() => import("./components/CryptoNews/CryptoNews"));

const Homepagestyle = lazy(() => import("./components/Home/Homepagestyle"));
const Learnmore = lazy(() => import("./learnmore/more"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Homepagestyle />} />
          <Route path="/home" element={<Homepage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/learnmore" element={<Learnmore />} />
          <Route path="/Learnmore" element={<Learnmore />} />

          {/* Admin Routes */}
          <Route
            path="/app/admin"
            element={
              <Guard endpoint="/api/user/session" role="admin">
                <AdminLayout />
              </Guard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="account" element={<Account />} />
            <Route path="LiveMarket" element={<CryptoNews />} />
          </Route>

          {/* User Routes */}
          <Route
            path="/app/user"
            element={
              <Guard endpoint="/api/user/session" role="user">
                <UserLayout />
              </Guard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="markets" element={<CryptoNews />} />
            <Route path="reports" element={<Reports />} />
            <Route path="transactions" element={<Transaction />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;