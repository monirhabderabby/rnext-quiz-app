// Packages
import React from "react";
import { useForm } from "react-hook-form";

// Local imports
import TextFields from "../shared/text-field";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (formData) => {
    if (formData.role) {
      formData.role = "admin";
    } else {
      formData.role = "user";
    }

    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
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
        label="Enter your username or email address"
        type="text"
        name="email"
        placeholder="example@gmail.com"
      />
      <div className="mb-6">
        <TextFields
          register={{
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
        />
      </div>
      <div class="mb-6 flex gap-2 items-center">
        <input
          {...register("role")}
          type="checkbox"
          id="admin"
          class="px-4 py-3 rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" class="block ">
          Login as Admin
        </label>
      </div>
      <button
        type="submit"
        class="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
