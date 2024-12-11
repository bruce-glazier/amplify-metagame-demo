import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [games, setGames] = useState<Schema['getGames']['returnType']>();

  // Implement react-query to streamline this.....
  useEffect(() => {
    if (!games) {
      const getGames = async () => {
        const result = await client.queries.getGames({
          query: "fields name,slug; limit 10;"
        });
  
        console.log(result)
    
        if (result.data) {
          setGames(() => result.data)
        }
      }

      getGames();
    }
  });
   

  
  // const [wishlist, setWishlist] = useState<Array<Schema["Wishlist"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Wishlist.observeQuery().subscribe({
  //     next: (data) => setWishlist([...data.items]),
  //   });
  // }, []);

  // function createWishlistItem() {
  //   client.models.Wishlist.create({ games: {}});
  // }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s Games</h1>
      <h1>Fetched from IGDB</h1>
      <ul>
        {games?.map((game) => (
          <li key={game?.slug}>{game?.name}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
