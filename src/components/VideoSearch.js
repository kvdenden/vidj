import React from "react";
import { connect } from "react-redux";
import { Search } from "semantic-ui-react";
import _ from "lodash";

import { searchVideos } from "../actions";

const SearchResult = ({ id, title, description, thumbnails }) => (
  <Search.Result
    id={id}
    title={title}
    description={description}
    image={thumbnails.medium.url}
  />
);

const VideoSearch = ({ searchVideos, results, onVideoSelect }) => {
  const handleSearchChange = (_event, { value }) => {
    searchVideos(value);
  };

  const handleResultSelect = (_event, { result }) => {
    console.log(result);
    onVideoSelect(result);
  };

  return (
    <Search
      selectFirstResult
      results={results}
      onSearchChange={_.debounce(handleSearchChange, 500)}
      onResultSelect={handleResultSelect}
      resultRenderer={SearchResult}
      input={{ fluid: true }}
      fluid
    />
  );
};

VideoSearch.defaultProps = {
  results: [],
  onVideoSelect: () => {}
};

const mapStateToProps = ({ searchResults }) => {
  return { results: searchResults };
};

export default connect(
  mapStateToProps,
  { searchVideos }
)(VideoSearch);
