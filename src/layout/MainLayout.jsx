
import { Outlet } from "react-router-dom";
const MainLayout = () => {

  return (
    <div className="container">
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
