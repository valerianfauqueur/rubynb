import React from "react"
import PropTypes from "prop-types"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SearchBar from 'material-ui-search-bar';
import Twemoji from 'react-twemoji';
import PartajouerTheme from '../PartajouerTheme';
import RaisedButton from 'material-ui/RaisedButton';


class CustomMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1, open: false};
  }

  handleChange = (event, index, value) => this.setState({value});

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  loggedInMenu = () => {
      return (
        <li className="menu__navItem menu__navItem--last">
          <FlatButton
            onClick={this.handleClick}
            style={{height: '100%', lineHeight: '100px'}}
            labelStyle={{display:'inline-block', heigth: '100%'}}
            label={
              <span style={{display:'flex', heigth: '100%', alignItems: 'center', justifyContent:'center' }}>
                <span class="menu__navProfile">{this.props.user.first_name + ' ' + this.props.user.last_name}</span>
                <Avatar
                  size={48}
                  src={this.props.profilePictureUrl}
                  style={{
                    borderRadius: '3px'
                  }}
                ></Avatar>
              </span>
            }
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem containerElement={<a href={this.props.links.editProfile}></a>} primaryText={<Twemoji>👤 Profile</Twemoji>} />
              <MenuItem containerElement={<a href={this.props.links.logout} data-method="delete"></a>} primaryText="Se déconnecter" />
            </Menu>
          </Popover>
        </li>
      );
  }

  render () {
    return(
      <MuiThemeProvider muiTheme={PartajouerTheme}>
        <header className="menu">
          <nav className="menu__nav">
            <ul className="menu__navContainer">
              <li className="menu__navItem">
                <a href="/">
                  <svg fill="#494fec" width="40" height="40" id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><title>des</title><path d="M248.37,0a11.37,11.37,0,0,0-3.92,1.25L34.58,110.85A11.37,11.37,0,0,0,28.44,121v3.35a11.37,11.37,0,0,0,0,4.09V364.25a13,13,0,0,0,8.18,13.13Q140.17,438,243.77,498.31a13.07,13.07,0,0,0,12.1.34Q359.92,438.18,463.81,377.2a13.41,13.41,0,0,0,7.9-12.62V127.33a10.91,10.91,0,0,0,0-1.76V121a11.37,11.37,0,0,0-6.19-10.12L255.25,1.45A11.37,11.37,0,0,0,249.56.2h-1.19Zm1.7,24.32,191.85,99.79L250.08,236,58.33,124.15Zm-198.9,122,187.53,109.4V469c-62.51-36.65-125-72.85-187.53-109.22Zm341,83.08a37.11,37.11,0,1,1-36.94,37.28q0-.09,0-.17A37.11,37.11,0,0,1,392.15,229.45Zm-69,92.18a37.11,37.11,0,1,1-36.94,37.28q0-.09,0-.17A37.11,37.11,0,0,1,323.16,321.63Z"/><path d="M183.3,343.16a25.12,25.12,0,0,0-11.76,3.3h-.4a25.69,25.69,0,0,0-8.35,34.67h0a25.52,25.52,0,0,0,34.61,8.47h0a25.4,25.4,0,0,0,8.35-34.44h0A25.46,25.46,0,0,0,183,343.05Z"/><path d="M147.22,282.3a25.12,25.12,0,0,0-11.76,3.3h-.4A25.46,25.46,0,0,0,126.53,320h0a25,25,0,0,0,34.1,8.58h0a25.29,25.29,0,0,0,8.69-34.1h0a25.46,25.46,0,0,0-22.73-12.28Z"/><path d="M110.84,221.66a24.55,24.55,0,0,0-11.37,3.52h0a25.29,25.29,0,0,0-8.69,34.1h0a25.63,25.63,0,0,0,34.27,9.32h.4A25.46,25.46,0,0,0,134,234.17h0a24.78,24.78,0,0,0-22.73-12.1Z"/><path d="M253.14,85.27a81.78,81.78,0,0,0-41.83,10.51A37.68,37.68,0,0,0,190.86,127a37.45,37.45,0,0,0,20.46,31.09,82.06,82.06,0,0,0,41.83,10.51A82.12,82.12,0,0,0,295,158.13,37.45,37.45,0,0,0,315.43,127,37.68,37.68,0,0,0,295,95.79,81.78,81.78,0,0,0,253.14,85.27Z"/>
                  </svg>
                </a>
              </li>
              <li className="menu__navItem">
                <SearchBar
                  onChange={() => console.log('onChange')}
                  onRequestSearch={() => console.log('onRequestSearch')}
                  hintText="Nom du jeu, ville, nombre de joueur"
                  style={{
                    width: 480
                  }}
                />
              </li>
              { this.props.isLoggedIn &&
              <li className="menu__navItem menu__navItem--end">
                <RaisedButton
                  label="Créer une annonce"
                  primary={true}
                />
              </li>}
              { this.props.isLoggedIn && this.loggedInMenu() }
              { !this.props.isLoggedIn && <li className="menu__navItem menu__navItem--end"><a href={this.props.links.signup}>inscription</a></li> }
              { !this.props.isLoggedIn && <li className="menu__navItem menu__navItem--last"><a href={this.props.links.login}>connexion</a></li> }
            </ul>
          </nav>
        </header>
      </MuiThemeProvider>
    );
  }
}

CustomMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  links: PropTypes.object,
  user: PropTypes.object,
};

export default CustomMenu
