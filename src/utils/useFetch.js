import { useState, useEffect } from 'react';

export const useFetch = () => {
  const url = 'http://localhost:3001/pokemon';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPokemon = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data.pokemon);
    setLoading(false);
  };

  useEffect(() => {
    getPokemon();
  }, [url]);

  return { data, loading };
};
