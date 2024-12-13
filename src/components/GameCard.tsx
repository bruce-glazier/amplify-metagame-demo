import { useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import useOnScreen from "../hooks/useOnScreen";
import "./GameCard.css"
import { useOnToggleToFalse } from "../hooks/useOnChange";

type Props = {
    game: Schema['Game']['type'];
    onItemVisibilityChange?: (exitDirection: 'left' | 'right') => void;
}

export const GameCard = (props: Props) => {
    const { game, onItemVisibilityChange } = props;
    const {ref, isOnScreen, exitDirection } = useOnScreen(0);
    
    // TODO: Consider hoisting to generic so any component can be passed into Carousel
    useOnToggleToFalse(isOnScreen, () => {
        onItemVisibilityChange?.(exitDirection);
    })

    return (
        <div className="card" aria-label="Game Card" ref={ref}>
            {isOnScreen && 
                <>
                    <div className='imageContainer'>
                        {game.artworks?.[0] && <img draggable={false} src={getLargeUri(game.artworks?.[0]?.url)} />}
                    </div>
                    <div className="name" aria-label="Game Name">
                        {game.name}
                    </div>
                    <div className="detailsSection">
                        <div className="genre">
                            {game.genres?.map(g => g?.name).join(', ')}
                        </div>
                        <div className="summaryHeader">
                            SUMMARY
                        </div>
                        <div className="summary">
                            {game.summary}
                        </div>
                    </div>
                </>
            }
        </div>)
}

const getLargeUri = (imageUri: string) => imageUri.replace(`t_thumb`, 't_1080p')
