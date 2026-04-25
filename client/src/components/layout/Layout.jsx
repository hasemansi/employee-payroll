import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../styles/layout.css";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="main">
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;