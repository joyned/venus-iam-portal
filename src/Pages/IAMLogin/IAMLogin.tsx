import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./IAMLogin.scss";

export default function IAMLogin() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  useEffect(() => {
    const clientId = searchParams.get("clientId");
    const clientSecret = searchParams.get("clientSecret");
    console.log(clientId, clientSecret);
  });

  const login = async () => { };

  return (
    <div className="iamLogin">
      <div className="container">
        <div className="title">
          <img src="/logo192.png" alt="Tenant Logo"></img>
          <h3>Sign in to your account</h3>
        </div>
        <form action="" className="loginForm">
          <span>E-mail</span>
          <InputText
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Password</span>
          <Password
            type="password"
            value={password}
            feedback={false}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Login"></Button>
          <div className="forgotPassword">
            <span>Forgot your password?</span>
          </div>
        </form>
      </div>
    </div>
  );
}
