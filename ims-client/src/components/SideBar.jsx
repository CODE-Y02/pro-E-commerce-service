/* eslint-disable react/prop-types */
import { FaHome } from "react-icons/fa";
import { FaCartPlus, FaShop } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const SidebarBtn = ({ text, icon, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        isActive ? "bg-green-600 border-none" : " ",
        " flex items-center gap-2 p-2 m-2 rounded-md border-2 hover:border-green-300",
      ].join(" ")
    }
  >
    {icon}
    {text}
  </NavLink>
);

const SideBar = () => {
  return (
    <div className="bg-neutral-800 flex-col gap-5 border-r-4 border-white border-opacity-50 text-white fixed bottom-0 top-0 sm:w-[20%]">
      <h1 className="text-xl p-2 mb-5 text-center font-semibold border-b-2 border-green-300">
        Dashboard
      </h1>

      <SidebarBtn
        to={"/"}
        icon={<FaHome className={`h-5 w-5 mr-2`} />}
        text={"Home"}
      />
      <SidebarBtn
        to={"/orders"}
        icon={<FaCartPlus className={`h-5 w-5 mr-2`} />}
        text={"orders"}
      />
      <SidebarBtn
        to={"/shop"}
        icon={<FaShop className={`h-5 w-5 mr-2`} />}
        text={"Shop"}
      />
    </div>
  );
};

export default SideBar;
