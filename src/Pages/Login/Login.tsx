import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doInternalLogin } from "../../Services/LoginService";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const sessionExpired = searchParams.get("sessionExpired");
    if (sessionExpired) {
      setErrorMessage("Your session has expired. Please, login again.");
    }
  }, [searchParams])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    doInternalLogin(email, password)
      .then((response: any) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/home");
      })
      .catch((error: any) => {
        if (error.status === 401) {
          setErrorMessage(error.data.message);
        } else {
          setErrorMessage(`An internal error occurred. Please, contact support.`);
        }
        setLoading(false)
      })
  };

  return (
    <div className="loginPage">
      <div className="mainContent">
        <div className="panel">
          <form className="panelContent" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="errorMessage">
                <span>{errorMessage}</span>
              </div>
            )}
            <h1 style={{ textAlign: "center" }}>IAM Portal</h1>
            <span>E-mail</span>
            <InputText
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={1}
            />
            <span>Password</span>
            <Password
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              tabIndex={2}
            />
            <Button type="submit" label="Login" disabled={loading} tabIndex={3}></Button>
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
