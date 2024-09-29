import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro ao pegar dados');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
        setError(error.message);
      } 
    };

    fetchData();
  }, [url]); 
  
  return { data, error };


};

export default useFetchData;
