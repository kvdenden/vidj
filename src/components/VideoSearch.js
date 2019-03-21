import React from "react";
import { connect } from "react-redux";
import { Search } from "semantic-ui-react";
import _ from "lodash";

import { searchVideos } from "../actions";

const VideoSearch = ({ searchVideos, search, onVideoSelect }) => {
  const handleSearchChange = (_event, { value }) => {
    searchVideos(value);
  };

  const handleResultSelect = (_event, { result }) => {
    console.log(result);
    onVideoSelect(result);
  };

  const { loading } = search;
  const results = search.results.map(result => {
    const { videoId, title, description, thumbnail } = result;
    return {
      childKey: videoId,
      title,
      description,
      image: thumbnail
    };
  });

  return (
    <Search
      loading={loading}
      results={results}
      selectFirstResult
      onSearchChange={_.debounce(handleSearchChange, 500)}
      onResultSelect={handleResultSelect}
      input={{ fluid: true }}
      fluid
    />
  );
};

VideoSearch.defaultProps = {
  search: { loading: false, results: [] },
  onVideoSelect: () => {}
};

const mapStateToProps = ({ search }) => {
  return { search };
};

export default connect(
  mapStateToProps,
  { searchVideos }
)(VideoSearch);
