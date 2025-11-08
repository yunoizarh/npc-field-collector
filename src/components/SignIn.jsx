import React, { useActionState, useState } from "react";
import { Users, CreditCard, Lock } from "lucide-react"; // Changed Mail to CreditCard for ID representation
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signInUser } = useAuth();

  const navigate = useNavigate();
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get("email");
      const password = formData.get("password");

      const {
        success,
        data,
        error: signInError,
      } = await signInUser(email, password);

      if (signInError) {
        return new Error(signInError); //array of errors
      }

      if (success && data?.session) {
        navigate("/dashboard");
        return null;
      }
      return null;
    },
    null
  );
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transition-all duration-300 transform hover:shadow-3xl">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-indigo-600 text-white rounded-full shadow-lg mb-4">
            <Users className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sign in to your Enumerator App
          </h1>
        </div>

        <form action={submitAction} className="space-y-6">
          <div>
            <label htmlFor="employeeId" className="sr-only">
              email
            </label>{" "}
            {/* Label update */}
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />{" "}
              {/* Icon update */}
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Employee email"
                // value={employeeId} // State update
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                required
                // disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                // value={password}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                required
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            // disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
