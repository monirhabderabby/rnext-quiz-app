import axios from "axios";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { api } from "../api";
import { removeCookie, setCookie } from "../lib/cookies";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const { tokens } = auth || {};
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (tokens) {
          const authToken = tokens["accessToken"];
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshTkn = tokens?.refreshToken;

            if (refreshTkn) {
              const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
                { refreshToken: refreshTkn }
              );

              const { accessToken, refreshToken } = response.data?.data;

              const newAuthInfo = {
                user: {
                  ...auth.user,
                },
                tokens: {
                  accessToken,
                  refreshToken,
                },
              };

              setAuth(newAuthInfo);
              removeCookie("user");
              setCookie("user", JSON.stringify(newAuthInfo));

              // Retry the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return axios(originalRequest);
            }
          } catch (error) {
            // Clear auth and redirect or handle logout if refresh fails
            removeCookie("user");
            setAuth(null); // Optional: consider redirecting to login page here
            redirect("/login");
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return { api };
};

export default useAxios;
