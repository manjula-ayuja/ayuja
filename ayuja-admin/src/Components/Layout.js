import { Outlet } from "react-router-dom";
import Header from "../Components/CommonPages/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
