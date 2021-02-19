import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);

  const getPokemon = async () => {
    const response = await fetch(url);
    const pokemon = await response.json();
    setPokemon(pokemon);
    setLoading(false);
  };

  useEffect(() => {
    getPokemon();
  }, [url]);
  return { loading, pokemon };
};
