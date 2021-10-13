import React, { useCallback, useState } from "react";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import data from './data'
import { ClickHandler, Dict } from "./types";

type DataType = {
  name: string;
  email: string;
  birthdate: string;
};

function App() {
  const [selectedIndexes, setSelectedIndexes] = useState<Dict<boolean>>({});
  const handleClick: ClickHandler<number> = useCallback(
    (index: number) => {
      setSelectedIndexes((selectedIndexes) => {
        const aux = {
          ...selectedIndexes,
        };
        if (aux[index]) {
          delete aux[index];
          return aux;
        }
        aux[index] = true;
        return aux;
      });
    },
    [setSelectedIndexes]
  );
  const selectedElements = Object.keys(selectedIndexes).map((e) => parseInt(e));

  return (
    <div id="App">
      <Header selectedElements={selectedElements} handleClick={handleClick} />
      <List
        list={data as DataType[]}
        renderer={({ name, email, birthdate }) => (
          <>
            <p>
              {name} ({email})
            </p>
            <p>{birthdate}</p>
          </>
        )}
        handleClick={handleClick}
        selectedIndexes={selectedIndexes}
      />
    </div>
  );
}

export default App;
