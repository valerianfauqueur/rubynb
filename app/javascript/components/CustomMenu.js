import React from "react"
import PropTypes from "prop-types"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


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

  render () {
    return(
      <MuiThemeProvider>
        <header className="menu">
          <nav className="menu__nav">
            <ul className="menu__navContainer">
              <li className="menu__navItem">
                <FlatButton label="Voir l'annonce" rippleColor="#494fec" style={{height: "100%",lineHeight: "100px"}} />
              </li>
              <li className="menu__navItem">
                <div>
                  <FlatButton
                    onClick={this.handleClick}
                    label="Click me"
                  />
                  <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                  >
                    <Menu>
                      <MenuItem primaryText="Refresh" />
                      <MenuItem primaryText="Help &amp; feedback" />
                      <MenuItem primaryText="Settings" />
                      <MenuItem primaryText="Sign out" />
                    </Menu>
                  </Popover>
                </div>
              </li>
            </ul>
          </nav>
        </header>
      </MuiThemeProvider>
    );
  }
}

export default CustomMenu
