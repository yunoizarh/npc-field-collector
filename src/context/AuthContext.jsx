import { createContext, useContext } from "react";
import supabase from "../supabase-client";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
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

  return (
    <AuthContext.Provider value={{ signInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
