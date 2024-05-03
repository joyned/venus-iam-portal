import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import Layout from "../../Layout/Layout";
import "./TenantSettings.scss";

export default function TenantSettings() {
  const onUpload = () => {};

  return (
    <Layout>
      <div className="tenantSettingsPage">
        <Card title="Tenant Management">
          <div className="tenantSettingsDescription">
            <p>
              Welcome to the OAuth2 Configuration page. Here, you can customize
              various settings related to OAuth2 authentication and
              authorization.
            </p>
          </div>
          <div className="configItem">
            <span>Name</span>
            <InputText></InputText>
          </div>

          <div className="configItem">
            <span>Login Image</span>
            <FileUpload
              mode="basic"
              name="demo[]"
              accept="image/*"
              maxFileSize={1000000}
              onUpload={onUpload}
            />
          </div>
        </Card>
      </div>
    </Layout>
  );
}
