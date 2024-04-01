import { useRecoilState } from "recoil";
import userState from "../store/userState";
import { useEffect } from "react";

const Auth = () => {
  const [user] = useRecoilState(userState);

  useEffect(() => {
    // here we will call api to verify user token if token expired will ask to login on fail else remove state
    // On success login signup we will ask to save tokan on cookie and set some user state
    if (user.id) window.location = "/";
  }, [user]);

  return <div>Auth</div>;
};

export default Auth;
