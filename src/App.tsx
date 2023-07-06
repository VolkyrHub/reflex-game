import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<"initial" | "playing" | "finished">(
    "initial"
  );
  const [timer, setTimer] = useState<number>(0);
  const [position, setPosition] = useState<[number, number]>([
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ]);
  const [score, setScore] = useState<number>(0);

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
          {Math.round((timer / 10) * 100) / 100} seconds
        </h1>
        <div>Score: {score}</div>
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
      </section>
      <footer style={{ marginBottom: "2.5%" }}>
        {status === "initial" && (
          <button onClick={() => setStatus("playing")}>PLAY</button>
        )}
        {status === "playing" && (
          <button onClick={() => setStatus("finished")}>FINISH</button>
        )}
        {status === "finished" && (
          <button onClick={() => restartGame()}>RESTART</button>
        )}
      </footer>
    </main>
  );
}

export default App;
