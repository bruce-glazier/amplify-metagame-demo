import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useGames, useReleaseDates } from "./hooks/useGames";
import { GameCarousel } from "./components/GameCarousel";
import { GameCard } from "./components/GameCard";
import "./App.css"
const client = generateClient<Schema>();

function App() {
  const { data: games } = useGames();
  // const { data: covers } = useGetGamesWithMedia();

  return (
    <main>
      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '100%'}}>
        <GameCarousel games={games} />
      </div>
      {/* <h1>{user?.signInDetails?.loginId}'s Games</h1>
      <h1>Fetched from IGDB</h1>
      <ul>
        <GameCarousel games={data} covers={covers} />
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div> */}
    </main>
  );
}

export default App;
