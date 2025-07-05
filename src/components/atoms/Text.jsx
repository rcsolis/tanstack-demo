export function Text({ 
  children, 
  variant = 'body', 
  weight = 'normal', 
  color = 'default', 
  className = '', 
  as = 'p',
  ...props 
}) {
  const variants = {
    h1: 'text-3xl md:text-4xl lg:text-5xl',
    h2: 'text-2xl md:text-3xl lg:text-4xl',
    h3: 'text-xl md:text-2xl lg:text-3xl',
    h4: 'text-lg md:text-xl lg:text-2xl',
    h5: 'text-base md:text-lg lg:text-xl',
    h6: 'text-sm md:text-base lg:text-lg',
    body: 'text-base',
    small: 'text-sm',
    xs: 'text-xs',
    caption: 'text-xs text-gray-500'
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const colors = {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    light: 'text-gray-500',
    white: 'text-white',
    primary: 'text-blue-600',
    danger: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600'
  };

  const textStyles = `${variants[variant]} ${weights[weight]} ${colors[color]} ${className}`;

  const Component = as;
  
  return (
    <Component className={textStyles} {...props}>
      {children}
    </Component>
  );
}