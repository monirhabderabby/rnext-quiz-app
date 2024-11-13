import React from "react";
import { useForm } from "react-hook-form";
import TextFields from "../shared/text-field";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleRegistration = (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("root", {
        type: "random",
        message:
          "Passwords do not match. Please ensure both passwords are identical.",
      });
      return;
    } else {
      delete formData.confirmPassword;

      if (formData.role) {
        formData.role = "admin";
      } else {
        formData.role = "user";
      }

      // do some stuff
      console.log(formData);
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
        />
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          {...register("role")}
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
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
        className="w-full bg-primary text-white py-3 rounded-lg mb-2"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegistrationForm;
