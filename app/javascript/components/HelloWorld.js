import React from "react"
import PropTypes from "prop-types"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class HelloWorld extends React.Component {
  render () {
    return (
      <div>
      <div>
        <div>Greeting: {this.props.greeting}</div>
      </div>
      <MuiThemeProvider>
      <RaisedButton label="Default" />
      </MuiThemeProvider>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
