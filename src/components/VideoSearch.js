import React, { useState } from "react";
import { connect } from "react-redux";
import { Search } from "semantic-ui-react";
import _ from "lodash";

import { searchVideos } from "../actions";

const VideoSearch = ({ searchVideos, search, onVideoSelect }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (_event, { value }) => {
    setQuery(value);
    if (value) {
      searchVideos(value);
    }
  };

  const handleResultSelect = (_event, { result }) => {
    const { id, title, description, image } = result;
    const video = {
      title,
      description,
      thumbnail: image,
      videoId: id
    };
    onVideoSelect(video);
    setQuery("");
  };

  const { loading } = search;
  const results = search.results.map(result => {
    const { videoId, title, description, thumbnail } = result;
    return {
      id: videoId,
      childKey: videoId,
      title,
      description,
      image: thumbnail
    };
  });

  return (
    <Search
      value={query}
      loading={loading}
      results={results}
      selectFirstResult
      onSearchChange={handleSearchChange}
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

const mapDispatchToProps = dispatch => {
  const debouncedSearch = _.debounce(q => dispatch(searchVideos(q)), 1000);
  return {
    searchVideos: debouncedSearch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoSearch);
