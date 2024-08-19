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
  const [srcurl, setsrcurl] = useState("");
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
          setsrcurl(data[0].sourceUrls);
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
          <h1 className="f-4rem">{Text}</h1>
          <small className="f-24px clr">{phonetic}</small>
          <div>
            {meanings.map((meaning, index) => (
              <div key={index}>
                <h3 className="br-btm f-24px">{meaning.partOfSpeech}</h3>
                {/* <div className="line"></div> */}
                <h2 className="f-20px">Meaning</h2>
                <ul>
                  {meaning.definitions.map((definition, defIndex) => (
                    <li key={defIndex}>
                      <p className="f-18px"> {definition.definition}</p>
                      {definition.example && (
                        <p className="grey f-18px">{definition.example}</p>
                      )}
                    </li>
                  ))}
                </ul>
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
          <div className="src">
            <p className="f-16px mt-10">Source</p>
            <a href={srcurl} className="grey mt-20" target="_blank">
              {" "}
              {srcurl}
            </a>
          </div>
          <p className="mt-30">
            Developed by <a href="https://github.com/Subhi-c">Subhi.C</a>{" "}
          </p>
        </div>
      ) : (
        <div>
          <p>{err}</p>
          <p>
            Developed by <a href="https://github.com/Subhi-c">Subhi.C</a>{" "}
          </p>
        </div>
      )}
    </>
  );
}

export default Resultcomponent;
