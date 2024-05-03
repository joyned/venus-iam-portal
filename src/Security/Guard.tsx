import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Guard(props: { children?: any }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/?sessionExpired=true");
    }
  }, [navigate, token]);

  return <div>{props.children}</div>;
}
