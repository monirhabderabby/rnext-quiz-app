// Packages
import { useMutation } from "@tanstack/react-query";
import { UserCheck } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Local imports
import { api } from "../../api";
import useAuth from "../../hooks/useAuth";
import TextFields from "../shared/text-field";

// Define the LoginForm component, responsible for handling user login
const LoginForm = () => {
  // Retrieve authentication context and navigation function
  const { loginInfo, setAuth, setLoginInfo } = useAuth();
  const navigate = useNavigate();

  // Configure a mutation for the login request using react-query
  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => api.post("/auth/login", body),
  });

  // Set up the form with default values from loginInfo (if available)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      email: loginInfo?.email || "",
      password: loginInfo?.password || "",
      role: loginInfo?.role ? true : false,
    },
  });

  // Watch 'role' field to determine if the admin checkbox is selected
  const isAdminSelected = watch("role");

  // handle form submission for login
  const handleLogin = (formData) => {
    if (formData.role) {
      formData.role = "admin";
    } else {
      delete formData.role;
    }

    mutate(formData, {
      // Extracts error message from response and displays a toast notification
      onError: (err) => {
        const message = err.response?.data?.message || err.message;
        toast.error(message, {
          duration: 5000,
          icon: <TriangleAlert className="h-5 w-5 " />,
        });
      },
      onSuccess: (response) => {
        // Handle successful login by storing user data and redirecting
        setAuth(response?.data?.data);
        setLoginInfo(null);
        reset();
        navigate("/");

        // Display success toast notification
        toast.success("Login successful! Welcome back!", {
          icon: <UserCheck className="h-5 w-5 text-green-500" />,
          duration: 5000,
        });
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <TextFields
        registerOptions={{
          ...register("email", {
            required: "Please enter your email address.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          }),
        }}
        errors={errors}
        label="Enter your username or email address"
        type="text"
        name="email"
        placeholder="example@gmail.com"
        isLoading={isPending}
      />
      <div className="mb-6">
        <TextFields
          registerOptions={{
            ...register("password", {
              required: "Please enter your password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            }),
          }}
          errors={errors}
          label="Enter your Password"
          type="password"
          name="password"
          placeholder="Password"
          isLoading={isPending}
        />
      </div>
      <div className="mb-6 flex gap-2 items-center">
        <input
          {...register("role")}
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
          checked={isAdminSelected}
        />
        <label htmlFor="admin" className="block ">
          Login as Admin
        </label>
      </div>
      <button
        disabled={isPending}
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        {isPending ? "Please wait..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
