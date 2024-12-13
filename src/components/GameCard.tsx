import type { Schema } from "../../amplify/data/resource";
import "./GameCard.css"


type Props = {
    game: Schema['Game']['type'];
}

export const GameCard = (props: Props) => {
    const { game } = props;

    return (
        <div className="card" aria-label="Game Card">
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
        </div>)
}

const getLargeUri = (imageUri: string) => imageUri.replace(`t_thumb`, 't_1080p')
