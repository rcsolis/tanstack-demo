import { Card } from '../atoms/Card';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

export function LoadingSpinner({ 
  message = 'Loading...', 
  variant = 'default',
  size = 'medium' 
}) {
  const sizes = {
    small: { icon: 20, text: 'small' },
    medium: { icon: 24, text: 'body' },
    large: { icon: 32, text: 'h6' }
  };

  const iconSize = sizes[size].icon;
  const textVariant = sizes[size].text;

  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-2">
        <Icon 
          icon="line-md:loading-twotone-loop" 
          size={iconSize} 
          color="#6b7280" 
        />
        <Text variant={textVariant} color="muted">
          {message}
        </Text>
      </div>
    );
  }

  return (
    <Card 
      variant="flat" 
      padding="large" 
      className="flex flex-col items-center justify-center min-h-32"
    >
      <Icon 
        icon="line-md:loading-twotone-loop" 
        size={iconSize} 
        color="#6b7280" 
        className="mb-3"
      />
      <Text variant={textVariant} color="muted">
        {message}
      </Text>
    </Card>
  );
}