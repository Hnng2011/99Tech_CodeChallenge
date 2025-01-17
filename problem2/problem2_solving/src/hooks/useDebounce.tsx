/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from 'react';

function useDebounce<T extends (...args: any[]) => any>(func: T, wait: number) {
    const timeout = useRef<NodeJS.Timeout | null>(null);

    return useCallback(
        (...args: Parameters<T>): void => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
                func(...args);
            }, wait);
        },
        [func, wait]
    );
}

export default useDebounce;
