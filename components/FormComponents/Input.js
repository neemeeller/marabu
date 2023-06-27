import { ErrorMessage } from './ErrorMessage';

export const Input = ({
  disabled,
  error,
  id,
  label,
  message,
  onBlur,
  onChange,
  pattern,
  register,
  required,
  type,
  value,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium">
      {label} {required ? '*' : ''}
    </label>
    <input
      {...register(id, { required, pattern, onBlur, onChange })}
      className={`border rounded-sm px-2 py-1 mb-1 w-full leading-none ${!!error ? 'text-red-800' : ''}`}
      disabled={disabled}
      type={type}
      value={value}
    />
    {message ? <span className="block text-xs font-medium mb-2 text-gray-500">{message}</span> : ''}
    <ErrorMessage {...{ label, error }} />
  </div>
);
