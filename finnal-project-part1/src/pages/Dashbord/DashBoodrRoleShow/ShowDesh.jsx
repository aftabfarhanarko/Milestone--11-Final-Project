import useRole from "../../../Hook/useRole";
import Loding from "../../../Shared/Loding";
import AdminDashBord from "./AdminDashBord";
import RiderDashBord from "./RiderDashBord";
import UserDashBord from "./UserDashBord";

const Dashboard = () => {
  
  const {role,roleLoding} = useRole();

  if(roleLoding){
    return <Loding></Loding>
  }

  // console.log(role);
  
  if(role === "admin"){
    return <AdminDashBord></AdminDashBord>
  }

  if(role === "rider"){
    return <RiderDashBord></RiderDashBord>
  }

  if(role === "user"){
    return <UserDashBord></UserDashBord>
  }

};

export default Dashboard;
