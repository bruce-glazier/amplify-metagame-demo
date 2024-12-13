import {  useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CarouselContent } from "./CarouselContent";
import "./Carousel.css"

type Props = {
    listItems: (JSX.Element)[]
}

// TODO: Can this be navigated by keyboard controls? Need to test and improve
export const Carousel = (props: Props) => {
    const { listItems } = props;

    // We support a fixed set of rotating orders leveraging flex-box to simulate a circular
    const [orders, setOrders] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // TODO: Determine based on number of elements in array
    const [exitDirection, setExitDirection] = useState<'left' | 'right'>('left');
    const [visibilityChanged, setVisibilityChanged] = useState(false);
    const [left, setLeft] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const velocityRef = useRef(0);
    const totalXRef = useRef(0);

    const rotateLeft = () => {
        setOrders((orders) => [...orders.slice(1), orders[0]]);
    }

    const rotateRight = () => {
        setOrders((orders) => [orders[orders.length - 1], ...orders.slice(0, -1)]);
    }

    const onItemVisibilityChange = (exitDirection: 'left' | 'right') => {
        // Do not set if already responding
        if (!visibilityChanged) {
            // Set flag so useLayoutEffect can respond
            setExitDirection(exitDirection);
            setVisibilityChanged(true);
        }
    }

    const onMoveMouse = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        if (isDragging) {
            setIsMovingLeft(() => e.movementX < 0)
            setLeft((left) => left + e.movementX)
        }

        // Track velocity for simulating flick
        totalXRef.current += e.movementX;
    }, [isDragging])

    useEffect(() => {
        const intervalId = setInterval(() => {
          velocityRef.current = totalXRef.current;
          totalXRef.current = 0;
        }, 50);
      
        return () => clearInterval(intervalId); // Cleanup
      }, []); // Only setup the interval once
    
    const onDragStart = useCallback(() => {
        setIsDragging(true);
    }, [])

    const onDragEnd = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        if (isDragging) {
            let velocity = velocityRef.current;
            if (velocity != 0) {
                const intervalId = setInterval(() => {
                    if (velocity < 0) {
                        setLeft((x) => x + velocity / 10)
                        velocity += 10; // TODO: this should taper off for a more realistic slow down
    
                        if (velocity > 0) {
                            clearInterval(intervalId);
                        }
                    } else if (velocity > 0) {
                        setLeft((x) => x + velocity / 10)
                        velocity -= 10; // TODO: this should taper off for a more realistic slow down
                        
                        if (velocity < 0) {
                            clearInterval(intervalId);
                        }
                    }
                }, 10)
            }
     
            velocityRef.current = 0;
        }

        setIsDragging(false);
    }, [isDragging])

    useLayoutEffect(() => {
        if (visibilityChanged) {
            if (isMovingLeft && exitDirection === 'left') {
                setLeft((left) => left + 410) // TODO: Better way to get element width
                // Now rotate the order array
                rotateRight();
            } else if (!isMovingLeft && exitDirection === 'right') {
                setLeft((left) => left - 410)
                // Now rotate the order array
                rotateLeft();
            }

            setVisibilityChanged(false); // Responding to event, do not retrigger
        }
    }, [visibilityChanged])


    return (
        <div className="carousel" onMouseDown={onDragStart} onClick={onDragEnd} onMouseLeave={onDragEnd} onMouseMove={onMoveMouse} style={{ display: 'flex', flexDirection: 'row', left: left, top: 10, position: 'absolute'}}>
            {listItems?.map((item, index) => item ? <CarouselContent onItemVisibilityChange={onItemVisibilityChange} order={orders[index]}>{item}</CarouselContent> : null)}
        </div>
    )
}