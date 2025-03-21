import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";

import "./index.css";
import App from "./App.tsx";

const cognitoAuthConfig = {
  authority:
    "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_RmN2p22cL",
  client_id: "2por100pcamraltimsief8o38c",
  redirect_uri: window.origin + "/",
  response_type: "code",
  scope: "aws.cognito.signin.user.admin email openid phone profile",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
