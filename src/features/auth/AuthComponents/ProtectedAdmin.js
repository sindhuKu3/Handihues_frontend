import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";
function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  //if login person is not logeed in previously then naviagete to login page 
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  //if login person is not admin then we will them to homepage 
  if(user && userInfo.role !== 'admin'){
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
}

export default ProtectedAdmin;
