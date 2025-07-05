import { Icon } from "@iconify/react/dist/iconify.js";

export function Error({message}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-fit text-red-500 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <Icon icon="line-md:close-circle-twotone" width="24" height="24"  style={{color: '#8a0505'}} />
            <p className="text-lg">{message || 'An unexpected error occurred.'}</p>
        </div>
    );
}