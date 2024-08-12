import { useState, useEffect } from "react";
import Audiocomponent from "./Audiocomponent";

function Resultcomponent({ Text }) {
  const [audiosrc, setaudiosrc] = useState("");
  const [partsOfSpeech, setpartsOfSpeech] = useState("");
  const [deftn, setdeftn] = useState("");
  const [synonyms, setsynonyms] = useState([]);
  const [phonetic, setphonetic] = useState("");
  const [res, setres] = useState(false);
  const [err, seterr] = useState("");
  const [meanings, setMeanings] = useState([]);
  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + Text)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.title == "No Definitions Found") {
          seterr(data.message);
        } else {
          setres(true);
          // Extract data safely
          const phoneticData = data[0].phonetics[0] || {};
          const meaningsData = data[0].meanings || [];

          setaudiosrc(phoneticData.audio || "");
          setpartsOfSpeech(meaningsData.partOfSpeech || "");
          setdeftn(
            meaningsData.definitions
              ? meaningsData.definitions[0].definition
              : ""
          );
          setsynonyms(meaningsData.synonyms || []);
          setphonetic(data[0].phonetic || "");
          setMeanings(meaningsData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [Text]);

  return (
    <>
      {" "}
      {res ? (
        <div className="result">
          {audiosrc && <Audiocomponent audiosrc={audiosrc} />}
          <h1>{Text}</h1>
          <small>{phonetic}</small>
          <div>
            {meanings.map((meaning, index) => (
              <div key={index} className="card">
                <h3 className="clr">{meaning.partOfSpeech}</h3>
                {meaning.definitions.map((definition, defIndex) => (
                  <div key={defIndex}>
                    <p>Definition: {definition.definition}</p>
                    {definition.example && <p>Example: {definition.example}</p>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            {synonyms.length > 0 && (
              <>
                <p>Synonyms:</p>
                <div className="syno">
                  {synonyms.map((syn, index) => (
                    <p key={index}>{syn}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>{err}</p>
        </div>
      )}
      <p>
        Developed by <a href="https://github.com/Subhi-c">Subhi.C</a>{" "}
      </p>
    </>
  );
}

export default Resultcomponent;
