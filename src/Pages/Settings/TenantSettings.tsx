import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import Layout from "../../Layout/Layout";
import "./TenantSettings.scss";
import { useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";

export default function TenantSettings() {
  const [primaryColor, setPrimaryColor] = useState<string>("#000000");
  const [secondColor, setSecondColor] = useState<string>("#000000");
  const [textColor, setTextColor] = useState<string>("#000000");

  const onUpload = () => { };

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
          <form>
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
            
            <div className="configItem">
              <span>Name</span>
              <InputText></InputText>
            </div>

            <div className="configItem">
              <span>Primary Color</span>
              <div className="color">
                <ColorPicker format="hex"
                  value={primaryColor}
                  onChange={(e: any) => setPrimaryColor(e.value)}
                  style={{ width: '2em' }} />
                <InputText value={primaryColor}
                  onChange={(e: any) => setPrimaryColor(e.target.value)}
                  style={{ marginLeft: '10px' }}
                ></InputText>
              </div>
            </div>

            <div className="configItem">
              <span>Second Color</span>
              <div className="color">
                <ColorPicker format="hex"
                  value={secondColor}
                  onChange={(e: any) => setSecondColor(e.value)}
                  style={{ width: '2em' }} />
                <InputText value={secondColor}
                  onChange={(e: any) => setSecondColor(e.target.value)}
                  style={{ marginLeft: '10px' }}
                ></InputText>
              </div>
            </div>

            <div className="configItem">
              <span>Text Color</span>
              <div className="color">
                <ColorPicker format="hex"
                  value={textColor}
                  onChange={(e: any) => setTextColor(e.value)}
                  style={{ width: '2em' }} />
                <InputText value={textColor}
                  onChange={(e: any) => setTextColor(e.target.value)}
                  style={{ marginLeft: '10px' }}
                ></InputText>
              </div>
            </div>
            <Button label="Save" type="submit"></Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
