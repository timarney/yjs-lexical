import { useEffect, useState } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

import { ActiveUsers } from "./Editor/ActiveUsers";

import { GoogleUserProfile } from "./Editor/userProfile";

import { getRandomColor, ActiveUserProfile } from "./Editor/userProfile";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { ColabEditor } from "./ColabEditor";

export const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState<GoogleUserProfile | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setAccessToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (accessToken !== "") {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile({ ...res.data, color: getRandomColor() });
        })
        .catch((err) => console.log(err));
    }
  }, [accessToken]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const [activeUsers, setActiveUsers] = useState<ActiveUserProfile[]>([]);

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header>
        <div className="flex items-center">
          {profile && <ActiveUsers users={activeUsers} />}
          <div className="inline-block ml-2 mr-6">
            {!profile && (
              <button
                className="underline text-neutral-700 hover:no-underline"
                onClick={() => {
                  login();
                }}
              >
                Sign in
              </button>
            )}
            {profile && (
              <button
                className="underline text-neutral-700 hover:no-underline"
                onClick={logOut}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </Header>
      <main className="bg-gray-50">
        {profile && (
          <ColabEditor
            setActiveUsers={setActiveUsers}
            profile={{ name: profile.name, color: profile.color }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
