import React, { useEffect, useContext, useRef } from 'react';
import {
  TextField, Theme,
} from '@lumx/react';
import { mdiMagnify } from '@lumx/icons';

import { ResultContext } from '../ResultContext';

/**
 * Fetch results from the Marvel API based on the search term.
 * A page can be specified to fetch results from a specific page.
 *
 * @param {string} searchTerm
 * @param {number} page
 * @returns {Promise<{results: any[], total: number}>}
 */
async function getResults(searchTerm, page = 0) {
  const offset = page ? page * 4 : 0;
  const response = await fetch(`https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_MARVEL_API_KEY}&nameStartsWith=${searchTerm}&limit=4&offset=${offset}`);
  const json = await response.json();
  return {
    searchTerm,
    results: json.data.results,
    total: json.data.total,
  };
}

function Search() {
  // Context
  const [searchTerm, setSearchTerm] = useContext(ResultContext).searchTerm;
  const [results, setResults] = useContext(ResultContext).results;
  const [, setAreDataLoading] = useContext(ResultContext).areDataLoading;
  const [, setNewPageLoading] = useContext(ResultContext).newPageLoading;
  const [page, setPage] = useContext(ResultContext).page;
  const [, setMaxPage] = useContext(ResultContext).maxPage;

  // Ref (keep track of the current search term during the fetch)
  const currentSearchTerm = useRef();
  currentSearchTerm.current = searchTerm;

  // On search term change, fetch new results
  useEffect(() => {
    // Reset results if search term is empty
    if (searchTerm === '') {
      setResults([]);
      setMaxPage(0);
      return;
    }

    const search = async () => {
      setAreDataLoading(true);
      const res = await getResults(searchTerm);
      // Ignore results if the search term has changed
      if (res.searchTerm === currentSearchTerm.current) {
        setPage(0);
        setResults(res.results);
        setMaxPage(Math.ceil(res.total / 4));
      }
      setAreDataLoading(false);
    };

    search();
  }, [searchTerm, setAreDataLoading, setMaxPage, setPage, setResults]);

  // On load more click, fetch new results
  useEffect(() => {
    if (page === 0) {
      return;
    }
    const search = async () => {
      setNewPageLoading(true);
      const res = await getResults(searchTerm, page);
      // Ignore results if the search term has changed
      if (res.searchTerm === currentSearchTerm.current) {
        setResults(results.concat(res.results));
      }
      setNewPageLoading(false);
    };
    search();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
	<TextField theme={Theme.dark} placeholder="Search ..." icon={mdiMagnify} value={searchTerm} onChange={setSearchTerm} />
  );
}

export default Search;
