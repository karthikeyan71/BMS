import React, { Component } from 'react';
import './thumbnail.scss';
import axios from 'axios';

export default class Thumbnail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieData: [[],{}],
      opener: '',
      selectedBlock: -1,
    }
  }

  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs')
    .then(({data}) => {
      this.setState({
        movieData: data
      })
    })
    .catch(err => console.log(err))
  }

  openBlock = (position) => {
    this.setState({
      selectedBlock: position
    });
  }

  remove = (url) => {
    return url.replace('watch?v=','embed/').replace('&feature=youtu.be','');
  }

  dateFormatter = (date) => {
    return date.split(',')[0].split(' ');
  }

  render() {

    const { selectedBlock, movieData } = this.state;
    const data = Object.keys(movieData[1]);

    const movieList = data.map(( Event, index) => {
      const { EventTitle, EventCode, TrailerURL, ShowDate, EventLanguage, EventGenre, ratings } = movieData[1][Event];
      const { wtsCount, dwtsCount, totalWTSCount, maybe } = ratings;
      const [date, month] = this.dateFormatter(ShowDate);
      if (selectedBlock == index) {
        return (
          <div
          className='normal_blocks'
          key={EventTitle}
          onClick={()=>this.openBlock(index)}
          >
            <div className="upperlevel">
              <div className="inner_level">
                <div className="left_side">
                <iframe src={`${this.remove(TrailerURL)}?autoplay=1`}
                width="100%" height="100%" frameborder="0" allowFullScreen>
                </iframe>
                </div>
                <div className="right_side">
                  <h6> {EventTitle} </h6>
                  <p className="small_text"> {EventLanguage} </p>
                  <div className="tags">
                    {
                        EventGenre.split('|').map((genre)=>(<li>{ genre } </li>))
                    }
                  </div>
                  <br />
                  <div className="rating"> <div><i className="fa fa-thumbs-up" aria-hidden="true"></i></div> <div> { parseInt((wtsCount/totalWTSCount)*100) }% <br/> <span>{totalWTSCount} votes</span> </div><div> <i className="fa fa-calendar" aria-hidden="true"></i> <span className="first_span">{ ShowDate.split(',')[0] }</span> <br/> <span className="last_span">{ ShowDate.split(',')[1] }</span> </div> </div>
                  <p className='normal_text'> After the pane crashes in Alaska, six oil workers are led by a skilled huntsman to survival, but a pack of merciless wolves haunts their every step. </p>
                  <p className="color_text"> Read More </p>
                  <div className="end_part">
                    <div>
                      <div className="round_div">
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                      </div><br/>
                      <p className="watch_message"> WILL WATCH </p>
                      <p className="count_votes"> ({wtsCount}) </p>
                    </div>
                    <div>
                      <div className="round_div">
                        <i className="fa fa-question" aria-hidden="true"></i>
                      </div><br/>
                      <p className="watch_message"> MAYBE </p>
                      <p className="count_votes"> ({maybe}) </p>
                    </div>
                    <div>
                      <div className="round_div">
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                      </div><br/>
                      <p className="watch_message"> WON'T WATCH </p>
                      <p className="count_votes"> ({dwtsCount}) </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="movie_blocks">
              <div className="image">
                <div className='border_block'>
                  <img src={`https://in.bmscdn.com/events/moviecard/${EventCode}.jpg`}/>
                </div>
              </div>
              <div className="date">
                <span> { date } </span>
                <span> { month } </span>
              </div>
              <div className="rate_out">
                <i className="fa fa-thumbs-up" aria-hidden="true"></i> <span>{ parseInt((wtsCount/totalWTSCount)*100) }% </span>
                <br/>
                <span>{totalWTSCount} votes</span>
              </div>
              <div className="content">
                {EventTitle}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
          className='normal_blocks'
          key={EventTitle}
          onClick={()=>this.openBlock(index)}
          >
            <div className="movie_blocks">
            <div className="image">
              <img src={`https://in.bmscdn.com/events/moviecard/${EventCode}.jpg`} />
            </div>
            <div className="date">
              <span> { date } </span>
              <span> { month } </span>
            </div>
            <div className="rate_out">
              <i className="fa fa-thumbs-up" aria-hidden="true"></i> <span>{ parseInt((wtsCount/totalWTSCount)*100) }% </span>
              <br/>
              <span>{totalWTSCount} votes</span>
            </div>
            <div className="play_button">
              <i className="fa fa-play" aria-hidden="true"></i>
            </div>
            <div className="content">
              {EventTitle}
            </div>
            </div>
          </div>
        );
      }
    });

    const content = data.length > 1 ? (
      <div className="fluid-container">
      <br/><br/>
        <div style={{textAlign:'center', position:'relative'}}>
          { movieList }
        </div>
      </div>
    ) : '';

    return (
      <div>
        <div className="header">
          <div className="filters">
            <div className="individual_filter"> Fresh </div>
            <div className="individual_filter"> All Languages </div>
            <div className="individual_filter"> All Genres </div>
          </div>
        </div>
        {content}
      </div>
    );
  }
}
