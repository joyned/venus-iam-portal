const hasRole = (role: string) => {
  const token = localStorage.getItem("token") || "";
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  const roles = JSON.parse(jsonPayload).roles;
  return roles.includes(role);
};

export { hasRole };
