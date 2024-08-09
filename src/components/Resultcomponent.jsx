import { useState, useEffect } from "react";
import Audiocomponent from "./Audiocomponent";

function Resultcomponent({ Text }) {
  const [audiosrc, setaudiosrc] = useState("");
  const [partsOfSpeech, setpartsOfSpeech] = useState("");
  const [deftn, setdeftn] = useState("");
  const [synonyms, setsynonyms] = useState([]);
  const [phonetic, setphonetic] = useState("");

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + Text)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Extract data safely
        const phoneticData = data[0].phonetics[0] || {};
        const meaningData = data[0].meanings[0] || {};

        setaudiosrc(phoneticData.audio || "");
        setpartsOfSpeech(meaningData.partOfSpeech || "");
        setdeftn(
          meaningData.definitions ? meaningData.definitions[0].definition : ""
        );
        setsynonyms(meaningData.synonyms || []);
        setphonetic(data[0].phonetic || "");
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [Text]);

  return (
    <div>
      {audiosrc && <Audiocomponent audiosrc={audiosrc} />}
      <h1>{Text}</h1>
      <small>{phonetic}</small>
      <div>
        <p>{partsOfSpeech}</p>
        <p>Definition: {deftn}</p>
      </div>
      <div>
        {synonyms.length > 0 && (
          <div>
            <p>Synonyms:</p>
            {synonyms.map((syn, index) => (
              <p key={index}>{syn}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Resultcomponent;
