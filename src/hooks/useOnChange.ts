import { useEffect, useRef } from "react";

export const useOnToggleToFalse = (value: boolean, callback: () => void) => {
    const prevValueRef = useRef(value);

    useEffect(() => {
        if (prevValueRef.current && !value) {
            callback();
        }
        prevValueRef.current = value;
    }, [value, callback]);
};