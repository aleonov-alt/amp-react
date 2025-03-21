import { CSSProperties, useEffect } from "react";
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "2por100pcamraltimsief8o38c";
    const logoutUri = encodeURIComponent(window.origin + "/?logout=true");
    const cognitoDomain = "https://oidc.auth.eu-north-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  };

  const code = new URLSearchParams(window.location.search).get("code");
  useEffect(() => {
    if (code && auth.isAuthenticated) {
      const s = new URLSearchParams(window.location.search);
      s.delete("code");
      s.delete("state");
      window.history.replaceState({}, "", `${window.location.pathname}?${s}`);
    }
  }, [code, auth.isAuthenticated]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    const w: CSSProperties = {
      width: "30em",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };

    return (
      <div>
        <div> Hello: {auth.user?.profile.email} </div>
        <div style={w}> ID Token: {auth.user?.id_token} </div>
        <div style={w}> Access Token: {auth.user?.access_token} </div>
        <div style={w}> Refresh Token: {auth.user?.refresh_token} </div>

        <button onClick={() => signOutRedirect()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;
