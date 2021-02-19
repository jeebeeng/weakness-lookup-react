import React, { useState, useEffect } from 'react';
import { useFetch } from './utils/useFetch';
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
    console.log(data);
    if (name.trim() === '') {
      setList(data);
    } else {
      setList(() => {
        return data.filter((item) => {
          return item.name.toLowerCase().includes(name.toLowerCase().trim());
        });
      });
    }
  }, [name]);

  return (
    <div>
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
    </div>
  );
}

const PokemonList = React.memo(({ data }) => {
  return (
    <ul className="card-list">
      {data.map((item) => {
        return <InfoCard key={item.name} data={item} />;
      })}
    </ul>
  );
});

const InfoCard = ({ data }) => {
  const { name, weaknesses, resistances, immunities } = data;
  return (
    <article className="info-card">
      <h2>{name}</h2>
      <TypeCard title="Weaknesses" weaknesses={weaknesses} />
      <TypeCard title="Resistances" weaknesses={resistances} />
      <TypeCard title="Immunities" weaknesses={immunities} />
    </article>
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
