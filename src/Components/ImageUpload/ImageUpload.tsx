import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import "./ImageUpload.scss";

export default function ImageUpload(props: {
  value: string | undefined;
  onChange?: any;
  label?: string;
}) {
  const toast = useRef<Toast>(null);
  const [imageBase64, setImageBase64] = useState<string>();
  const [buttonName, setButtonName] = useState("Upload");

  useEffect(() => {
    setImageBase64(props.value);
  }, [imageBase64, props]);

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (event: any) => {
    if (event.target.files[0]) {
      setButtonName(event.target.files[0].name);
      const file = event.target.files[0];
      const base64 = await convertBase64(file);
      props.onChange(base64);
      toast.current?.show({
        severity: "success",
        summary: "File selected successfully.",
        detail: `${file.name} was selected successfully. Do not forget to save the changes.`,
        life: 10000,
      });
    }
  };

  return (
    <div className="fileUpload">
      <Toast ref={toast} />
      {imageBase64 && (
        <div className="imagePreview">
          <img src={imageBase64} alt="Preview" />
        </div>
      )}
      <label htmlFor="file-upload">
        <i className="pi pi-upload"></i>
        {buttonName}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name="filename"
        onChange={handleChange}
      ></input>
    </div>
  );
}
