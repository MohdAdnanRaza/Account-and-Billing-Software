import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./Layouts/AdminLayout";
import SalesmanLayout from "./Layouts/SalesmanLayout";
import Supervisor from "./pages/Supervisor";
import SupervisorLayout from "./Layouts/SupervisorLayout";
import AddBills from "./component/AddBills/AddBills";
import MainDashboard from "./component/MainDashboard/MainDashboard";
import UserManagement from "./component/UserManagement/UserManagement";
import BillAssignment from "./component/BillAssignment/BillAssignment";
import AssignedBills from "./component/AssignedBills/AssignedBills";
import ChequeCollection from "./component/ChequeCollection/ChequeCollection";
import TotalCollection from "./component/TotalCollection";

import Profile from "./component/Profile";
import Team from "./component/Team";

import SuperSetting from "./component/SuperSetting";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/salesman" element={<SalesmanLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/admin" element={<Admin />}>
            <Route index element={<MainDashboard />} />
            <Route path="/admin/addbills" element={<AddBills />}></Route>
            {/* <Route path="/admin/addnewbills" element={<AddNewBills />}></Route> */}
            <Route path="/admin/user" element={<UserManagement />}>
              <Route
                path="/admin/user/add-new-employee"
                element={<Register />}
              />
              <Route path="/admin/user/profile" element={<Profile />} />

              <Route path="/admin/user/team" element={<Team />} />
              {/* <Route
                path="/admin/user/password-reset"
                element={<PasswordReset />}
              />
              <Route path="/admin/user/services" element={<Services />} />
              <Route path="/admin/user/contact" element={<Contact />} /> */}
            </Route>
            <Route
              path="/admin/billassign"
              element={<BillAssignment />}
            ></Route>
            <Route
              path="/admin/assignbills"
              element={<AssignedBills />}
            ></Route>
            <Route path="/admin/cheque" element={<ChequeCollection />}></Route>
            {/* <Route path="/" element={<Login />}></Route> */}
          </Route>
          <Route path="/supervisor" element={<Supervisor />}>
            <Route index element={<MainDashboard />} />
            <Route
              path="/supervisor/superaddbills"
              element={<AddBills />}
            ></Route>
            {/* <Route path="/admin/addnewbills" element={<AddNewBills />}></Route> */}
            <Route path="/supervisor/superuser" element={<SuperSetting />}>
              <Route
                path="/supervisor/superuser/super-add-new-employee"
                element={<Register />}
              />
              <Route
                path="/supervisor/superuser/super-profile"
                element={<Profile />}
              />

              <Route
                path="/supervisor/superuser/super-team"
                element={<Team />}
              />
              {/* <Route
                path="/admin/user/password-reset"
                element={<PasswordReset />}
              />
              <Route path="/admin/user/services" element={<Services />} />
              <Route path="/admin/user/contact" element={<Contact />} /> */}
            </Route>
            <Route
              path="/supervisor/superbillassign"
              element={<BillAssignment />}
            ></Route>
            <Route
              path="/supervisor/superassignbills"
              element={<AssignedBills />}
            ></Route>
            <Route
              path="/supervisor/supercheque"
              element={<TotalCollection />}
            ></Route>{" "}
          </Route>
          {/* <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route> */}
          <Route>
            {/* Set Login component to be the home page */}
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
