import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<
    "initial" | "playing" | "finished" | "scoreboard"
  >("initial");
  const [timer, setTimer] = useState<number>(0);
  const [position, setPosition] = useState<[number, number]>([
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ]);
  const [score, setScore] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [scoreboard, setScoreboard] = useState<
    { name: string; score: number }[]
  >([]);

  function handleClick() {
    setScore((prevScore) => prevScore + 1);

    if (score === 9) {
      setStatus("finished");
    }

    setPosition([
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ]);
  }

  function restartGame() {
    setStatus("initial");
    setScore(0);
    setTimer(0);
  }

  function handleSubmitScore() {
    if (userName && score > 0) {
      const newScore = { name: userName, score: timer };
      const updatedScoreboard = [...scoreboard, newScore];

      updatedScoreboard.sort((a, b) => a.score - b.score);

      setScoreboard(updatedScoreboard);
      setUserName("");
      setStatus("scoreboard");
    }
  }

  useEffect(() => {
    let interval: number;

    if (status === "playing") {
      interval = setInterval(() => setTimer((timer) => timer + 1), 100);
    }

    return () => clearInterval(interval);
  }, [status]);

  return (
    <main>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2.5%",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>
          {Math.round((timer / 10) * 100) / 100} SECONDS
        </h1>
        <div>SCORE: {score}</div>
      </header>
      <section style={{ position: "relative", margin: "5%" }}>
        {status === "playing" && (
          <figure
            style={{
              position: "absolute",
              top: `${position[0]}%`,
              left: `${position[1]}%`,
            }}
            onClick={handleClick}
          >
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </figure>
        )}
        {status === "scoreboard" && (
          <div>
            {scoreboard.map((score, index) => (
              <div key={index}>
                {score.name.toUpperCase()} ..........{" "}
                {Math.round((score.score / 10) * 100) / 100} seconds
              </div>
            ))}
          </div>
        )}
      </section>
      <footer style={{ marginBottom: "2.5%" }}>
        {status === "initial" && (
          <>
            <button onClick={() => setStatus("playing")}>PLAY</button>
            <button
              onClick={() => setStatus("scoreboard")}
              style={{ marginLeft: "5%" }}
            >
              SCOREBOARD
            </button>
          </>
        )}
        {status === "playing" && (
          <button onClick={() => setStatus("finished")}>FINISH</button>
        )}
        {status === "finished" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <button onClick={() => restartGame()}>RESTART</button>
              <button
                onClick={() => setStatus("scoreboard")}
                style={{ marginLeft: "5%" }}
              >
                SCOREBOARD
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button
                onClick={() => handleSubmitScore()}
                style={{ marginLeft: "2.5%" }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        )}
        {status === "scoreboard" && (
          <div>
            <button onClick={() => setStatus("finished")}>BACK</button>
          </div>
        )}
      </footer>
    </main>
  );
}

export default App;
