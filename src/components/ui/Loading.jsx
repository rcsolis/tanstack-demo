import { Icon } from "@iconify/react/dist/iconify.js";

export function Loading({children}) {
    return (
        <div className="flex flex-col items-center justify-center 
        min-h-fit text-white bg-gray-100 rounded-2xl shadow-md p-4">
            <Icon icon="line-md:loading-twotone-loop" width="24" height="24" style={{color: '#000000'}}/>
            <p className="mt-4 text-lg text-gray-700">{children || 'Loading...'}</p>
        </div>
    );
}