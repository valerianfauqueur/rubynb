import React from "react"
import PropTypes from "prop-types"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PartajouerTheme from '../PartajouerTheme';
import Twemoji from 'react-twemoji';


class Footer extends React.Component {

  state = {
    langVal: 1,
    currencyVal: 1,
  };

  handleLangChange = (event, index, langVal) => this.setState({langVal});

  handleCurChange = (event, index, currencyVal) => this.setState({currencyVal});

  render () {
    return (
      <MuiThemeProvider muiTheme={PartajouerTheme}>
        <footer className="footer">
          <div className="footer__content">
            <div className="footer__column">
              <h4 className="footer__columnTitle">Partajouer</h4>
              <ul className="footer__columnElements">
                <li className="footer__columnEl">À propos</li>
                <li className="footer__columnEl">Presse</li>
                <li className="footer__columnEl">Règles</li>
                <li className="footer__columnEl">Aide</li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__columnTitle">Découvrir</h4>
              <ul className="footer__columnElements">
                <li className="footer__columnEl">Confiance et sécurité</li>
                <li className="footer__columnEl">Joueur Partajouer</li>
                <li className="footer__columnEl">Guide</li>
                <li className="footer__columnEl">Partajouer mag</li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__columnTitle">Location</h4>
              <ul className="footer__columnElements">
                <li className="footer__columnEl">Pourquoi partager</li>
                <li className="footer__columnEl">Responsabilité</li>
                <li className="footer__columnEl">Partage responsable</li>
                <li className="footer__columnEl">Forum</li>
              </ul>
            </div>
            <div className="footer__column">
              <SelectField
                value={this.state.langVal}
                onChange={this.handleLangChange}
              >
                <MenuItem value={1} primaryText={<Twemoji>🇫🇷 Français</Twemoji>} />
                <MenuItem value={2} primaryText={<Twemoji>🇬🇧 English</Twemoji>} />
              </SelectField>

              <SelectField
                value={this.state.currencyVal}
                onChange={this.handleCurChange}
              >
                <MenuItem value={1} primaryText="€ Euros (EUR)" />
                <MenuItem value={2} primaryText="$ Dollars (USD)" />
              </SelectField>
            </div>
          </div>
          <div className="footer__social">
            <div className="footer__socialCredit">Ⓒ Partajouer, 2017</div>
            <div className="footer__socialRS">
              {[...this.props.rs].map((imagePath, i) => <img className="footer__socialRsIcon" src={imagePath} key={i} />)}
            </div>
          </div>
        </footer>
      </MuiThemeProvider>
    );
  }
}

Footer.propTypes = {
  rs: PropTypes.array
};

export default Footer
