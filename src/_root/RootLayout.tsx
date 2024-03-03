import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <Topbar />
      <LeftSidebar/>

      <section className="flex flex-1">
        <Outlet/>
      </section>

      <Bottombar/>
    </div>
  );
};

export default RootLayout;
