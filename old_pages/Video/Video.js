import React, { Component, Fragment } from "react";

import Input from "../../components/Input";
import Footer from "../../components/Footer";
import Description from "../../components/Description";
import axios from "axios";
import cheerio from "cheerio";
import classes from "../../components/index.module.css"
import NavBar from "../../components/Nav";




class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      video: "",
      id: "",
      isLoading: false,
      isError: false,
      isSingle: false,
      finalVideoUrl: null,
      isVideo:false,
      isImage:false,
    };
  }

  componentDidMount() {
    document.title = "Instagram Videos Downloader";
  }

  handleChange = (e) => {
    this.setState({ id: e.target.value });
  };

  getVideosData = async () => {
    try{
      this.setState({  
        isError: false,})
      this.setState({ finalVideoUrl: null });
      console.log("triggered");
      console.log(this.state.id);
  
      let config = {
        headers: {
          withCredentials: true,
         
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',  
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      };
      // calls axios to go to the page and stores the result in the html variable
      const html = await axios.get(`https://cors-anywhere.herokuapp.com/${this.state.id}`, config);
      // calls cheerio to process the html received
      console.log(html);
      const $ = cheerio.load(html.data);
      // searches the html for the videoString
      const videoString = $("meta[property='og:video']").attr("content");
      const imageString = $("meta[property='og:image']").attr("content");
      // returns the videoString
      this.setState({ isVideo: videoString, isImage:  imageString});
  
      this.setState({ isLoading: false });
      return;
  
    }catch{
      this.setState({   isLoading: false,
        isError: true,})
 return;
    }
    
  
  };

  handleSubmit = (e) => {
    const { id } = this.state;
    this.setState({ id, isLoading: true });
    this.getVideosData();
    e.preventDefault();
  };

  render() {
    const { video, videos, id, isError, isLoading, isSingle } = this.state;
    return (
      <div>
        <NavBar/>
<Fragment>
        <div className="container mtop content">
          <Input
            onSubmit={this.handleSubmit}
            placeholder="Enter Instagram Post URL..."
            id={id}
            onChange={this.handleChange}
          />
          {this.state.isImage && <img style={{width:"60%" , height:"auto" , maxWidth:"500px"}} src={this.state.isImage} /> }
          {this.state.isVideo && <video style={{width:"60%" , height:"auto" , maxWidth:"500px"}}  >

  <source src={this.state.isVideo} type="video/mp4" />
  <source src={this.state.isVideo} type="video/ogg" />
  Your browser does not support the video tag.

          </video> }
          {isError ? (
            <div className="row mt-5">
              <div className="col">
                <h5 className="text-center text-danger pb-3">
                  Sorry to say but Some error occured...
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
            <div className="row mt-5">
              {isSingle ? (
                <div className="col-md-4 mb-3">
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
              ) : (
                videos.map((video, i) => (
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
                ))
              )}
            </div>
          )}
          <Description
            title="Videos"
            thirdStep="Copy the URL of that Video or copy the URL of profile."
          />
        </div>
        <Footer />
      </Fragment>
      </div>
      
    );
  }
}

export default Video;
