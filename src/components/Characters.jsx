
import React, { useState, useEffect } from "react";
import Character from "./Character";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [activeCharacterId, setActiveCharacterId] = useState(null);

  useEffect(() => {
    const query = `
      query {
        Media(id: 21355, type: ANIME) {
          characters(perPage: 50) {
            edges {
              node {
                id
                name {
                  full
                }
                image {
                  large
                }
                description
                siteUrl
              }
            }
          }
        }
      }
    `;

    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        const fetchedCharacters = data.data.Media.characters.edges.map(
          (edge) => edge.node
        );
        setCharacters(fetchedCharacters);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err);
      });
  }, []);

  return (
    <div className="postacie-list">
      {characters.map((char) => (
        <Character
          key={char.id}
          name={char.name.full}
          image={char.image.large}
          description={char.description}
          link={char.siteUrl}
          isOpen={activeCharacterId === char.id}
          onToggle={() =>
          setActiveCharacterId(activeCharacterId === char.id ? null : char.id)
          }
        />
      ))}
    </div>
  );
}

export default Characters;