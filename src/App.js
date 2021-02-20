import React, { useState, useEffect } from 'react';
import { useFetch } from './utils/useFetch';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import './index.css';

function App() {
  const url = 'http://localhost:3001/pokemon';
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const { data, isLoading } = useFetch(url);

  useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    if (name.trim() === '') {
      setList(data);
    } else {
      setList(() => {
        return data.filter((item) => {
          return item.name.toLowerCase().includes(name.toLowerCase().trim());
        });
      });
    }
  }, [name, data]);

  return (
    <>
      <header>
        <h1>Pokemon Weakness Lookup</h1>
      </header>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {isLoading ? <h1>Loading...</h1> : <PokemonList data={list} />}
    </>
  );
}

const PokemonList = React.memo(({ data }) => {
  return (
    <div className="info-list">
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            itemCount={data.length}
            itemSize={300}
            height={height}
            width={width}
            itemData={data}
          >
            {InfoCard}
          </List>
        )}
      </AutoSizer>
    </div>
  );
});

const InfoCard = ({ index, style, data }) => {
  const { name, weaknesses, resistances, immunities } = data[index];

  return (
    <div style={style}>
      <article className="info-card">
        <h2>{name}</h2>
        <TypeCard title="Weaknesses" weaknesses={weaknesses} />
        <TypeCard title="Resistances" weaknesses={resistances} />
        <TypeCard title="Immunities" weaknesses={immunities} />
      </article>
    </div>
  );
};

const TypeCard = ({ title, weaknesses }) => {
  return (
    <article>
      <h3>{title}</h3>
      <ul className="type-list">
        {weaknesses.map((type, index) => {
          return <li key={index}>{type}</li>;
        })}
      </ul>
    </article>
  );
};

export default App;
