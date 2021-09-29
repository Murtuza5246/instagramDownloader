import React, { Component, Fragment } from 'react';
import { getIgStories } from '../../services';
import Input from '../../components/Input';
import Footer from '../../components/Footer';
import Description from '../../components/Description';

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      photos: [],
      id: '',
      isLoading: false,
      isError: false
    };
  }

  componentDidMount() {
    document.title = 'Instagram Stories Downloader';
  }

  handleChange = e => {
    this.setState({ id: e.target.value });
  }

  getStoriesData = async () => {
    const { id } = this.state;
    try {
      const res = await getIgStories(id);
      const videos = res.video_url.filter(n => n);
      this.setState({
        photos: res.pict_url,
        videos,
        isLoading: false
      });
    } catch (error) {
      this.setState({ isError: true });
    }
  };

  handleSubmit = e => {
    const { id } = this.state;
    this.setState({ id, isLoading: true });
    this.getStoriesData();
    e.preventDefault();
  }

  render() {
    const { videos, photos, id, isError, isLoading } = this.state;
    return (
      <Fragment>
        <div className="container mtop content">
          <Input
            onSubmit={this.handleSubmit}
            placeholder="Enter Instagram Username.."
            id={id}
            onChange={this.handleChange}
          />
          {isError ? (
            <div className="row mt-5">
              <div className="col">
                <h5 className="text-center text-danger pb-3">
                  Hasil tidak ditemukan
                </h5>
              </div>
            </div>
          ) : isLoading ? (
            <div
              className="row mt-5"
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <Fragment>
              <div className="row mt-5">
                {photos.map((photo, i) => (
                  <div className="col-md-4 mb-3" key={i}>
                    <div className="card">
                      <img src={photo} className="card-img" alt={photo} />
                    </div>
                    <div className="card-body text-center">
                      <a href={photo} className="btn btn-success" download>
                        <i className="fas fa-download" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row mt-5">
                {videos.map((video, i) => (
                  <div className="col-md-4 mb-3" key={i}>
                    <div className="card">
                      <video
                        src={video}
                        className="card-img-top video-custom"
                        controls
                      />
                    </div>
                    <div className="card-body text-center">
                      <a href={video} className="btn btn-success" download>
                        <i className="fas fa-download" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
          <Description
            title="Stories"
            thirdStep="Copy the username account you want to download the stories."
          />
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Story;
