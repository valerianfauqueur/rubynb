import React from "react"
import PropTypes from "prop-types"

class AnnouncementCard extends React.Component {

  getCategoryText(category) {
    switch(category) {
      case 1:
        return 'Jeux de plateau';
        break;
      case 2:
        return 'Jeu de cartes';
        break;
      case 3:
        return 'Jeu de dès';
        break;
      case 4:
        return 'Jeux en plein air';
        break;
    }
  }

  getNormalizedPrice(price, withCurrency = true) {
    return withCurrency ? (price/100) + ' €' : (price/100);
  }

  render () {
    let card = this.props.cardData;
    return (
      <div className="announcement__card" onClick={() => location.replace('/announcements/' + card.id)}>
        <div className="announcement__cardPicture" style={{
          backgroundImage: `url(/images/products/${card.id}/medium/${card.pictures[0].image_file_name})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}></div>
        <div className="announcement__cardContent">
          <div className="announcement__meta">{this.getCategoryText(card.game_type)} — {card.game_min_players} - {card.game_max_players} JOUEURS</div>
          <div className="announcement__title">{card.game_title} : {card.title}</div>
          <div className="announcement__rentingPrice">{this.getNormalizedPrice(card.renting_price)} par jour</div>
          <div className="announcement__footer">
            <div className="announcement__rating">
              <div></div>
            </div>
            <div className="announcement__author">{card.user.first_name} {card.user.last_name.charAt(0)}.</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AnnouncementCard
