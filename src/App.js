import React, { useState, useEffect } from 'react';
import { useFetch } from './utils/useFetch';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import './index.css';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const { data, isLoading } = useFetch();

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
      <div className="top-content">
        <h1 className="main-title">PokeWeak</h1>
        <input
          className="main-input"
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
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          itemCount={data.length}
          itemSize={600}
          height={height}
          width={width}
          itemData={data}
        >
          {InfoCard}
        </List>
      )}
    </AutoSizer>
  );
});

const InfoCard = ({ index, style, data }) => {
  const { name, type, weaknesses, resistances, immunities } = data[index];

  return (
    <div
      style={{
        ...style,
        height: 'wrapContent',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <article className="info-card">
        <h1 className="pokemon-name">{name}</h1>
        <TypeCard title="" types={type} />
        <TypeCard title="Weaknesses" types={weaknesses} />
        <TypeCard title="Resistances" types={resistances} />
        <TypeCard title="Immunities" types={immunities} />
      </article>
    </div>
  );
};

const TypeCard = ({ title, types }) => {
  return (
    <article className="type-card">
      {title && <h3 className="type-card-title">{title}</h3>}
      <div className="type-container">
        <ul className="type-list">
          {types.map((type, index) => {
            return (
              <li key={index} className="type">
                {type}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default App;
