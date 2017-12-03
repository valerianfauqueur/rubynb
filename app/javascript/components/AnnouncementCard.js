import React from "react"
import PropTypes from "prop-types"

class AnnouncementCard extends React.Component {
  render () {
    return (
      <div className="announcement__card">
        <div className="announcement__cardPicture"></div>
        <div className="announcement__cardContent">
          <div className="announcement__meta">JEU DE CARTE — 6 JOUEURS</div>
          <div className="announcement__title">1000 bornes : du fun pour toute la famille</div>
          <div className="announcement__rentingPrice">3€ par jour</div>
          <div className="announcement__footer">
            <div className="announcement__rating">
              <div>Hello</div>
            </div>
            <div className="announcement__author">Charlotte B.</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AnnouncementCard
