import React, { useEffect } from 'react';
import { fetchData, Method } from '../api/utils';

interface Props {
  rendering: boolean;
  setRendering: React.Dispatch<React.SetStateAction<boolean>>;
}

const useSearch = ({ rendering, setRendering }: Props) => {
  const [bookData, setBookData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await fetchData(Method.GET);

      if (response.status === 200) {
        setBookData(await response.content);
        setLoading(false);
        setRendering(false);
      }
    };
    fetch();
  }, [rendering]);

  return { bookData, loading, rendering };
};

export default useSearch;
