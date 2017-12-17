import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import PartajouerTheme from '../PartajouerTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import * as $ from 'jquery';

class ReservationCard extends React.Component {

  constructor(props) {
    super(props);
    this.today = new Date().toISOString().slice(0,10)
    this.state = {};
    this.state.reservation = {
      start_date: new Date(this.today),
      end_date: new Date(this.today),
    };
    this.state.diffDays = 0;
    this.state.formError = {
      start_date: '',
      end_date: '',
    };
  }

  getNormalizedPrice(price, withCurrency = true) {
    if(price !== 0) {
     return withCurrency ? (price/100) + ' €' : (price/100);
   } else {
     return withCurrency ? price + ' €' : price;
   }
  }

  handleStartDateChange = (ev, date) => {
    let reservation = {...this.state.reservation};
    reservation.start_date = date;
    this.setState({
      reservation,
      diffDays: this.dateDiffInDays(date, this.state.reservation.end_date)
    });
  }

  handleEndDateChange = (ev, date) => {
    let reservation = {...this.state.reservation};
    reservation.end_date = date;
    this.setState({
      reservation,
      diffDays: this.dateDiffInDays(this.state.reservation.start_date, date)
    });
  }

  _MS_PER_DAY = 1000 * 60 * 60 * 24;

  dateDiffInDays(a, b) {
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    $.ajaxSetup({
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });

    $.ajax({
      method: "POST",
      url: '/reservations',
      dataType: "json",
      data: {
        reservation: { ...this.state.reservation },
        announcement_id: this.props.announcement_id,
        authenticity_token: $('meta[name="csrf-token"]').attr('content'),
      },
    })
    .done((data) => {
      console.log(data);
    })
    .fail((err) => {
      console.log(err);
      this.setState({
        formError: {
          ...err.responseJSON
        }
      });
    })
  }


  render() {
    return (
      <MuiThemeProvider muiTheme={PartajouerTheme}>
        <div class = "container_reservation" >
          <div class="reservation_header">
            <div class="reservation_information">
              <div class="reservation_price">
                <div class="reservation_priceNumber">
                  {this.getNormalizedPrice(this.props.renting)}
                  <span class="reservation_priceFrequency"> par jour</span>
                </div>
              </div>
              <div class="reservation_score">
                <h3>NOTES</h3>
                <div class="reservation_scoreInformations">
                  <div class="reservation_score"></div>
                  <div class="reservation_scoreInformationsVote"></div>
                </div>
              </div>
            </div>
            <div class="reservation_author">
              <img class="reservation_placeholder" src={`/images/profile/${this.props.user.id}/thumb/${this.props.user.avatar_file_name}`} alt=""/>
              <div class="reservation_authorSubtitle">{this.props.user.first_name} {this.props.user.last_name.charAt(0)}.</div>
            </div>
          </div>
            <div class="reservation_start">
              <h3>DEBUT DE LA LOCATION</h3>
              <DatePicker
                hintText="Choissisez une date de départ"
                okLabel="OK"
                cancelLabel="Annuler"
                mode="landscape"
                style={{width:'100%', marginTop: '12px'}}
                onChange={this.handleStartDateChange}
                errorText={this.state.formError.start_date}
                value={this.state.reservation.start_date}
              />
            </div>
            <div class="reservation_end">
              <h3>FIN DE LA LOCATION</h3>
              <DatePicker
                hintText="Choissisez une date de fin"
                okLabel="OK"
                cancelLabel="Annuler"
                mode="landscape"
                style={{width:'100%', marginTop: '12px'}}
                errorText={this.state.formError.end_date}
                onChange={this.handleEndDateChange}
                value={this.state.reservation.end_date}
              />
            </div>
            <div class="reservation_summary">
            <h3>RECAPITULATIF</h3>
              <div class="reservation_summaryLine">
                <div class="reservation_summaryLineLabel">{this.getNormalizedPrice(this.props.renting)} x {this.state.diffDays} jours</div>
                <div class="reservation_summaryLinePrice">{this.getNormalizedPrice(this.props.renting * this.state.diffDays)}</div>
              </div>
              <div class="reservation_summaryLine">
                <div class="reservation_summaryLineLabel">Caution</div>
                <div class="reservation_summaryLinePrice">{this.getNormalizedPrice(this.props.caution)}</div>
              </div>
              <div class="reservation_summaryLine reservation_summaryLine--blueColor">
                <div class="reservation_summaryLineLabel">Total</div>
                <div class="reservation_summaryLinePrice">{this.getNormalizedPrice(this.props.caution + (this.props.renting * this.state.diffDays))}</div>
              </div>
            </div>
            <div class="reservation_button">
              <RaisedButton
                className="form__input"
                label="Je réserve"
                primary={true}
                onClick={this.handleSubmit}
                style={{width:'100%'}}
              />
            </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ReservationCard;
