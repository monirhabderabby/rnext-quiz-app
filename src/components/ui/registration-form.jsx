// Packages
import { useMutation } from "@tanstack/react-query";
import { CircleCheck, TriangleAlert } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Local imports
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import TextFields from "../shared/text-field";

const RegistrationForm = () => {
  // Mutation to handle registration submission
  const { isPending, mutate } = useMutation({
    mutationKey: ["registration"],
    mutationFn: (body) => api.post("/auth/register", body),
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  // Form submission handler
  const handleRegistration = (formData) => {
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("root", {
        type: "random",
        message:
          "Passwords do not match. Please ensure both passwords are identical.",
      });
      return;
    } else {
      delete formData.confirmPassword;

      // Set role if 'Register as Admin' checkbox is checked
      if (formData.role) {
        formData.role = "admin";
      } else {
        delete formData.role;
      }

      // Execute registration mutation
      mutate(formData, {
        onSuccess: () => {
          reset();
          toast.success("Registration successful! Now you can log in.", {
            icon: <CircleCheck className="h-5 w-5 text-green-500" />,
            duration: 5000,
          });

          navigate("/login");
        },
        onError: (err) => {
          toast.error(err.message, {
            duration: 5000,
            icon: <TriangleAlert className="h-5 w-5 " />,
          });
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <div className="">
        <TextFields
          register={{
            ...register("full_name", {
              required: "Please enter your full name.",
            }),
          }}
          errors={errors}
          label="Full Name"
          type="text"
          name="full_name"
          placeholder="John Doe"
          isLoading={isPending}
        />
        <TextFields
          register={{
            ...register("email", {
              required: "Please enter your email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            }),
          }}
          errors={errors}
          label="Email"
          type="email"
          name="email"
          placeholder="Email address"
          isLoading={isPending}
        />
      </div>

      <div className="flex  gap-4">
        <TextFields
          register={{
            ...register("password", {
              required: "Please enter your password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Password must include uppercase, lowercase letters, and a number.",
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
        <TextFields
          register={{
            ...register("confirmPassword", {
              required: "Please enter your password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Password must include uppercase, lowercase letters, and a number.",
              },
            }),
          }}
          errors={errors}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          isLoading={isPending}
        />
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          {...register("role")}
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
          disabled={isPending}
        />
        <label for="admin" className="block ">
          Register as Admin
        </label>
      </div>

      {errors?.root?.message && (
        <p className="text-red-500 mb-4">{errors?.root?.message}</p>
      )}
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-2 "
        disabled={isPending}
      >
        {isPending ? "Creating a new account..." : "Create Account"}
      </button>
    </form>
  );
};

export default RegistrationForm;
