import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  text: string;
  to?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, to, className = '', ...props }) => {
  const commonClasses =
    'border px-8 py-4 rounded-md text-lg hover:bg-[#56B280] transition duration-300';

  // Define the button content conditionally
  const buttonContent = to ? (
    <Link to={to} className={`${commonClasses} ${className}`} {...props}>
      {text}
    </Link>
  ) : (
    <button className={`${commonClasses} ${className}`} {...props}>
      {text}
    </button>
  );

  return buttonContent;
};

export default Button;
