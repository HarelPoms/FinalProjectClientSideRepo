import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
const getUserData = async (id) => {
  let {data} = await axios.get("/users/" + id);
  return {userData: data};
}

const getPharmaData = async (id) => {
  let {data} = await axios.get("/pharmas/" + id);
  return {userData: data};
}

const useLoggedIn = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      let userData;
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const payload = jwt_decode(token);
      if(payload.isPharma){
        ({userData} = await getPharmaData(payload._id));
      }
      else{
        ({userData} = await getUserData(payload._id));
      }
      if (!userData) {
        localStorage.clear();
        throw "invalid token";
      }
      
      dispatch(authActions.login(payload));
    } catch (err) {
      //server error
      //invalid token
    }
  };
};

export default useLoggedIn;
