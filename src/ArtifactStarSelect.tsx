import React from "react";

export const ArtifactStarSelect = ({
  id,
  name,
  label,
  onChange,
  value,
}: {
  id: string;
  name?: string;
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        id={id}
        name={name || id}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">Blessed</option>
      </select>
    </>
  );
};
