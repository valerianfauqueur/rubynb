import React from "react"
import PropTypes from "prop-types"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import PartajouerTheme from '../PartajouerTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import * as $ from 'jquery';

const customTexts = {
  create: {
    title: 'Créer un compte',
    sendLabel: 'créer le compte',
    servError: 'La création du compte a échoué, veuillez corriger les erreurs indiqués',
    passwordLabel: 'Mot de passe',
    passwordHint: 'Entrez un mot de passe',
    passwordConfirmationLabel: 'Confirmation du mot de passe',
    passwordConfirmationHint: 'Ré-entrez votre mot de passe',
  },
  modify: {
    title: 'Modifier le compte',
    sendLabel: 'modifier le compte',
    servError: 'La modification du compte a échoué, veuillez corriger les erreurs indiqués',
    passwordLabel: 'Nouveau mot de passe',
    passwordHint: 'Entrez votre nouveau mot de passe',
    passwordConfirmationLabel: 'Confirmation du nouveau mot de passe',
    passwordConfirmationHint: 'Ré-entrez votre nouveau mot de passe',
  }
}

const initialState = {
  user: {
    email: '',
    password: '',
    password_confirmation: '',
    current_password: '',
    last_name: '',
    first_name: '',
    avatar: {}
  },
  formError: {
    email: '',
    password: '',
    password_confirmation: '',
    current_password: '',
    last_name: '',
    first_name: '',
    avatar: {},
  },
  servError: '',
  showServError: false,
  showSuccess: false,
  showSuccessMessage: 'Les modifications ont bien été prises en compte !',
};

class AccountForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    if(this.props.modifying) {
      this.text = customTexts.modify;
      this.state.user = {...this.props.user};
    } else {
      this.text = customTexts.create;
    }
  }

  handleInputChange = (ev) => {
    let user = {...this.state.user};
    user[ev.target.name] = ev.target.value;
    this.setState({user});
  }

  handleSubmit = (e) => {
      e.preventDefault();
      $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
      });
      $.ajax({
        method: this.props.modifying ? "PUT" : "POST",
        url: this.props.actionUrl,
        dataType: "json",
        data: {
          user: { ...this.state.user },
          authenticity_token: $('meta[name="csrf-token"]').attr('content'),
        },
      })
      .done((data) => {
        if(this.props.modifying) {
          this.setState({
            showSuccess: true,
          });
        } else {
          window.location.replace("/");
        }
      })
      .fail((err) => {
        for(let key in err.responseJSON.errors) {
          err.responseJSON.errors[key] = err.responseJSON.errors[key].join(' | ');
        }
        console.log(err);
        this.setState({
          formError: {...err.responseJSON.errors},
          servError: this.text.servError,
          showServError: true,
        });
      })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={PartajouerTheme}>
          <div>
            <Snackbar
              open={this.state.showServError}
              message={this.state.servError}
              autoHideDuration={6000}
              bodyStyle={{ backgroundColor: '#E53935', color: 'white' }}
            />
            <Snackbar
              open={this.state.showSuccess}
              message={this.state.showSuccessMessage}
              autoHideDuration={6000}
              bodyStyle={{ backgroundColor: '#43A047', color: 'white' }}
            />
            <form
              onSubmit={this.handleSubmit}
              onChange={this.handleInputChange}
            >
            <div className="formStyle">
              <h2 className="title">{this.text.title}</h2>
              <TextField
                hintText="pierre.duchemin@gmail.com"
                floatingLabelText="Email"
                type="text"
                value={this.state.user.email}
                name="email"
                style={{width:'80%'}}
                errorText={this.state.formError.email}
              />
              <TextField
                hintText={this.text.passwordHint}
                floatingLabelText={this.text.passwordLabel}
                type="password"
                value={this.state.user.password}
                name="password"
                errorText={this.state.formError.password}
                style={{width:'80%'}}
              />
              <TextField
                hintText={this.text.passwordConfirmationHint}
                floatingLabelText={this.text.passwordConfirmationLabel}
                type="password"
                value={this.state.user.password_confirmation}
                name="password_confirmation"
                errorText={this.state.formError.password_confirmation}
                style={{width:'80%'}}
              />
              {this.props.modifying &&
                <TextField
                  hintText="Entrez votre mot de passe actuel"
                  floatingLabelText="Mot de passe actuel (valide les modifications)"
                  type="password"
                  value={this.state.user.current_password}
                  name="current_password"
                  errorText={this.state.formError.current_password}
                  style={{width:'80%'}}
                />
              }
              <TextField
                hintText="Duchemin"
                floatingLabelText="Nom"
                type="text"
                value={this.state.user.last_name}
                name="last_name"
                errorText={this.state.formError.last_name}
                style={{width:'80%'}}
              />
              <TextField
                hintText="Paul"
                floatingLabelText="Prénom"
                type="text"
                value={this.state.user.first_name}
                name="first_name"
                errorText={this.state.formError.first_name}
                style={{width:'80%'}}
              />
              <RaisedButton
                className="form__input"
                label={this.text.sendLabel}
                primary={true}
                type="submit"
                style={{marginTop:'20px'}}
                />
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

AccountForm.propTypes = {
  actionUrl: PropTypes.string,
  user: PropTypes.object,
  modifying: PropTypes.bool,
};

export default AccountForm
