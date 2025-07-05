import { Icon as IconifyIcon } from "@iconify/react/dist/iconify.js";

export function Icon({ 
  icon, 
  size = 24, 
  color, 
  className = '', 
  ...props 
}) {
  const iconStyles = `inline-block ${className}`;
  
  return (
    <IconifyIcon
      icon={icon}
      width={size}
      height={size}
      className={iconStyles}
      style={{ color }}
      {...props}
    />
  );
}