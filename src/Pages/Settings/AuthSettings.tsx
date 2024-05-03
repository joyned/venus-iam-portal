import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import Layout from "../../Layout/Layout";
import AuthSettingsModel from "../../Models/AuthSettingsModel";
import {
  getAuthSettings,
  saveAuthSettings,
} from "../../Services/AuthSettingsService";
import "./AuthSettings.scss";

export default function AuthSettings() {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenDurability, setTokenDurability] = useState<number>(0);
  const [generateRefreshToken, setGenerateRefreshToken] =
    useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAuthSettings()
      .then((response: AuthSettingsModel) => {
        setTokenDurability(response.tokenDurability || 0);
        setGenerateRefreshToken(
          response.generateRefreshToken === undefined
            ? true
            : response.generateRefreshToken,
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const handlerFormSubmit = (e: any) => {
    setLoading(true);
    saveAuthSettings({
      generateRefreshToken: generateRefreshToken,
      tokenDurability: tokenDurability,
    })
      .then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Saved",
          detail: `Saved settings successfully`,
          life: 3000,
        });
      })
      .catch(() => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: `An error occured while saving. Please, try again later or contact support.`,
          life: 3000,
        });
      })
      .finally(() => setLoading(false));
    e.preventDefault();
  };

  return (
    <Layout loading={loading}>
      <div className="authSettingsPage">
        <Toast ref={toast} />
        <Card title="Authentication Management">
          <div className="authSettingsDescription">
            <p>
              Welcome to the OAuth2 Configuration page. Here, you can customize
              various settings related to OAuth2 authentication and
              authorization.
            </p>
          </div>
          <form onSubmit={handlerFormSubmit}>
            <div className="configItem">
              <span>Token Durability (in milliseconds) </span>
              <InputNumber
                value={tokenDurability}
                onValueChange={(e: any) => setTokenDurability(e.value)}
              ></InputNumber>
            </div>

            <div className="configItem">
              <span>Generate Refresh Token? </span>
              <InputSwitch
                checked={generateRefreshToken}
                onChange={(e: any) => setGenerateRefreshToken(e.value)}
              ></InputSwitch>
            </div>
            <Button type="submit" label="Save" icon="pi pi-check" />
          </form>
        </Card>
      </div>
    </Layout>
  );
}
