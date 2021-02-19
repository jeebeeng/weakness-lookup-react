import React, { useState, useEffect } from 'react';
import { data } from './data';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(data);

  useEffect(() => {
    if (name === '') {
      setList(data);
    } else {
    }
  }, [name]);

  return (
    <div>
      <header>
        <h1>Pokemon Weakness Lookup</h1>
      </header>
      <form className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
      <ul className="card-list">
        {list.map((item) => {
          return (
            <li>
              <Card data={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const Card = ({ data }) => {
  const { name, id, weaknesses, resistances, immunities } = data;
  return (
    <article className="info-card" key={id}>
      <h2>{name}</h2>
      <article>
        <h3>Weaknesses</h3>
        <ul className="type-list">
          {weaknesses.map((type, index) => {
            return <li key={index}>{type}</li>;
          })}
        </ul>
      </article>
      <article>
        <h3>Resistances</h3>
        <ul className="type-list">
          {resistances.map((type, index) => {
            return <li key={index}>{type}</li>;
          })}
        </ul>
      </article>
      <article>
        <h3>Immunities</h3>
        <ul className="type-list">
          {immunities.map((type, index) => {
            return <li key={index}>{type}</li>;
          })}
        </ul>
      </article>
    </article>
  );
};

export default App;
