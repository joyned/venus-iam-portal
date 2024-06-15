import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { checkCredentials } from "../../Services/ClientService";
import { doLogin, getLoginSettings } from "../../Services/IAMLoginService";
import "./IAMLogin.scss";

export default function IAMLogin() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tenantDefaultImage, setTenantDefaultImage] = useState<string | undefined>("");
  const [tenantName, setTenantName] = useState<string>("");
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const [secondColor, setSecondColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [redirectTo, setRedirectTo] = useState<string>("");

  useEffect(() => {
    const clientId = searchParams.get("clientId");
    const clientSecret = searchParams.get("clientSecret");
    const redirectUrl = searchParams.get("redirectTo");
    if (clientId && clientSecret && redirectUrl) {
      setRedirectTo(redirectUrl);
      setLoading(true);
      getLoginSettings(clientId)
        .then((response) => {
          setTenantDefaultImage(response.image);
          setTenantName(response.name);
          setPrimaryColor(response.primaryColor);
          setSecondColor(response.secondColor);
          setTextColor(response.textColor);
        })
        .catch((error) => {
          setError(error.data.message);
        }).finally(() => setLoading(false));

      checkCredentials(clientId, clientSecret, redirectUrl)
        .then(() => setLoading(false))
        .catch((error) => {
          setError(error.data.message);
        });
    } else {
      setError(
        "Invalid parameters. Please, contact your support team for futher information.",
      );
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    console.log(email);
    console.log(password);
    doLogin(email, password).then((response: any) => {
      console.log(response);
      window.location.href = redirectTo + "?token=" + response.token;
    }).catch((error) => {
      setLoading(false)
      setError(error.data.message);
    });
  };

  return (
    <div className="iamLogin" style={{ background: primaryColor }}>
      {loading ? (
        <div className="loadingPanel">
          <div className="loading">
            <i className="pi pi-spin pi-spinner"></i>
            <span>Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container" style={{ background: secondColor }}>
          <div className="title">
            {tenantDefaultImage ? (
              <img src={tenantDefaultImage} alt="Tenant Logo"></img>
            ) : (
              <img src="/logo192.png" alt="Tenant Logo"></img>
            )}
            <h3 style={{ color: textColor }}>
              {tenantName ? tenantName : "Sign in to your account"}
            </h3>
          </div>
          {error && (
            <div className="errorMessage">
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="loginForm">
            <span style={{ color: textColor }}>E-mail</span>
            <InputText
              disabled={loading}
              type="email"
              value={email}
              style={{ color: textColor, background: primaryColor }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span style={{ color: textColor }}>Password</span>
            <InputText
              disabled={loading}
              type="password"
              value={password}
              style={{ color: textColor, background: primaryColor }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={!!(loading || error)} label="Login" style={{ background: primaryColor, color: textColor }}></Button>
            <div className="forgotPassword">
              <span style={{ color: textColor }}>Forgot your password?</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
