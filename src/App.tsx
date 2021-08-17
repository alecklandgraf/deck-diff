import React, { useState } from "react";
import "./App.css";

const COLS = 30;
const ROWS = 10;

function difference(setA: Set<string>, setB: Set<string>) {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function App() {
  const [deck1, setDeck1] = useState<string>("");
  const [deck2, setDeck2] = useState<string>("");
  const [diff, setDiff] = useState<string>("the diff will be generated here");

  function handleSwap() {
    setDeck1(deck2);
    setDeck2(deck1);
    createDiff(deck2, deck1);
  }

  function createDiff(a: string, b: string) {
    if (a.length === 0 || b.length === 0) {
      return;
    }

    const diff = difference(new Set(a.split("\n")), new Set(b.split("\n")));
    setDiff([...diff].join("\n"));
  }

  function handleChange(value: string, deck: 1 | 2) {
    if (deck === 1) {
      setDeck1(value);
      createDiff(value, deck2);
    } else {
      setDeck2(value);
      createDiff(deck1, value);
    }
  }

  return (
    <div className="App">
      <div className="lists">
        <div className="list">
          <textarea
            name="deck1"
            id="deck1"
            cols={COLS}
            rows={ROWS}
            value={deck1}
            onChange={(event) => handleChange(event.target.value, 1)}
          />
        </div>
        <button className="swap" onClick={handleSwap}>
          🔄
        </button>
        <div className="list">
          <textarea
            name="deck2"
            id="deck2"
            cols={COLS}
            rows={ROWS}
            value={deck2}
            onChange={(event) => handleChange(event.target.value, 2)}
          />
        </div>
      </div>
      <div className="diff">
        <textarea
          name="diff"
          id="diff"
          cols={COLS}
          rows={ROWS}
          value={diff}
          readOnly
        />
      </div>
    </div>
  );
}

export default App;
