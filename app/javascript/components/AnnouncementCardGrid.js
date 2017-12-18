import React from "react";
import PropTypes from "prop-types";
import AnnouncementCard from "./AnnouncementCard";
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PartajouerTheme from '../PartajouerTheme';
import * as $ from 'jquery';

class AnnouncementCardGrid extends React.Component {

  state = {
      category: localStorage.getItem('category'),
      cardsData: []
  }

  componentWillMount() {
    this.getAnnouncementCategory(this.state.category)
  }

  getAnnouncementCategory(category) {
    $.ajax({
      method: "GET",
      url: `/announcements?category=${category}&sort=-updated_at`,
      dataType: "json",
    })
    .done((data) => {
      console.log(data);
      this.setState({cardsData: data})
    })
    .fail((err) => {
      console.log(err);
    })
  }


  render () {
    return (
      <MuiThemeProvider muiTheme={PartajouerTheme}>
        <div class="announcements__categoryContent">
          {this.state.cardsData.length > 0 && this.state.cardsData.map(function(card, i){
              return <AnnouncementCard cardData={card} key={i} />;
          })}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default AnnouncementCardGrid
