import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./IAMLogin.scss";
import { checkCredentials } from "../../Services/ClientService";

export default function IAMLogin() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const clientId = searchParams.get("clientId");
    const clientSecret = searchParams.get("clientSecret");
    const redirectUrl = searchParams.get("redirectTo");
    if (clientId && clientSecret && redirectUrl) {
      setLoading(true);
      checkCredentials(clientId, clientSecret, redirectUrl)
        .then(() => setLoading(false))
        .catch((error) => {
          setError(error.data.message);
        });
    } else {
      setError("Invalid parameters. Please, contact your support team for futher information.");
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <div className="iamLogin">
      <div className="container">
        <div className="title">
          <img src="/logo192.png" alt="Tenant Logo"></img>
          <h3>Sign in to your account</h3>
        </div>
        {error && (
          <div className="errorMessage">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="loginForm">
          <span>E-mail</span>
          <InputText
            disabled={loading}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Password</span>
          <Password
            disabled={loading}
            type="password"
            value={password}
            feedback={false}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" disabled={loading} label="Login"></Button>
          <div className="forgotPassword">
            <span>Forgot your password?</span>
          </div>
        </form>
      </div>
    </div>
  );
}
