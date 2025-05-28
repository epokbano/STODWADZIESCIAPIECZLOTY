import React, { useState, useEffect } from "react";
const questionSets = {
    Wilhelm: [
        {
            question:"co sądzisz o szermierce?",
            options: ["jest spoko...", "nie rozmiar a technika czyni z ciebie zawodnika", "nie lubie ):"],
            correct: 1,
        },
        {
            question:"boze moja zona jest taaaaaaka hot",
            options: ["tak.", "tak.", "tak ale bardziej."],
            correct: [0,2],
        }

    ],
    Aldebaran: [
        {
            question:"co sadzisz o dominant women?",
            options: ["boze TAK.",  "boze blondynki z czerwonymi oczami🙏", "ja jestem dominant 😤" ],
            correct: [0,1],
        },
        {
            question:"meski oszuscik",
            options: ["spierdalaj"],
            correct: 0,
        }

    ],
    Anastasia: [
        {
            question:"co sadzisz o kryzysach klimatycznych, nierówności społecznej, konfliktach zbrojnych, kryzysie żywnościowym oraz o skutkach pandemii?",
            options: [ "lubie w dupe", "nwm siostra hajs szmato hajs dawaj ", "nie lubie"],
            correct: [0,1],
        },
        {
            question:"nudno mi...",
            options: ["hej mała. (koniec wypowiedzi)", "to cos zjedz", "pieniadze :D"],
            correct: 2,
        }

    ],
    Petelgeuse: [
        {
            question:"jA pIeRdOle... nAWet piErWiasTek wIEDźmy mi ZaJebal SmiEc.",
            options: ["ty sie kurwa dobrze czujesz?", "mi tez stary, mi tez...", "wypierdalaj."],
            correct: 2,
        },
        {
            question:"CzEgO cHCeSZ?",
            options: ["ciebie seksiaku mwah~~", "twojego veiny diha gyaciku~~", "wypierdalaj."],
            correct: 2,
        }

    ],
    Reinhard: [
        {
            question:"moge byc lekko op.",
            options: ["goku solos", "gugu solo", "rudy cwel"],
            correct: 1,
        },
        {
            question:"moge obnazyc miecz z pochwy jedynie na wartych zachodu przeciwnikow...",
            options: ["ty kurwa niezly spoosb na opisanie stulejki", "ty to niezle", "to wyjmuj no nwm"   ],
            correct: 0,
        }

    ],
    Ram: [
        {
            question:"czemu w lozku lezy baba identyczna do mnie...",
            options: ["wracaj do komputera lol", "wlasnie nie wiem kto to", "Rem...?"],
            correct: 1,
        },
        {
            question:"czego tu jeszcze szukasz barusie",
            options: ["czy ja mam ci kurwa wyjebac z gonga", "zgubilem sie...", "szukam siebie w twoich oczach~"],
            correct: 0,
        }

    ],
    Felt: [
        {
            question:"jestem pelnoletnia!!",
            options: ["i wear mask with a smile for hours at a time", "babeczka edp445", "doctor disrespect"],
            correct: [0,2],
        },
        {
            question:"boze kocham krasc jak czarni",
            options: ["ale ty nawet czarna nie jestes", "kobieto opanuj sie co ty mowisz", "dobra wroc do mnie jak bedziesz w stanie przekonac wlasnego bodyguarda do posluszenstwa"],
            correct: 2,
        }

    ],
    Subaru: [
        {
            question:"ej wsm zajebista ta herbata...",
            options: ["NIEEEEEE NIE PIJ TEGO-", "POOOOCZEEEEKAAAAJ", "pij."],
            correct: 2,
        },
        {
            question:"pozytywny ziomeczek",
            options: ["no zobaczymy czy taki pozytywny po 18 odcinku PIERWSZEGO SEZONU",  "return by death.", ":D"],
            correct: [0,1],
        }

    ],
  Rem: [
    {
      question: "kurwa cwelu nawet kroic nie umiesz",
      options: ["wracaj do spiaczki honk mimimimi", "no a wiesz kto nie ma screentime prez prawie reszte anime?", "no ta a wiesz komu podoba sie ktos inny?" ],
      correct: 0,
    },
    {
      question: "ty co jest ja nie spie",
      options: ["dobra still wracaj do lozka mamy wiele do roboty 😈🙏", "TY FAKTYCZNIE KURWA REM JAK JA TESKNILEM", "kim jestes?"] ,
      correct: [0,2],
    },
  ],
  Emilia: [
    {
      question: "ale jestem glupia szmata",
      options: ["dobra ale przynajmniej ladna tak", "no i dobrze ci tak", "ha a jak tam twoj pack szmato"],
      correct: 0,
    },
    {
            question:"pack wez wstan wreszcie....",
            options: ["vadiiiiim muciabuci VADIIIIIIIIIIIM HAAALOOOOO",  "kwadratowa płyta tynkowa", "nie martw sie zawsze masz mnie :D"],
            correct: [0,1],
        }
  ],
};
function DatingSim() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lastScore, setLastScore] = useState(null);
  const [completedCharacters, setCompletedCharacters] = useState([]);

  useEffect(() => {
    const query = `
      query {
        Media(id: 21355, type: ANIME) {
          characters(perPage: 10) {
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
        const fetchedCharacters = data.data.Media.characters.edges.map(edge => edge.node);
        setCharacters(fetchedCharacters);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err);
      });
  }, []);

  const fallbackQuestions = [
    {
      question: "Do you like anime?",
      options: ["Yes", "No", "Only Re:Zero"],
      correct: 2,
    },
  ];

  const getCharacterKey = () => {
    return Object.keys(questionSets).find((key) =>
      selectedCharacter?.name?.full?.toLowerCase().includes(key.toLowerCase())
    );
  };

  const getQuestions = () => {
    const key = getCharacterKey();
    return key ? questionSets[key] : fallbackQuestions;
  };

  const handleCharacterSelect = (char) => {
    setSelectedCharacter(char);
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
  };

  const handleAnswer = (index) => {
    const questions = getQuestions();
    const current = questions[currentQuestion];

    const isCorrect = Array.isArray(current.correct)
      ? current.correct.includes(index)
      : index === current.correct;

    const newScore = isCorrect ? score + 1 : score;
    const next = currentQuestion + 1;

    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setFinished(true);
      setLastScore(newScore);
      setCompletedCharacters((prev) => [...prev, selectedCharacter.id]);
    }

    setScore(newScore);
  };

  const questions = getQuestions();

  if (!selectedCharacter) {
    return (
      <div className="character-select-screen">
        <h2>Choose your waifu:</h2>
        <div className="character-grid">
          {characters.map((char) => {
            const isCompleted = completedCharacters.includes(char.id);
            return (
              <div
                key={char.id}
                className={`character-card ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  if (!isCompleted) handleCharacterSelect(char);
                }}
              >
                <img src={char.image.large} alt={char.name.full} />
                <h3>{char.name.full}</h3>
                {isCompleted && <p className="completed-label">Zrizzowany/a 💘</p>}
              </div>
            );
          })}
        </div>

        {lastScore !== null && (
          <p className="score-text">huzz: {lastScore}</p>
        )}
      </div>
    );
  }

  return (
    <div className="dating-stage">
      <div className="character-image">
        <img
          src={selectedCharacter.image.large}
          alt={selectedCharacter.name.full}
        />
        <h2>{selectedCharacter.name.full}</h2>
        <p>
          <a
            href={selectedCharacter.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            AniList
          </a>
        </p>
      </div>

      <div className="question-box">
        {!finished ? (
          <>
            {questions[currentQuestion] ? (
              <>
                <h3>{questions[currentQuestion].question}</h3>
                {questions[currentQuestion].options.map((opt, idx) => (
                  <div key={idx}>
                    <button onClick={() => handleAnswer(idx)}>{opt}</button>
                  </div>
                ))}
              </>
            ) : (
              <p>Nie znaleziono pytania 🤔</p>
            )}
          </>
        ) : (
          <>
            <h3>
              {score === questions.length
                ? "Zrizzowales gyata!"
                : "chujowy gyacik z cb 😔"}
            </h3>
            <button onClick={() => setSelectedCharacter(null)}>
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DatingSim;