import React, { useState, useContext, createContext } from "react";
import jwt_decode from 'jwt-decode';
import { useAsync } from "./useAsync";
import {
  signIn as signInRequest,
  signUp as signUpRequest,
} from "../api/auth";
import { userById } from "../api/user";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { execute: signInRequestAsync } = useAsync(signInRequest, false);
  const { execute: signUpRequestAsync } = useAsync(signUpRequest, false);
  const { execute: userByIdRequestAsync } = useAsync(userById, false);

  const handleResponse = (response) => {
    const { data: { user, errors, accessToken, refreshToken }} = response;
    if (user) {
      setUser(user);

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }

    errors && setError(errors);
  };

  const signIn = async (email, password) => {
    const response = await signInRequestAsync({email, password});

    handleResponse(response);

    return response;
  };

  const signUp = async (name, email, password) => {
    const response = await signUpRequestAsync({name, email, password});

    handleResponse(response);

    return response;
  };

  const checkAuth = async () => {
    const payload = jwt_decode(localStorage.getItem('access_token'));

    const {data: { user, errors}} = await userByIdRequestAsync(payload.id);

    setUser(user);

    if (errors) {
      signOut();

      setError(errors);
    }
  };

  const signOut = () => {
    setUser(false);

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return {
    user,
    error,
    signIn,
    signUp,
    checkAuth,
    signOut,
  };
}