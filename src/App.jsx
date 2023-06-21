import { useState, useEffect } from 'react';
import './index.css';                               //1. Der Code beginnt mit dem Importieren der notwendigen Module:
import loadingImage from './cat-loading.gif';       //  `React`, `useState`, `useEffect` aus der 'react'-Bibliothek, sowie die CSS-Dateien './index.css',
import catFactsImage from './cat-facts.png';        //  './cat-loading.gif' und './cat-facts.png'.




const Loading = () => {                             //2. Die Komponente `Loading` ist eine funktionale Komponente, die ein Bild mit dem `loadingImage
  return <img src={loadingImage} alt="Loading" />;  //`  als Quelle wiedergibt. Diese Komponente wird verwendet, um das Lade-Gif anzuzeigen.
};




const CatFact = ({ fact, generateNewFact }) => {   //3. Die `CatFact` Komponente ist eine weitere funktionale Komponente, die zwei props benötigt: 
  return (                                         //  `fact` und `generateNewFact`.
    <div>                                          
      <img src={catFactsImage} alt="Cat Facts" className="cat-facts-image" />   
      <p>{fact}</p>                         
      <button className="generate-button" 
      onClick={generateNewFact}>Generate New Fact 🐾
      </button>    
    </div>
  );            // Sie rendert ein Bild mit dem `catFactsImage` als Quelle, einen Absatz, der den `Fact` anzeigt, und eine Schaltfläche mit dem Text 
                // "Generate New Fact 🐾". Wenn die Schaltfläche angeklickt wird, wird die Funktion `generateNewFact` aufgerufen.
};




const App = () => {                                 //4. Die "App" ist die Hauptkomponente der Anwendung. Sie initialisiert zwei Zustandsvariablen mit dem 
  const [fact, setFact] = useState('');             //   `useState`-Hook: `fact`, um den aktuellen Cat-Fact zu speichern, und `isLoading`, um anzuzeigen, 
  const [isLoading, setIsLoading] = useState(true); //   ob die Daten gerade geladen werden.

  useEffect(() => {
    const fetchData = async () => {                 //5. Der `useEffect`-Hook wird verwendet, um den anfänglichen Cat-fact zu holen, wenn die 
      try {                                          //Komponente aufgesetzt (mount's) wird. 
        const response = await fetch('https://catfact.ninja/fact');  //Innerhalb des Effekts wird eine asynchrone Funktion "fetchData" definiert. Sie 
        const data = await response.json();                         //stellt eine GET-Anfrage an 'https://catfact.ninja/fact' und ruft die fact-data ab.
        setFact(data.fact);

        setTimeout(() => {                        // Der fact wird dann mit `setFact` in der Statusvariablen `fact` gespeichert. Die Funktion 
          setIsLoading(false);                    // `setIsLoading` wird nach einer 10-sekündigen Verzögerung mit `setTimeout` aufgerufen, um den 
        }, 10000); // 10 seconds delay            // Ladevorgang zu simulieren.
      } catch (error) {
        console.error('Error fetching cat fact:', error);
      }
    };

    fetchData();
  }, []);


    // 6. Die Funktion `generateNewFact` wird definiert, um die Erzeugung eines neuen Katzenfakts zu behandeln. Wenn sie aufgerufen wird, setzt sie `isLoading` auf `false`, um das Lade-Gif anzuzeigen, und stellt dann eine neue GET-Anfrage, um einen neuen Fakt zu holen. Der neue Fakt wird in der Statusvariablen `fact` gespeichert, und `isLoading` wird auf `false` gesetzt, um das Lade-Gif zu verbergen.                    

  const generateNewFact = async () => {
    setIsLoading(false); // Set isLoading to false before fetching new fact
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    setFact(data.fact);
    setIsLoading(false); // Set isLoading to false after fetching new fact
  };

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <CatFact fact={fact} generateNewFact={generateNewFact} />
      )}
    </div>
  );
};


//8. Schließlich wird die Komponente "App" als Standard-Export (default) exportiert.

export default App;




//Zusammenfassend lässt sich sagen, dass dieser Code eine React-Anwendung einrichtet, die beim ersten Laden einen Katzen-Faktor von einer API abruft, während des Ladevorgangs ein Lade-Gif anzeigt und dann den abgerufenen Fakt zusammen mit einem Bild und einem Button zum Generieren neuer Fakten anzeigt. Ein Klick auf die Schaltfläche löst eine neue Anfrage für einen Katzen-Faktor aus, ohne dass das Lade-Gif erneut angezeigt wird.