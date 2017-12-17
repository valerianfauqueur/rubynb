import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PartajouerTheme from '../PartajouerTheme';
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import UploadInput from './UploadInput';
import * as $ from 'jquery';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import {red500} from 'material-ui/styles/colors';

const initialState = {
  announcement: {
    game_title: '',
    game_type: 1,
    game_min_players: null,
    game_max_players: null,
    game_min_age: null,
    game_status: 2,
    game_min_duration: null,
    game_max_duration: null,
    game_content: '',
    pictures_attributes: [],
    title: '',
    description: '',
    availibity: '',
    min_reservation: null,
    max_reservation: null,
    renting: null,
    caution: null,
    tmp_game_players: '',
    tmp_game_content: '',
    tmp_game_tags: '',
    tmp_game_duration: '',
  },
  formError: {
    game_title: null,
    game_type: null,
    game_min_players: null,
    game_max_players: null,
    game_min_age: null,
    game_status: null,
    game_min_duration: null,
    game_max_duration: null,
    game_content: null,
    game_players: null,
    game_content: null,
    game_tags: null,
    game_duration: null,
    pictures: [],
    title: null,
    description: null,
    availibity: null,
    min_reservation: null,
    max_reservation: null,
    renting: null,
    caution: null,
    tmp_game_players: null,
    tmp_game_content: null,
    tmp_game_tags: null,
    tmp_game_duration: null,
  },
  servError: '',
  showServError: false,
  showSuccess: false,
  showSuccessMessage: 'Les modifications ont bien été prises en compte !',
  finished: false,
  stepIndex: 0,
};

const inputStyle = {
  width:'80%',
}

class AnnouncementForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  hasStepError = (step) => {
    let formError = this.state.formError;
    switch(step) {
      case 0:
        if(formError.game_title !== null ||
           formError.game_type !== null ||
           formError.game_min_players !== null ||
           formError.game_max_players !== null ||
           formError.game_min_age !== null ||
           formError.game_status !== null ||
           formError.game_min_duration !== null ||
           formError.game_max_duration !== null ||
           (formError.game_content !== null && formError.game_content !== '') ||
           (formError.game_tags !== null && formError.game_tags !== '')) {
          return (
            <StepLabel
              icon={<WarningIcon color={red500} />}
              style={{color: red500}}
            >Jeu</StepLabel>
          )
        } else {
          return (
            <StepLabel>Jeu</StepLabel>
          )
        }
        break;
      case 1:
        if(formError.pictures.length > 0) {
          return (
            <StepLabel
            icon={<WarningIcon color={red500} />}
            style={{color: red500}}
          >Photos</StepLabel>
          )
        } else {
          return(<StepLabel>Photos</StepLabel>);
        }
        break;
      case 2:
        if(formError.title !== null ||
           formError.description !== null ||
           formError.availibity !== null ||
           formError.min_reservation !== null ||
           formError.max_reservation !== null ||
           (formError.renting !== null && formError.renting !== '') ||
           (formError.caution !== null && formError.caution !== '')) {
             return(
             <StepLabel
               icon={<WarningIcon color={red500} />}
               style={{color: red500}}
             >Annonce</StepLabel>);
           } else {
            return(<StepLabel>Annonce</StepLabel>);
           }
           break;
    }
  }

  handleSubmit = (e) => {
      e.preventDefault();
      $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
      });

      $.ajax({
        method: "POST",
        url: '/announcements',
        dataType: "json",
        data: {
          announcement: {
            ...this.state.announcement,
            pictures_attributes: this.state.announcement.pictures_attributes.filter(function(){return true;})
          }
        },
      })
      .done((data) => {
        if(this.props.modifying) {
          this.setState({
            showSuccess: true,
          });
        } else {
          window.location.replace(`/announcements/${data.id}`);
        }
      })
      .fail((err) => {

        let pictures = [];
        for(let key in err.responseJSON) {
          if(!key.includes("pictures")) {
            err.responseJSON[key] = err.responseJSON[key].join(' | ');
          } else {
            if(key !== "pictures") {
              let index = key.match(/\d+/)[0];
              let reindexedArray = this.state.announcement.pictures_attributes.filter(function(){return true;});
              let realIndex = reindexedArray[index].image_file_name;
              let realkey = key.split('.')[1];
              if(realkey !== 'image') {
                if(pictures[realIndex]){
                  pictures[realIndex] += realkey + ' : ' + err.responseJSON[key] + ' ';
                } else {
                  pictures[realIndex] = realkey + ' : ' + err.responseJSON[key] + ' ';
                }
              }
            } else {
              pictures = [err.responseJSON[key]];
            }
          }
        }

        let tmp_game_players = '';
        if(err.responseJSON['game_min_players']) {
          tmp_game_players += 'player minimum : ' + err.responseJSON['game_min_players'];
        }
        if(err.responseJSON['game_max_players']) {
          if(tmp_game_players !== '') {
            tmp_game_players += ' |||| ';
          }
          tmp_game_players += 'player maximum : ' + err.responseJSON['game_max_players'];
        }

        let tmp_game_duration = '';
        if(err.responseJSON['game_min_duration']) {
          tmp_game_duration += 'durée minimum : ' + err.responseJSON['game_min_duration'];
        }
        if(err.responseJSON['game_max_duration']) {
          if(tmp_game_duration !== '') {
            tmp_game_duration += ' |||| ';
          }
          tmp_game_duration += 'durée maximum : ' + err.responseJSON['game_max_duration'];
        }

        this.setState({
          formError: {
            game_title: null,
            game_type: null,
            game_min_players: null,
            game_max_players: null,
            game_min_age: null,
            game_status: null,
            game_min_duration: null,
            game_max_duration: null,
            game_content: null,
            game_players: null,
            game_content: null,
            game_tags: null,
            game_duration: null,
            title: null,
            availibity: null,
            description: null,
            min_reservation: null,
            max_reservation: null,
            ...err.responseJSON,
            pictures,
            tmp_game_players,
            tmp_game_content: null,
            tmp_game_tags: null,
            tmp_game_duration,
          },
          servError: 'there is errors',
          showServError: true,
        });
      })

  }

  handleInputChange = (ev) => {
    let announcement = {...this.state.announcement};
    announcement[ev.target.name] = ev.target.value;
    this.setState({announcement});
  }

  handleGamePlayers = (ev) => {
    ev.stopPropagation();
    let originalInputTxt = ev.target.value;
    let announcement = {...this.state.announcement};
    announcement.tmp_game_players = originalInputTxt;
    if(originalInputTxt !== '') {
      let players = originalInputTxt.trim().split('à');
      announcement.game_min_players = parseInt(players[0]);
      announcement.game_max_players = parseInt(players[1]);
    }
    this.setState({announcement});
  }

  handleGameContent = (ev) => {
    ev.stopPropagation();
    let originalInputTxt = ev.target.value;
    let announcement = {...this.state.announcement};
    announcement.tmp_game_content = originalInputTxt;
    if(originalInputTxt !== '') {
      announcement.game_content = originalInputTxt.replace(/\s*,\s*/g, ",").split(',');
    }
    this.setState({announcement});
  }

  handleGameTags = (ev) => {
    ev.stopPropagation();
    let originalInputTxt = ev.target.value;
    let announcement = {...this.state.announcement};
    announcement.tmp_game_tags = originalInputTxt;
    if(originalInputTxt !== '') {
      announcement.game_tags = originalInputTxt.replace(/\s*,\s*/g, ",").split(',');
    }
    this.setState({announcement});
  }

  handleGameDuration = (ev) => {
    ev.stopPropagation();
    let originalInputTxt = ev.target.value;
    let announcement = {...this.state.announcement};
    announcement.tmp_game_duration = originalInputTxt;
    if(originalInputTxt !== '') {
      let durations = originalInputTxt.trim().split('à');
      announcement.game_min_duration = parseInt(durations[0]);
      announcement.game_max_duration = parseInt(durations[1]);
    }
    this.setState({announcement});
  }

  handleGameTypeChange = (e, index, newSelectVal) => {
    e.stopPropagation();
    let announcement = {...this.state.announcement};
    announcement.game_type = newSelectVal;
    this.setState({announcement});
  }

  handleGameStatusChange = (e, index, newSelectVal) => {
    e.stopPropagation();
    let announcement = {...this.state.announcement};
    announcement.game_status = newSelectVal;
    this.setState({announcement});
  }

  imageHandler = (name, image) => {
    let announcement = {...this.state.announcement};
    announcement.pictures_attributes[name] = {};
    announcement.pictures_attributes[name]['image'] = image;
    announcement.pictures_attributes[name]['image_file_name'] = name;
    this.setState({announcement});
  }

  handleNext = (e) => {
    const {stepIndex} = this.state;
    if(stepIndex === 2) {
      this.handleSubmit(e);
      return;
    }

    this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    this.setState({
        stepIndex: stepIndex - 1,
    });
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className="announcementStep__container">
            <div className="announcementStep__left">
              <h2 className="announcementStep__leftTitle">
                Présentez votre jeu en quelques<br></br>
                informations essentielles
              </h2>
              <div className="announcementStep__leftPictureContainer">
                <img className="announcementStep__leftPicture" src={this.props.stepPic[stepIndex]}/>
              </div>
            </div>
            <div className="announcementStep__right">
            <form
              className="announcementForm"
              onChange={this.handleInputChange}
            >
                <TextField
                  hintText="Monopoly Simpsons"
                  floatingLabelText="Nom du jeu"
                  type="text"
                  value={this.state.announcement.game_title}
                  name="game_title"
                  style={inputStyle}
                  errorText={this.state.formError.game_title}
                />
                <SelectField
                  value={this.state.announcement.game_type}
                  name="game_type"
                  onChange={this.handleGameTypeChange}
                  style={{
                    height: '72px',
                    width: '80%'
                  }}
                  iconStyle={{
                    height: '90px'
                  }}
                  labelStyle={{
                    lineHeight: '96px'
                  }}
                >
                  <MenuItem value={1} primaryText="Jeu de plateau" />
                  <MenuItem value={2} primaryText="Jeu de carte" />
                  <MenuItem value={3} primaryText="Jeu de dès" />
                  <MenuItem value={4} primaryText="Jeu en plein air" />
                </SelectField>
                <TextField
                  hintText="2 à 6"
                  floatingLabelText="Nombre de joueur"
                  type="text"
                  onChange={this.handleGamePlayers}
                  value={this.state.announcement.tmp_game_players}
                  name="tmp_game_players"
                  style={inputStyle}
                  errorText={this.state.formError.tmp_game_players}
                />
                <TextField
                  hintText="7"
                  floatingLabelText="Age minimum recommendé"
                  type="number"
                  min="1"
                  max="99"
                  value={this.state.announcement.game_min_age}
                  name="game_min_age"
                  style={inputStyle}
                  errorText={this.state.formError.game_min_age}
                />
                <SelectField
                  value={this.state.announcement.game_status}
                  name="game_status"
                  onChange={this.handleGameStatusChange}
                  style={{
                    height: '72px',
                    width: '80%'
                  }}
                  iconStyle={{
                    height: '90px'
                  }}
                  labelStyle={{
                    lineHeight: '96px'
                  }}
                >
                  <MenuItem value={1} primaryText="Neuf" />
                  <MenuItem value={2} primaryText="Très bon état" />
                  <MenuItem value={3} primaryText="Bon état" />
                  <MenuItem value={4} primaryText="Passable" />
                </SelectField>
                <TextField
                  hintText="30min à 90min"
                  floatingLabelText="Durée d'une partie (en minutes)"
                  type="text"
                  onChange={this.handleGameDuration}
                  value={this.state.announcement.tmp_game_duration}
                  name="tmp_game_duration"
                  style={inputStyle}
                  errorText={this.state.formError.tmp_game_duration}
                />
                <TextField
                  hintText="56 cartes, 4 dès, 1 plateau"
                  floatingLabelText="Contenu du jeu (séparez par des virgules)"
                  type="text"
                  value={this.state.announcement.tmp_game_content}
                  onChange={this.handleGameContent}
                  name="tmp_game_content"
                  style={inputStyle}
                  errorText={this.state.formError.game_content}
                />
                <TextField
                  hintText="hasard, réfléxion, gestion, stratégie"
                  floatingLabelText="Mots clés (séparez par des virgules)"
                  type="text"
                  onChange={this.handleGameTags}
                  value={this.state.announcement.tmp_game_tags}
                  name="game_tags"
                  style={inputStyle}
                  errorText={this.state.formError.game_tags}
                />
                <div className="announcementForm__control">
                  <FlatButton
                    label="Précédent"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Publier' : 'Suivant'}
                    primary={true}
                    onClick={this.handleNext}
                  />
                </div>
              </form>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="announcementStep__container">
            <div className="announcementStep__left">
              <h2 className="announcementStep__leftTitle">
                À votre appareil photo !<br></br>
                Uploadez une ou plusieurs images<br></br>
                de votre jeu<br></br>
              </h2>
              <div className="announcementStep__leftPictureContainer">
                <img className="announcementStep__leftPicture" src={this.props.stepPic[stepIndex]}/>
              </div>
            </div>
            <div className="announcementStep__right">
            <form
              className="announcementForm"
              onChange={this.handleInputChange}
            >
                <UploadInput
                  imageHandler={this.imageHandler}
                  uploadError={this.state.formError.pictures.hasOwnProperty(0) ? this.state.formError.pictures[0] : ''}
                  style={{width: '80%', height:'240px'}}
                  upload={this.state.announcement[0]}
                  imageUrl={this.state.announcement.pictures_attributes.hasOwnProperty(0) ? this.state.announcement.pictures_attributes[0]['image'] : ''}
                  name="0"
                />
                <div className="announcementForm__pictureLine">
                  <UploadInput
                    imageHandler={this.imageHandler}
                    uploadError={this.state.formError.pictures.hasOwnProperty(1) ? this.state.formError.pictures[1] : ''}
                    style={{width: '38%', height:'140px'}}
                    upload={this.state.announcement[1]}
                    imageUrl={this.state.announcement.pictures_attributes.hasOwnProperty(1) ? this.state.announcement.pictures_attributes[1]['image'] : ''}
                    name="1"
                  />
                  <UploadInput
                    imageHandler={this.imageHandler}
                    uploadError={this.state.formError.pictures.hasOwnProperty(2) ? this.state.formError.pictures[2] : ''}
                    style={{width: '38%', height:'140px'}}
                    upload={this.state.announcement[2]}
                    imageUrl={this.state.announcement.pictures_attributes.hasOwnProperty(2) ? this.state.announcement.pictures_attributes[2]['image'] : ''}
                    name="2"
                  />
                </div>
                <div className="announcementForm__pictureLine">
                  <UploadInput
                    imageHandler={this.imageHandler}
                    uploadError={this.state.formError.pictures.hasOwnProperty(3) ? this.state.formError.pictures[3] : ''}
                    style={{width: '38%', height:'140px'}}
                    upload={this.state.announcement[3]}
                    imageUrl={this.state.announcement.pictures_attributes.hasOwnProperty(3) ? this.state.announcement.pictures_attributes[3]['image'] : ''}
                    name="3"
                  />
                  <UploadInput
                    imageHandler={this.imageHandler}
                    uploadError={this.state.formError.pictures.hasOwnProperty(4) ? this.state.formError.pictures[4] : ''}
                    style={{width: '38%', height:'140px'}}
                    upload={this.state.announcement[4]}
                    imageUrl={this.state.announcement.pictures_attributes.hasOwnProperty(4) ? this.state.announcement.pictures_attributes[4]['image'] : ''}
                    name="4"
                  />
                </div>
                <div className="announcementForm__control">
                  <FlatButton
                    label="Précédent"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Publier' : 'Suivant'}
                    primary={true}
                    onClick={this.handleNext}
                  />
                </div>
              </form>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="announcementStep__container">
            <div className="announcementStep__left">
              <h2 className="announcementStep__leftTitle">
                C'est la dernière étape !<br></br>
                Personnalisez votre annonce pour qu'elle donne envie de jouer à votre jeu.
              </h2>
              <div className="announcementStep__leftPictureContainer">
                <img className="announcementStep__leftPicture" src={this.props.stepPic[stepIndex]}/>
              </div>
            </div>
            <div className="announcementStep__right">
              <form
                className="announcementForm"
                onChange={this.handleInputChange}
              >
                <TextField
                  hintText="1000 bornes : du fun pour toute la famille"
                  floatingLabelText="Titre"
                  type="text"
                  value={this.state.announcement.title}
                  name="title"
                  style={inputStyle}
                  errorText={this.state.formError.title}
                />
                <TextField
                  hintText="1000 bornes tintin complet, presque jamais utilisé. C'est une édition spéciale..."
                  floatingLabelText="Description"
                  value={this.state.announcement.description}
                  name="description"
                  multiLine={true}
                  rowsMax={2}
                  style={inputStyle}
                  errorText={this.state.formError.description}
                />
                <TextField
                  hintText="Je suis disponible tous les soirs en semaine entre 18h et 20h..."
                  floatingLabelText="Disponibilité"
                  value={this.state.announcement.availibity}
                  name="availibity"
                  multiLine={true}
                  rowsMax={2}
                  style={inputStyle}
                  errorText={this.state.formError.availibity}
                />
                <TextField
                  hintText="1"
                  floatingLabelText="Durée minimale de location (en jours)"
                  type="number"
                  min={1}
                  max={365}
                  value={this.state.announcement.min_reservation}
                  name="min_reservation"
                  style={inputStyle}
                  errorText={this.state.formError.min_reservation}
                />
                <TextField
                  hintText="1"
                  floatingLabelText="Durée maximale de location (en jours)"
                  type="number"
                  min={1}
                  max={365}
                  value={this.state.announcement.max_reservation}
                  name="max_reservation"
                  style={inputStyle}
                  errorText={this.state.formError.max_reservation}
                />
                <TextField
                  hintText="3,99"
                  floatingLabelText="Prix de la location par jour"
                  type="number"
                  min={1}
                  max={99999}
                  step={0.01}
                  value={this.state.announcement.renting}
                  name="renting"
                  style={inputStyle}
                  errorText={this.state.formError.renting}
                />
                <TextField
                  hintText="40,99"
                  floatingLabelText="Prix de la caution"
                  type="number"
                  min={1}
                  max={99999}
                  step={0.01}
                  value={this.state.announcement.caution}
                  name="caution"
                  style={inputStyle}
                  errorText={this.state.formError.caution}
                />
                <div className="announcementForm__control">
                  <FlatButton
                    label="Précédent"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Publier' : 'Suivant'}
                    primary={true}
                    onClick={this.handleNext}
                  />
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <MuiThemeProvider muiTheme={PartajouerTheme}>
        <div style={{
          width: '80%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          justifyContent: 'center',
        }}>
          <Stepper style={{marginTop: '20px'}} activeStep={stepIndex}>
            <Step onClick={() => { this.setState({stepIndex: 0}) }}>
              {this.hasStepError(0)}
            </Step>
            <Step onClick={() => { this.setState({stepIndex: 1}) }}>
              {this.hasStepError(1)}
            </Step>
            <Step onClick={() => { this.setState({stepIndex: 2}) }}>
              {this.hasStepError(2)}
            </Step>
          </Stepper>
          {this.getStepContent(stepIndex)}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AnnouncementForm;
