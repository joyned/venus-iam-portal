import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import "./Login.scss";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { doInternalLogin } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    setLoading(true);
    doInternalLogin(email, password)
      .then((response: any) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/home");
      })
      .finally(() => setLoading(false));
    e.preventDefault();
  };

  return (
    <div className="loginPage">
      <div className="mainContent">
        <div className="panel">
          <form className="panelContent" onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center" }}>IAM Portal</h1>
            <span>E-mail</span>
            <InputText
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Password</span>
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              tabIndex={1}
            />
            <Button label="Login" type="submit" disabled={loading}></Button>
            <span className="forgotPasswordLink">Forgot Password?</span>
          </form>
          <div className="footerContent">
            <span>All Rights</span>
            <span>© 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
