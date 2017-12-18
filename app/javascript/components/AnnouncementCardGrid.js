import React from "react";
import PropTypes from "prop-types";
import AnnouncementCard from "./AnnouncementCard";
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PartajouerTheme from '../PartajouerTheme';

class AnnouncementCardGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.cardsData = this.props.cardsData;
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={PartajouerTheme}>
        <div class="announcements__categoryContent">
          {this.props.cardsData.map(function(card, i){
                  return <AnnouncementCard cardData={card} key={i} />;
              })}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default AnnouncementCardGrid
