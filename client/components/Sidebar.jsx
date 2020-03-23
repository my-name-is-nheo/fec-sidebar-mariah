import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import StatCounts from './StatCounts.jsx';
import Links from './Links.jsx';
import About from './About.jsx';
import LikedSongs from './LikedSongs.jsx';

import styled from 'styled-components';

///////////////// STYLED COMPONENTS ////
const SidebarContainer = styled.div`
  top: 401px;
  font: 12px/1.4 Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  display: block;
  color: #333;

`;

const StatTable = styled.table`
  width: 100%;
  margin-bottom: 14px;
  font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-weight: 100;
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  border-color: grey;
`;

const Tbody = styled.tbody`
  display: table-row-group;
  vertical-alight: middle;
  border-color: inherit;
`;

const Tr = styled.tr`
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
`;

const AboutDiv = styled.div`
  margin-bottom: 20px;
  display: block;
  font: 12px/1.4 Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  color: #333;
`;

const LinksDiv = styled.div`
  font-size: 12px;
  display: block;
`;

const ArticleLiked = styled.div`
  margin-bottom: 20px;
  transition: all .2s linear;
  display: block;
}
`;

//////////////////////////asdfas



class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: '',

      links: [],
      about: [],
      follower_count: null,
      following_count: null,
      track_count: null,
      liked_songs: null,
      likedSongsList: []
    };
  }

  // Reformat get data
  formatData(results, that) {
    var artist = results.artist;
    console.log(artist.name);

    that.setState({
      artistName: artist.name,
      track_count: artist.track_count,
      follower_count: artist.follower_count,
      following_count: artist.following_count,
      about: artist.about.split('. '),
      links: artist.links.split(' '),
      liked_songs: artist.liked_songs,
      likedSongsList: results.likedSongs
    });

    console.log(this.state)
  }

  // Create onclick function for artist nadfaame to load that artist
  onArtistNameClick(e) {
    // get req here
    var that = this;
    console.log('hey');
    // axios.get random artist
    axios.get(`/artistname/?name=${e.currentTarget.textContent}`)
      .then(function (results) {
        that.formatData(results.data, that);
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  //send get req before component renders.
  componentWillMount() {
    // get req here
    var that = this;
    // axios.get random artist
    axios.get(`/artist`)
      .then(function(results) {
        that.formatData(results.data, that);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // On Hover function to be made if there's time.
  // onHover() {

  // }



  render() {
    return (
      <SidebarContainer id='sidebar-right'>

        <article id="stats">
          <StatTable id="links">
            <Tbody>
              <Tr>

                <StatCounts statTitle='followers' statNum={this.state.follower_count} />
                <StatCounts statTitle='following' statNum={this.state.following_count} />
                <StatCounts statTitle='tracks' statNum={this.state.track_count} />
              </Tr>

            </Tbody>
          </StatTable>
        </article>

        <article>
          <AboutDiv id="about">
            <About about={this.state.about}/>
          </AboutDiv>
        </article>
        <article>
          <LinksDiv id="weblinks">
            <Links
              links={this.state.links}
            />
          </LinksDiv>
        </article>
        <ArticleLiked>
          <div id="likedsongs">
            <LikedSongs
              likedSongsList={this.state.likedSongsList}
              count={this.state.liked_songs} onArtistNameClick={this.onArtistNameClick.bind(this)}
            />
          </div>
        </ArticleLiked>


      </SidebarContainer>
    );
  }
}

export default Sidebar;