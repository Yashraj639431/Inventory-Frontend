import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard, AiOutlineFileAdd } from "react-icons/ai";
import { BiUserCheck, BiDollar, BiLogOutCircle } from "react-icons/bi";
import {
  MdManageSearch,
  MdOutlineAddModerator,
  MdOutlineHouse,
} from "react-icons/md";
import {
  TbSitemap,
  TbCategory,
  TbBuildingWarehouse,
  TbBrandProducthunt,
} from "react-icons/tb";
import { SiElementary } from "react-icons/si";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  return (
    <Layout>
      <Sider
        trigger={null}
        className="ant-layout-slider-btn"
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="lg-logo">Inventory</span>
            <span className="sm-logo fs-2">In</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "item",
              icon: <TbSitemap className="fs-4" />,
              label: "Items",
            },
            {
              key: "category",
              icon: <TbCategory className="fs-4" />,
              label: "Category",
            },
            {
              key: "warehouse",
              icon: <TbBuildingWarehouse className="fs-4" />,
              label: "Warehouse",
            },
            {
              key: "element",
              icon: <SiElementary className="fs-4" />,
              label: "Elements",
            },
            {
              key: "products",
              icon: <TbBrandProducthunt className="fs-4" />,
              label: "Products",
              children: [
                {
                  key: "add-product",
                  icon: <AiOutlineFileAdd className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "manage-product",
                  icon: <MdManageSearch className="fs-4" />,
                  label: "Manage Products",
                },
              ],
            },
            {
              key: "orders",
              icon: <BiDollar className="fs-4" />,
              label: "Orders",
              children: [
                {
                  key: "add-order",
                  icon: <AiOutlineFileAdd className="fs-4" />,
                  label: "Add Order",
                },
                {
                  key: "manage-order",
                  icon: <MdManageSearch className="fs-4" />,
                  label: "Manage Orders",
                },
              ],
            },
            {
              key: "members",
              icon: <BiUserCheck className="fs-4" />,
              label: "Memebers",
              children: [
                {
                  key: "add-member",
                  icon: <AiOutlineFileAdd className="fs-4" />,
                  label: "Add Memeber",
                },
                {
                  key: "manage-member",
                  icon: <MdManageSearch className="fs-4" />,
                  label: "Manage Memebers",
                },
              ],
            },
            {
              key: "permission",
              icon: <MdOutlineAddModerator className="fs-4" />,
              label: "Permission",
              children: [
                {
                  key: "add-permission",
                  icon: <AiOutlineFileAdd className="fs-4" />,
                  label: "Add Permission",
                },
                {
                  key: "manage-permission",
                  icon: <MdManageSearch className="fs-4" />,
                  label: "Manage Permission",
                },
              ],
            },
            {
              key: "company",
              icon: <MdOutlineHouse className="fs-4" />,
              label: "Company",
            },
            {
              key: "/",
              icon: <BiLogOutCircle className="fs-4" />,
              label: "Profile",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            padding: "24px",
            minHeight: 280,
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
