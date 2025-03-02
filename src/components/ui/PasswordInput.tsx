import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

const PasswordInput = ({
  inputProps,
  labelProps,
}: PasswordInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input
        type={showPassword ? 'text' : 'password'}
        {...inputProps}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-shade-200 focus:outline-none focus:ring-0 focus:purple-shade-300 peer ${
          inputProps?.className || ''
        }`}
        placeholder=" "
        required
      />
      <label
        htmlFor="password"
        {...labelProps}
        className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-shade-200 peer-focus:dark:text-purple-shade-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
          labelProps?.className || ''
        }`}
      >
        Password
      </label>
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 focus:outline-none"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </>
  );
};

export default PasswordInput;
