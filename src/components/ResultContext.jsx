import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ResultContext = createContext();

export function ResultProvider({ children }) {
  // Shared states
  const searchTerm = useState('');
  const results = useState([]);
  const areDataLoading = useState(false);
  const newPageLoading = useState(false);
  const page = useState(0);
  const maxPage = useState(0);

  const memo = useMemo(() => ({
    searchTerm,
    results,
    areDataLoading,
    newPageLoading,
    page,
    maxPage,
  }), [areDataLoading, maxPage, newPageLoading, page, results, searchTerm]);

  return (
	<ResultContext.Provider value={memo}>
		{children}
	</ResultContext.Provider>
  );
}

ResultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
