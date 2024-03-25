import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import TopNav from "./topNavbar";

const Main = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  if (!token) navigate("/login");
  return (
    <section className="wrapper" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <section className="main">
        <TopNav />
        <main className="content">
          <section className="container-fluid p-0">
            <Outlet />
          </section>
        </main>
      </section>
    </section>
  );
};

export default Main;
