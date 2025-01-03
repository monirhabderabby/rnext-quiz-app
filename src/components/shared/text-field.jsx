import React from "react";

const TextFields = ({
  label,
  registerOptions,
  errors,
  name,
  type,
  placeholder,
  isLoading,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        {...registerOptions}
        type={type}
        id={name}
        name={name}
        className="w-full px-4 py-3 rounded-lg border border-gray-300"
        placeholder={placeholder}
        disabled={isLoading}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default TextFields;
