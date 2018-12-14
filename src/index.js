import _ from 'lodash';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import  YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideosList from './components/video_list';
import VideosDetail from './components/video_detail';

const API_KEY = 'AIzaSyA72EV_TbeHnlyhdx6k4kz6WcXWLNtx0iY';

// create a new component. This component should produce some HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('dumb cat');

  }

  videoSearch(term) {
    // fetch data
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideosDetail video={this.state.selectedVideo} />
        <VideosList
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}


// Take this component's generated HTML and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));
