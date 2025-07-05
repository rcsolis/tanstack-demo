import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

export function PaginationControls({ 
  onPrevious, 
  onNext, 
  hasPrevious = false, 
  hasNext = false,
  variant = 'default' 
}) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="small"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="p-2"
        >
          <Icon icon="line-md:arrow-left" size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="small"
          onClick={onNext}
          disabled={!hasNext}
          className="p-2"
        >
          <Icon icon="line-md:arrow-right" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <Button
        variant="primary"
        size="medium"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="flex-1 sm:flex-none"
      >
        <Icon icon="line-md:arrow-left-circle-twotone" size={20} />
        Previous
      </Button>
      
      <Button
        variant="primary"
        size="medium"
        onClick={onNext}
        disabled={!hasNext}
        className="flex-1 sm:flex-none"
      >
        Next
        <Icon icon="line-md:chevron-right-circle-twotone" size={20} />
      </Button>
    </div>
  );
}