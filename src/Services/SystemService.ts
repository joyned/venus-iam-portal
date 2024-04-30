import { get } from "./RequestService";

const getSystemInfo = () => {
  return get("system/info");
};

export { getSystemInfo };
