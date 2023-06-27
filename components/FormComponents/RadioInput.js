export const RadioInput = ({ label, value, register, group, required }) => (
  <div className="flex items-center">
    <input
      id={`${value}-radio`}
      type="radio"
      value={value}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
      {...register(group, { required })}
    />
    <label htmlFor={`${value}-radio`} className="ml-2 text-sm font-medium text-gray-900">
      {label}
    </label>
  </div>
);
