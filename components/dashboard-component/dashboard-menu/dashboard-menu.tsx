"use client";
import React from "react";

import Image from "next/image";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

import {
  FiLock,
} from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import type { MenuProps } from "antd";
import { PiSignOutFill } from "react-icons/pi";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { FaBell, FaUserAlt  } from "react-icons/fa";

import styled from "@emotion/styled";
import { IMAGES } from "@/constants";
import { FaHome} from "react-icons/fa";
import usePath from "@/hooks/use-path";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/axois/axios";

const MenuStyled = styled(Menu)`
  && {
    background-color: white;
    border: none !important;
    font-family: font-family: "Inter", sans-serif !important;
    font-weight: 600;
    border-radius: 14px;
    .ant-menu-title-content {
      color: #000;
      font-size: 14px;
    }
    .ant-menu-item-icon {
      color: #000;
      font-size: 20px;
    }
    .ant-menu-item.ant-menu-item-selected {
      background-color: #0066F9;/
      border-radius: 14px;
    }

    /* li.ant-menu-item-selected > * {
      background-color: yellow !important;
    } */
    .ant-menu-item.ant-menu-item-selected > * {
      color: white;
      background-color: red !;

    }
    .ant-menu-item.ant-menu-item-selected > .ant-menu-item-icon {
      color: white;
    }
    .ant-menu-item.ant-menu-item-active {
      background-color: #0066F9 !important;
      border-radius: 14px;
    }
    .ant-menu-item.ant-menu-item-active > * {
      color: #fff !important;
      border-radius: 14px;
    }
    > * {
      margin-bottom: 14px;
      border-radius: 14px;
    }
  }
`;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "/dashboard", <FaHome />),
  getItem("Messages", "/dashboard/messages", <TbMessageCircle2Filled />),
  getItem("Notifications", "/dashboard/notifications", <FaBell />),
  getItem("Profile", "/dashboard/profile", <FaUserAlt />),
  getItem("Settings", "/dashboard/settings", <IoSettingsSharp />),
  getItem("Get the PRO", "/dashboard/pro", <FiLock />),
];

const DashboardMenu: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const { locationCurrent } = usePath();
  const queryClient = useQueryClient()

  const router = useRouter();

  const {mutate: logout} = useMutation({
    mutationFn: async (userId) => await Axios.post('/auth/logout', {userId}),
    onSuccess: () => {
      router.replace('/')
    },
    onError: (error) => {
      console.log((error as Error).message)
    }
  })
  return (
    <>
      <div className={`pl-3 mb-8 -mt-5 -translate-x-1 flex flex-col`}>
        {!collapsed && (
          <Image
            src={IMAGES.SotripLogo}
            // fill
            width={100}
            height={100}
            alt="Tayture"
          />
        )}
      </div>

      <MenuStyled
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[locationCurrent]}
        selectedKeys={[locationCurrent]}
        onClick={(menuInfo) => router.push(menuInfo?.key)}
        items={items.filter((item) => {
          return true;
        })}
      />
      <>
        {!collapsed && (
          <div className="absolute bottom-6  px-5 -translate-x-2 cursor-pointer"
          onClick={() => {
            const user = queryClient.getQueryData(['user']) as any
            logout(user.appId)
          }}
          >
            <div className="flex gap-4 items-center">
              <div><PiSignOutFill size={20} color="red" /></div>
              <h3 className="text-black font-semibold text-md">Sign out</h3>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default DashboardMenu;
