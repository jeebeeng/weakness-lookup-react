import React, { useState, useEffect } from 'react';
import { data } from './data';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(data);
  useEffect(() => {
    if (name.trim() === '') {
      setList(data);
    } else {
      setList((list) => {
        return data.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase().trim())
        );
      });
    }
  }, [name]);

  return (
    <div>
      <header>
        <h1>Pokemon Weakness Lookup</h1>
      </header>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
      <PokemonList data={list} />
    </div>
  );
}

const PokemonList = ({ data }) => {
  return (
    <ul className="card-list">
      {data.map((item) => {
        return <InfoCard key={item.id} data={item} />;
      })}
    </ul>
  );
};

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
