import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase-client";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isOfflineAuthenticated, setIsOfflineAuthenticated] = useState(false);
  const [session, setSession] = useState(undefined);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      //handle supabase error
      if (error) {
        console.error("supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }

      //handle success
      console.log("supabase sign in success", data);
      localStorage.setItem("offlineAuth", "true");
      setSession(data.session);
      setIsOfflineAuthenticated(true);
      return { success: true, data };
    } catch (error) {
      //unexpected error
      console.error("unexpected error during  sign-in:", error.message);
      return {
        success: false,
        error: "an unexpected error occured, please try again",
      };
    }
  };

  useEffect(() => {
    const checkOfflineFlag = () => {
      const offline = localStorage.getItem("offlineAuth");

      if (offline === "true") {
        setIsOfflineAuthenticated(true);
      }
    };

    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data?.session);
        localStorage.setItem("offlineAuth", "true");
        console.log(data.session);
      } catch (error) {
        console.error("error getting session", error);
      }
    };
    checkOfflineFlag();
    getInitialSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        localStorage.setItem("offlineAuth", "true");
      } else {
        localStorage.removeItem("offlineAuth");
      }
      console.log("session change:", session);
    });

    //detects online/offline chnages
    const handleOnline = async () => {
      console.log("🌐 Back online — checking Supabase session...");
      setIsOnline(true);

      //try to resync supabse session
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        console.log("✅ Session restored:", data.session);
        setSession(data.session);
      } else if (error) {
        console.warn("⚠️ Session could not be refreshed:", error.message);
      }
    };

    const handleOffline = () => {
      console.log("📴 App is offline");
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const signOutUser = async (offline = false) => {
    try {
      if (!offline) {
        // Only try to sign out of Supabase if online
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }

      // Clear local state and session manually
      setSession(null);
      if (!offline) {
        // Only remove offline auth if user explicitly logs out
        localStorage.removeItem("offlineAuth");
      }

      console.log("sign out successful");
      return { success: true };
    } catch (error) {
      console.error("sign out error:", error.message);
      return { success: false, error: error.message };
    }
  };

  // --- Derived State ---
  const isLoggedIn = !!session || isOfflineAuthenticated;

  return (
    <AuthContext.Provider
      value={{ signInUser, isLoggedIn, session, isOnline, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
