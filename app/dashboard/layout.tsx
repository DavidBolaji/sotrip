import DashboardMenu from "@/components/dashboard-component/dashboard-menu/dashboard-menu";
import DashboardSearch from "@/components/dashboard-component/dashboard-search";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { PropsWithChildren } from "react";
import UserName from "./components/user-name";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <div className={`min-h-screen`}>
        <Sider
          trigger={null}
          style={{
            backgroundColor: "#fff",
            height: "100vh",
            maxHeight: "100vh",
            position: "sticky",
            top: 0,
            zIndex: 300,
          }}
          width={200}
          className="pt-10 px-[12px]"
        >
          <DashboardMenu collapsed={false} />
        </Sider>
      </div>
      <Layout
        style={{
          background: "#fff",
        }}
      >
        <Header
          style={{
            paddingLeft: 40,
            background: "#fff",
          }}
          id="shadow"
        >
          <div className="grid grid-cols-12 border-b">
            <div className="col-span-9 flex w-full items-center justify-between">
              <UserName />
              <DashboardSearch />
            </div>
            <div className=" col-span-3"></div>
          </div>
        </Header>

        <Content
          style={{
            padding: "0px 12px 150px 0px",
            marginTop: 20,
            minHeight: "100vh",
            height: "100vh",
            backgroundColor: "white",
          }}
          className={`overflow-auto md:mx-[24px] md:py-[24px] px-5 py-10 no-scrollbar`}
        >
          <div className="grid grid-cols-12">
            <div className="col-span-9 flex w-full items-center justify-between">
              {children}
            </div>
            <div className="col-span-3"></div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
