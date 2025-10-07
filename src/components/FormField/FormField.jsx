import React from "react";

export default function FormField({
  name,
  type,
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  maxLength,
}) {
  return (
    <div className="flex flex-col">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        className={`w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
          error && touched ? "border-red-500" : ""
        }`}
      />
      {error && touched && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
}
