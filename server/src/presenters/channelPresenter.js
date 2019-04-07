const channelPresenter = (channel, user) => {
  const { id, title, playlist } = channel;
  const data = {
    id,
    title,
    playlist: playlist.map(video => videoPresenter(video, user))
  };
  if (user) {
    const isOwner = user.id == channel.owner;
    return { ...data, owner: isOwner };
  } else {
    return data;
  }
};

const videoPresenter = (video, user) => {
  const { videoId, score } = video;
  const data = { videoId, score };
  if (user) {
    const myVote = video.votes.find(vote => user.id == vote.voter) || {};
    return { ...data, vote: myVote.vote };
  } else {
    return data;
  }
};

module.exports = channelPresenter;
