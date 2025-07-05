export function Card({ 
  children, 
  variant = 'default', 
  padding = 'medium', 
  className = '',
  hover = false,
  ...props 
}) {
  const baseStyles = 'bg-white rounded-lg border transition-all duration-200';
  
  const variants = {
    default: 'border-gray-200 shadow-sm',
    elevated: 'border-gray-200 shadow-md',
    outlined: 'border-gray-300 shadow-none',
    flat: 'border-transparent shadow-none bg-gray-50'
  };

  const paddings = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  const hoverStyles = hover ? 'hover:shadow-md hover:border-gray-300 hover:-translate-y-1' : '';

  const cardStyles = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`;

  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
}