import React, { useContext, useEffect, useState } from 'react';
import {
  Icon, Button, Emphasis, Theme, UserBlock, Size, List, ListItem, Dialog, Text, Avatar, Toolbar,
} from '@lumx/react';
import { mdiLoading, mdiAlertCircleOutline, mdiKeyboardOutline } from '@lumx/icons';

import { ResultContext } from '../ResultContext';

function Results() {
  // State
  const [selectedResult, setSelectedResult] = useState(null);
  // Context
  const [searchTerm] = useContext(ResultContext).searchTerm;
  const [results] = useContext(ResultContext).results;
  const [areDataLoading] = useContext(ResultContext).areDataLoading;
  const [newPageLoading] = useContext(ResultContext).newPageLoading;
  const [page, setPage] = useContext(ResultContext).page;
  const [maxPage] = useContext(ResultContext).maxPage;

  // On results change, scroll to the last result
  useEffect(() => {
    // Scroll to the last result - 4 (so the first added)
    const scrollTo = document.querySelectorAll('.results .lumx-list-item').length - 4;
    if (scrollTo > 0) {
      document.querySelectorAll('.results .lumx-list-item')[scrollTo].scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  return (
	<section className="lumx-spacing-padding-horizontal-huge results-section">
		<div className="results">
			{/* Search term is empty */}
			{searchTerm === '' ? (
				<div className="no-results-box">
					<Icon icon={mdiKeyboardOutline} size="m" />
					<p>Start typing to search for Marvel characters.</p>
				</div>
			) : null}

			{/* Data is not loading, but there are no results */}
			{results.length === 0 && !areDataLoading && searchTerm !== '' ? (
				<div className="no-results-box">
					<Icon icon={mdiAlertCircleOutline} size="m" />
					<p>No results found.</p>
				</div>
			) : null}

			{/* There are results, and data is not loading */}
			{results.length > 0 && !areDataLoading && searchTerm !== '' ? (
				<>
					<Text as="p" color="grey" typography="overline">Click on a character to see more details.</Text>
					<Dialog
						isOpen={selectedResult !== null}
						onClose={() => setSelectedResult(null)}
						className="result-dialog"
					>
						{selectedResult ? (
							<>
								<header>
									<Toolbar label={<span className="lumx-typography-title">{selectedResult.name}</span>} />
								</header>
								<div className="lumx-spacing-padding-horizontal-huge">
									<Avatar
										image={`${selectedResult?.thumbnail?.path}.${selectedResult?.thumbnail?.extension}`}
										alt={selectedResult?.name}
										size={Size.xl}
										className="lumx-spacing-margin-bottom-huge"
									/>
									{selectedResult.description ? (
										<Text as="p">{selectedResult.description}</Text>
									) : (
										<Text as="p" typography="body1">No description available.</Text>
									)}
									<Text as="p" typography="overline" className="result-dialog__details lumx-spacing-margin-top-big">
										<Text as="span">Comics:</Text>
										{selectedResult.comics.available}
										<Text as="span">Series:</Text>
										{selectedResult.series.available}
										<Text as="span">Stories:</Text>
										{selectedResult.stories.available}
										<Text as="span">Events:</Text>
										{selectedResult.events.available}
									</Text>
								</div>
								<footer>
									<Toolbar
										after={(
											<Button emphasis={Emphasis.medium} onClick={() => setSelectedResult(null)}>
												Close
											</Button>
                      )}
									/>
								</footer>
							</>
						) : null}
					</Dialog>
					<List>
						{results.map((result) => (
							<ListItem size={Size.big} key={result.id}>
								<UserBlock
									theme={Theme.light}
									name={result.name}
									fields={
                  [
                    result.description,
	<Text as="p" typography="overline" className="result-list__details lumx-spacing-margin-top-tiny">
		<Text as="span">Comics:</Text>
		{result.comics.available}
		<Text as="span">Series:</Text>
		{result.series.available}
		<Text as="span">Stories:</Text>
		{result.stories.available}
		<Text as="span">Events:</Text>
		{result.events.available}
	</Text>,
                  ]
                }
									avatarProps={{ image: `${result.thumbnail.path}.${result.thumbnail.extension}` }}
									size={Size.l}
									onClick={() => setSelectedResult(result)}
								/>
							</ListItem>
						))}
					</List>
				</>
			) : null}

			{/* Data is loading */}
			{areDataLoading ? (
				<div className="loading-box">
					<Icon icon={mdiLoading} size="m" />
					<p>Loading Marvel characters from API...</p>
				</div>
			) : null}

			{/* There are results, and data is not loading */}
			{results.length > 0 && !areDataLoading && searchTerm !== '' ? (
				<Button className="load-page-button" leftIcon={newPageLoading ? mdiLoading : null} emphasis={Emphasis.medium} theme={Theme.light} onClick={() => setPage(page + 1)} disabled={page + 1 === maxPage || maxPage === 0 || newPageLoading}>
					Load more
				</Button>
			) : null}
		</div>
	</section>
  );
}

export default Results;
