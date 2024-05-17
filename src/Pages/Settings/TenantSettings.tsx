import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ColorPicker } from "primereact/colorpicker";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import ImageUpload from "../../Components/ImageUpload/ImageUpload";
import Layout from "../../Layout/Layout";
import "./TenantSettings.scss";
import { getTenantSettings, saveTenantImage, saveTenantSettings } from "../../Services/TenantSettings";
import { Toast } from "primereact/toast";

export default function TenantSettings() {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tenantDefaultImage, setTenantDefaultImage] = useState<string | undefined>("");
  const [tenantName, setTenantName] = useState<string>(""); // [1
  const [primaryColor, setPrimaryColor] = useState<string>("#000000");
  const [secondColor, setSecondColor] = useState<string>("#000000");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [hasImageChanged, setHasImageChanged] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getTenantSettings()
      .then((response) => {
        setTenantDefaultImage(response.image);
        setTenantName(response.name);
        setPrimaryColor(response.primaryColor);
        setSecondColor(response.secondColor);
        setTextColor(response.textColor);
      }).finally(() => {
        setLoading(false);
      })
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const tenantSettings = {
      image: tenantDefaultImage,
      name: tenantName,
      primaryColor: primaryColor,
      secondColor: secondColor,
      textColor: textColor,
    }
    saveTenantSettings(tenantSettings)
      .then(() => {
        if (hasImageChanged) {
          saveTenantImage(tenantDefaultImage)
            .catch(() => {
              toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to save tenant image" });
            });
          setHasImageChanged(false);
        }
        toast.current?.show({ severity: "success", summary: "Success", detail: "Tenant settings saved" });
        setLoading(false)
      }).catch(() => {
        toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to save tenant settings" });
        setLoading(false)
      });
  }

  return (
    <Layout loading={loading}>
      <Toast ref={toast}></Toast>
      <div className="tenantSettingsPage">
        <Card title="Tenant Management">
          <div className="tenantSettingsDescription">
            <p>
              Welcome to the OAuth2 Configuration page. Here, you can customize
              various settings related to OAuth2 authentication and
              authorization.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="configItem">
              <span>Login Image</span>
              <ImageUpload value={tenantDefaultImage}
                onChange={(image: string) => { setTenantDefaultImage(image); setHasImageChanged(true) }}
              />
            </div>

            <div className="configItem">
              <span>Name</span>
              <InputText value={tenantName} onChange={(e) => setTenantName(e.target.value)}></InputText>
            </div>

            <div className="configItem">
              <span>Primary Color</span>
              <div className="color">
                <ColorPicker
                  format="hex"
                  value={primaryColor}
                  onChange={(e: any) => setPrimaryColor(`#${e.value}`)}
                  style={{ width: "2em" }}
                />
                <InputText
                  value={primaryColor}
                  onChange={(e: any) => setPrimaryColor(e.target.value)}
                  style={{ marginLeft: "10px" }}
                ></InputText>
              </div>
            </div>

            <div className="configItem">
              <span>Second Color</span>
              <div className="color">
                <ColorPicker
                  format="hex"
                  value={secondColor}
                  onChange={(e: any) => setSecondColor(`#${e.value}`)}
                  style={{ width: "2em" }}
                />
                <InputText
                  value={secondColor}
                  onChange={(e: any) => setSecondColor(e.target.value)}
                  style={{ marginLeft: "10px" }}
                ></InputText>
              </div>
            </div>

            <div className="configItem">
              <span>Text Color</span>
              <div className="color">
                <ColorPicker
                  format="hex"
                  value={textColor}
                  onChange={(e: any) => setTextColor(`#${e.value}`)}
                  style={{ width: "2em" }}
                />
                <InputText
                  value={textColor}
                  onChange={(e: any) => setTextColor(e.target.value)}
                  style={{ marginLeft: "10px" }}
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
