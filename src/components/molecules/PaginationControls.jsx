import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

export function PaginationControls({ 
  onPrevious, 
  onNext, 
  onFirst,
  onLast,
  hasPrevious = false, 
  hasNext = false,
  currentPage = 1,
  totalPages = 0,
  variant = 'default' 
}) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="small"
          onClick={onFirst}
          disabled={currentPage === 1}
          className="p-2"
        >
          <Icon icon="line-md:arrow-left-double" size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="small"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="p-2"
        >
          <Icon icon="line-md:arrow-left" size={16} />
        </Button>
        
        <Text variant="small" className="mx-2 text-gray-600">
          {currentPage} / {totalPages}
        </Text>
        
        <Button
          variant="ghost"
          size="small"
          onClick={onNext}
          disabled={!hasNext}
          className="p-2"
        >
          <Icon icon="line-md:arrow-right" size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="small"
          onClick={onLast}
          disabled={currentPage === totalPages}
          className="p-2"
        >
          <Icon icon="line-md:arrow-right-double" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="medium"
          onClick={onFirst}
          disabled={currentPage === 1}
          className="hidden sm:flex"
        >
          <Icon icon="line-md:arrow-left-double" size={20} />
          First
        </Button>
        
        <Button
          variant="primary"
          size="medium"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <Icon icon="line-md:arrow-left-circle-twotone" size={20} />
          Previous
        </Button>
      </div>
      
      <div className="flex items-center justify-center">
        <Text variant="base" weight="medium" className="text-gray-700">
          Page {currentPage} of {totalPages}
        </Text>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="medium"
          onClick={onNext}
          disabled={!hasNext}
        >
          Next
          <Icon icon="line-md:chevron-right-circle-twotone" size={20} />
        </Button>
        
        <Button
          variant="secondary"
          size="medium"
          onClick={onLast}
          disabled={currentPage === totalPages}
          className="hidden sm:flex"
        >
          Last
          <Icon icon="line-md:arrow-right-double" size={20} />
        </Button>
      </div>
    </div>
  );
}