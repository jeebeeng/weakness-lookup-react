import React, { useState } from 'react';
import { pokemon } from './data';

function App() {
  const [data, setData] = useState(pokemon);
  return (
    <div>
      <header>
        <h1>Pokemon Weakness Lookup</h1>
      </header>
      <List data={data} />
    </div>
  );
}

const List = ({ data }) => {
  return (
    <>
      {data.map((item) => {
        const { name, id, weaknesses } = item;
        return (
          <article key={id}>
            <h2>{name}</h2>
            <article>
              <h3>Weaknesses</h3>
              <ul>
                {weaknesses.map((type, index) => {
                  return <li key={index}>{type}</li>;
                })}
              </ul>
            </article>
          </article>
        );
      })}
    </>
  );
};

export default App;
