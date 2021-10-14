import { useState, useCallback, useEffect } from 'react';

function useHover() {
    const [hovered, setHovered] = useState(false);

    const ref = useCallback((node) => {
        if (node) {
            node.addEventListener('mouseenter', enter);
            node.addEventListener('mouseleave', leave);
        }
    }, []);

    useEffect(() => {
        return () => {
            window.removeEventListener('mouseenter', enter);
            window.removeEventListener('mouseleave', leave);
        }
    }, [])

    const enter = () => {
        setHovered(true);
    }

    const leave = () => {
        setHovered(false);
    }

    return [hovered, ref];
}

export default useHover;