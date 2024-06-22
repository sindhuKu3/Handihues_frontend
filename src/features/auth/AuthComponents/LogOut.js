import { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Logout=()=>{
   const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)
    useEffect(()=>{
        dispatch(signOutAsync)
    })
    // but useEffect should run after render the Logout.js file so we have to navigate to delay the action performed by useEffect otherwise it will not loginUser to be null
    return <>{!user && <Navigate to={"/login"} replace={true}></Navigate>}</>;
}
 
export default Logout;