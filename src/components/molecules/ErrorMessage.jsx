import { Card } from '../atoms/Card';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';

export function ErrorMessage({ 
  message = 'An unexpected error occurred.', 
  title = 'Error',
  onRetry = null,
  variant = 'default' 
}) {
  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-2 text-red-500">
        <Icon 
          icon="line-md:close-circle-twotone" 
          size={20} 
          color="#dc2626" 
        />
        <Text variant="small" color="danger">
          {message}
        </Text>
      </div>
    );
  }

  return (
    <Card 
      variant="outlined" 
      padding="large" 
      className="flex flex-col items-center justify-center min-h-32 border-red-200 bg-red-50"
    >
      <Icon 
        icon="line-md:close-circle-twotone" 
        size={32} 
        color="#dc2626" 
        className="mb-3"
      />
      
      <Text variant="h5" weight="semibold" color="danger" className="mb-2">
        {title}
      </Text>
      
      <Text variant="body" color="muted" className="text-center mb-4">
        {message}
      </Text>
      
      {onRetry && (
        <Button 
          variant="secondary" 
          size="small" 
          onClick={onRetry}
          className="mt-2"
        >
          <Icon icon="line-md:rotate-270" size={16} />
          Try Again
        </Button>
      )}
    </Card>
  );
}