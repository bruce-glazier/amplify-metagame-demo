import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource"
import { GameCard } from "./GameCard";
import "./GameCarousel.css"

type Props = {
    games: Schema['getGames']['returnType']
}

// TODO: Make this generic, remove <Games> from inner and require it to be passed in as generic
export const GameCarousel = (props: Props) => {
    const { games } = props;

    // We support a fixed set of rotating orders leveraging flex-box to simulate a circular
    const [orders, setOrders] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [exitDirection, setExitDirection] = useState<'left' | 'right'>('left');
    const [visibilityChanged, setVisibilityChanged] = useState(false);
    const [left, setLeft] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
  
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
            // console.log('isDraging in onMoveMouse')
            setIsMovingLeft(() => e.movementX < 0)
            setLeft((left) => left + e.movementX)
        }
    }, [isDragging])

    const onDragStart = useCallback(() => {
        setIsDragging(true);
    }, [])

    const onDragEnd = useCallback(() => {
        setIsDragging(false);
    }, [])

    useLayoutEffect(() => {
        // TODO: Determine way to get direction we are moving when this happened
        if (visibilityChanged) {
            console.log('isMovingLeft?', isMovingLeft, exitDirection)
            if (isMovingLeft && exitDirection === 'left') {
                setLeft((left) => left + 400) // TODO: Better way to get element width
                // Now rotate the order array
                rotateRight();
            } else if (!isMovingLeft && exitDirection === 'right') {
                setLeft((left) => left - 400)
                // Now rotate the order array
                rotateLeft();
            }

            setVisibilityChanged(false); // Responding to event, do not retrigger
            // Offset X

            // Done responding, reset flag
  
        }
    }, [visibilityChanged])

    // onVisible change observer
    // If visible status changes
    // [1] [2] [3] [4] [5] [6]

    return (
        <>
            <div className="carousel" onMouseDown={onDragStart} onMouseLeave={onDragEnd} onClick={onDragEnd} onMouseMove={onMoveMouse} style={{ display: 'flex', flexDirection: 'row', left: left, top: 10, position: 'absolute'}}>
                {games?.map((game, index) => game ? <div style={{ marginRight: '10px', order: orders[index]}}><GameCard game={game} key={game.slug} onItemVisibilityChange={onItemVisibilityChange} /></div> : null)}
            </div>
            <div style={{ position: 'absolute', top: 500 }}>
                <button onClick={() => {setLeft((left) => left - 50)}}>Left</button>
                <button onClick={() => {rotateRight()}}>Right</button>
            </div>

        </>
    )
}

/*
    css: translateX
    onInvisible: shiftOrder
    when element 0 exits left
    then element 1 becomes element 0
    but that puts element 1 out of screen

    so we need to 
       adjust positioning by first shifting all elements right by x1 card width
       then rotate
       could use a useLayoutEffect to acheive this seemlessly


    onPressDown: trackMouse,
    onRelease: move + initial + friction
    onScreen:
    outOfScreen:

    calculate mouse start X and endX 

    always have 20 frames that can loop
    but only populate frames that are onscreen

    S: [1] [2] [3]
    N: []

    if a frame goes out of view, move it to the front or back of the stack

                    <div style={{backgroundColor: 'blue', minWidth: 300, minHeight: 400, margin: '10px', order: orders[0], fontSize: '22px', color: 'white' }}>1</div>
                <div style={{backgroundColor: 'red', minWidth: 300, minHeight: 400, margin: '10px', order: orders[1], fontSize: '22px', color: 'white'}}>2</div>
                <div style={{backgroundColor: 'yellow', minWidth: 300, minHeight: 400, margin: '10px', order: orders[2],fontSize: '22px', color: 'white' }}>3</div>
                <div style={{backgroundColor: 'green', minWidth: 300, minHeight: 400, margin: '10px', order: orders[3], fontSize: '22px', color: 'white'}}>4</div>
                <div style={{backgroundColor: 'orange', minWidth: 300, minHeight: 400, margin: '10px', order: orders[4], fontSize: '22px', color: 'white'}}>5</div>
*/