/**
 * External dependencies
 */
import { useEffect, useState, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";

/**
 * Internal dependencies
 */
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ActiveUsers } from "./Editor/ActiveUsers";
import { GoogleUserProfile } from "./Editor/userProfile";
import { getRandomColor, ActiveUserProfile } from "./Editor/userProfile";
import { ColabEditor } from "./ColabEditor";

const login_url = "https://www.googleapis.com/oauth2/v1/userinfo";

const fetchUser = async (accessToken: string) => {
  const result = await axios.get(`${login_url}?access_token=${accessToken}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  return result.data;
};

export const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState<GoogleUserProfile | null>(null);
  const colabEditorRef = useRef<{ clearAwarenessState: () => void } | null>(
    null
  );

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const { access_token, expires_in } = codeResponse;
      setAccessToken(access_token);
      Cookies.set("access_token", access_token, {
        expires: new Date(Date.now() + expires_in * 1000),
      });
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // Check if the user is already logged in
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // Fetch user profile data from Google API
  useEffect(() => {
    if (accessToken !== "") {
      fetchUser(accessToken)
        .then((data) => {
          setProfile({ ...data, color: getRandomColor() });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setProfile(null);
        });
    }
  }, [accessToken]);

  // Log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    
    if (colabEditorRef.current) {
      colabEditorRef.current.clearAwarenessState();
    }

    Cookies.remove("access_token");
    setAccessToken("");
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
            ref={colabEditorRef}
            setActiveUsers={setActiveUsers}
            profile={{
              name: profile.name,
              color: profile.color,
              id: profile.id,
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
