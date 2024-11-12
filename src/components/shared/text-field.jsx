import React from "react";

const TextFields = ({ label, register, errors, name, type, placeholder }) => {
  return (
    <div class="mb-4">
      <label htmlFor={name} class="block mb-2">
        {label}
      </label>
      <input
        {...register}
        type={type}
        id={name}
        name={name}
        class="w-full px-4 py-3 rounded-lg border border-gray-300"
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TextFields;
