import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Element from "./pages/Element";
import ElementValue from "./pages/ElementValue";
import Category from "./pages/Category";
import Items from "./pages/Item";
import Warehouse from "./pages/Warehouse";
import AddProduct from "./pages/AddProduct";
import ManageProduct from "./pages/ManageProduct";
import AddOrder from "./pages/AddOrder";
import ManageOrder from "./pages/ManageOrder";
import AddMember from "./pages/AddMember";
import ManageMember from "./pages/ManageMember";
import AddPermission from "./pages/AddPermission";
import ManagePermission from "./pages/ManagePermission";
import Company from "./pages/Company";
import PopModal from "./components/PopModal";
import ElementPage from "./pages/ElementPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="item" element={<Items />} />
          <Route path="modal" element={<PopModal />} />
          <Route path="category" element={<Category />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="element" element={<Element />} />
          <Route path="value/:id" element={<ElementPage />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="add-order" element={<AddOrder />} />
          <Route path="manage-order" element={<ManageOrder />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="manage-member" element={<ManageMember />} />
          <Route path="add-permission" element={<AddPermission />} />
          <Route path="manage-permission" element={<ManagePermission />} />
          <Route path="company" element={<Company />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
