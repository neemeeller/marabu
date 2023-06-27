import { forwardRef } from 'react';
import { ErrorMessage } from './ErrorMessage';

// you can use React.forwardRef to pass the ref too
export const Select = forwardRef(
  ({ disabled, error, id, label, onBlur, onChange, options, register, required, small = false }, ref) => (
    <div className="mb-4">
      <label className="block text-sm font-medium">
        {label} {required ? '*' : ''}
      </label>
      <select
        ref={ref}
        className={`border rounded-sm px-2 py-1 leading-none ${small ? 'w-auto' : 'w-full'}`}
        disabled={disabled}
        {...register(id, { required, onChange, onBlur })}
      >
        <option></option>
        {options?.map(({ name, label }) => (
          <option key={name} value={name}>
            {label}
          </option>
        ))}
      </select>
      <ErrorMessage {...{ label, error }} />
    </div>
  )
);
Select.displayName = 'Select';
