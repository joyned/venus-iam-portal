import "./AuthSettings.scss";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import Layout from "../../Layout/Layout";
import { Button } from "primereact/button";

export default function AuthSettings() {
  return (
    <Layout>
      <div className="authSettingsPage">
        <Card title="Authentication Management">
          <div className="authSettingsDescription">
            <p>
              Welcome to the OAuth2 Configuration page. Here, you can customize
              various settings related to OAuth2 authentication and
              authorization.
            </p>
          </div>
          <div className="configItem">
            <span>Token Durability (in milliseconds) </span>
            <InputNumber></InputNumber>
          </div>

          <div className="configItem">
            <span>Generate Refresh Token? </span>
            <InputSwitch checked={false}></InputSwitch>
          </div>

          <div className="configItem">
            <span>Export Backup (JSON)</span>
            <Button label="Export" icon="pi pi-download" iconPos="right" />
          </div>
        </Card>
      </div>
    </Layout>
  );
}
