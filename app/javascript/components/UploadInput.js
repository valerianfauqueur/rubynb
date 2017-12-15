import React from "react"
import PropTypes from "prop-types"

const initialState = {
  upload: '',
  imageUrl: '',
}

class UploadInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  deleteFile = (e) => {
    this.setState({
       upload: '',
       imageUrl: '',
    }, () => {
      var event = new Event('change', { bubbles: true });
      this.myinput.dispatchEvent(event);
    });
  }

  handleImageChange = (ev) => {
    ev.preventDefault();
    ev.persist();
    this.setState({ upload: ev.target.value });

    let reader = new FileReader();
    let file = ev.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result
      });
      this.props.imageHandler(ev.target.name, reader.result);
    }

    reader.readAsDataURL(file);
  }

  render () {
    return (
      <div className="upload__container">
        <h2>Ajoutez une image de profil</h2>
        <div className="upload__inputContainer" style={this.props.style}>
          <input onChange={this.handleImageChange} className="upload__input" type="file" name={this.props.name} value={this.state.upload} ref={(input)=> this.myinput = input}></input>
          <svg className={"upload__inputUploadIcon " + (this.state.upload ? 'upload__inputUploadIcon--hide' : '')} width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Upload" fill="#000000" fill-rule="nonzero">
                      <g id="noun_1014303_cc" transform="translate(0.000000, 3.000000)">
                          <g id="Group">
                              <path d="M30.4711111,20.8634146 C29.6888889,20.8634146 29.0488889,21.4780488 29.0488889,22.2292683 L29.0488889,24.0390244 C29.0488889,24.6878049 28.5155556,25.1658537 27.84,25.1658537 L4.19555556,25.1658537 C3.55555556,25.1658537 2.98666667,24.6536585 2.98666667,24.0390244 L2.98666667,22.2292683 C2.98666667,21.4780488 2.34666667,20.8634146 1.56444444,20.8634146 C0.782222222,20.8634146 0.142222222,21.4780488 0.142222222,22.2292683 L0.142222222,24.0390244 C0.142222222,26.1560976 1.95555556,27.897561 4.19555556,27.897561 L27.84,27.897561 C30.08,27.897561 31.8933333,26.1560976 31.8933333,24.0390244 L31.8933333,22.2292683 C31.8933333,21.4780488 31.2533333,20.8634146 30.4711111,20.8634146 Z" id="Shape"></path>
                              <path d="M10.1333333,7.78536585 L14.2222222,4.43902439 L14.2222222,19.9756098 L14.2222222,20.0097561 C14.2933333,20.7268293 14.9333333,21.3414634 15.68,21.3414634 C16.4622222,21.3414634 17.1022222,20.7268293 17.1022222,19.9756098 L17.1022222,4.43902439 L21.2266667,7.8195122 C21.5111111,8.02439024 21.7955556,8.12682927 22.1155556,8.12682927 C22.5422222,8.12682927 22.9333333,7.95609756 23.1822222,7.64878049 C23.4311111,7.37560976 23.5733333,7.03414634 23.5377778,6.65853659 C23.5022222,6.28292683 23.3244444,5.94146341 23.04,5.73658537 L16.64,0.443902439 L16.4622222,0.273170732 L16.3911111,0.273170732 L16.32,0.204878049 L16.2133333,0.204878049 C16.1777778,0.204878049 16.1777778,0.204878049 16.1422222,0.170731707 C16.0711111,0.136585366 16,0.136585366 15.8933333,0.136585366 C15.7511111,0.102439024 15.5733333,0.102439024 15.4311111,0.136585366 C15.36,0.136585366 15.2888889,0.136585366 15.2177778,0.170731707 C15.1111111,0.170731707 15.04,0.204878049 14.9688889,0.23902439 L14.9333333,0.23902439 L14.7911111,0.375609756 L8.28444444,5.73658537 C7.71555556,6.24878049 7.64444444,7.10243902 8.14222222,7.64878049 C8.67555556,8.19512195 9.56444444,8.26341463 10.1333333,7.78536585 Z" id="Shape"></path>
                          </g>
                      </g>
                  </g>
              </g>
          </svg>
          <img class={"upload__inputPreview " + (this.state.upload ? 'upload__inputPreview--show' : '')} src={this.state.imageUrl} />
          <div className={"upload__inputHover " + (this.state.upload ? 'hasfile' : '')} style={this.state.upload ? {} : {pointerEvents: 'none'}}>
            <svg onClick={this.deleteFile} className="upload__inputDeleteIcon" width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Trash" fill="#FFFFFF" fill-rule="nonzero">
                        <g id="noun_1150415_cc" transform="translate(5.000000, 0.000000)">
                            <path d="M9.06474508,28.2743368 C9.06974218,28.2743368 9.07473928,28.2743368 9.07973638,28.2743368 C9.53980301,28.2661553 9.90559096,27.8778737 9.89792874,27.4074358 L9.56478853,8.0506232 C9.55679316,7.58018536 9.18734067,7.2028124 8.71727984,7.21338021 C8.25721321,7.22156173 7.89142526,7.6098434 7.89908749,8.08028124 L8.23222769,27.4370939 C8.2405562,27.9027591 8.61167439,28.2743368 9.06474508,28.2743368 Z M13.9369206,28.2743368 C14.3899913,28.2743368 14.7614426,27.9027591 14.769438,27.4370939 L15.1025782,8.08028124 C15.1102404,7.6098434 14.7444525,7.22156173 14.2843859,7.21338021 C13.8289832,7.2024715 13.4452057,7.58018536 13.4368772,8.0506232 L13.103737,27.4074358 C13.0960747,27.8778737 13.4618627,28.2661553 13.9219293,28.2743368 C13.9269264,28.2743368 13.9322567,28.2743368 13.9369206,28.2743368 Z M20.4874565,7.21338021 C20.0183951,7.2028124 19.6429461,7.56723128 19.6279548,8.03766912 L19.50969,11.7946948 C19.4950319,12.2651326 19.8554896,12.6588686 20.3152231,12.6738681 C20.324551,12.674209 20.3338789,12.674209 20.3428737,12.674209 C20.790281,12.674209 21.1600666,12.3104719 21.1747248,11.8495792 L21.2929896,8.09255353 C21.3073146,7.62211569 20.9468569,7.22872057 20.4874565,7.21338021 Z M20.2645857,14.2876744 C19.8061848,14.2754022 19.4207416,14.6415255 19.4054171,15.1119634 L18.9613413,29.2482795 C18.9613413,29.8260999 18.5029403,30.295856 17.9396002,30.295856 L5.06373117,30.295856 C4.49939166,30.295856 4.03999131,29.8260999 4.03965817,29.2206669 L3.37337775,8.03732822 C3.35838644,7.56689038 2.96461472,7.20008522 2.51420915,7.21303931 C2.05447567,7.22803878 1.69368482,7.62177479 1.70834299,8.09221263 L2.37429027,29.2479386 C2.37429027,30.765612 3.5809241,32 5.06373117,32 L17.9392671,32 C19.4210747,32 20.6267092,30.7652711 20.626376,29.2752104 L21.0701188,15.166166 C21.0847769,14.6964099 20.7239861,14.3030148 20.2645857,14.2876744 Z M22.1671495,3.80441035 L0.832850521,3.80441035 C0.372783893,3.80441035 0,4.18587408 0,4.65665282 C0,5.12743155 0.372783893,5.50889528 0.832850521,5.50889528 L22.1671495,5.50889528 C22.6272161,5.50889528 23,5.12743155 23,4.65665282 C23,4.18587408 22.626883,3.80441035 22.1671495,3.80441035 Z M6.32599942,3.06807287 C6.78606605,3.06807287 7.15884994,2.68660914 7.15884994,2.2158304 C7.15884994,1.9339086 7.3830533,1.70448493 7.65856025,1.70448493 L15.3417729,1.70448493 C15.6172798,1.70448493 15.8414832,1.9339086 15.8414832,2.2158304 C15.8414832,2.68660914 16.2142671,3.06807287 16.6743337,3.06807287 C17.1344003,3.06807287 17.5071842,2.68660914 17.5071842,2.2158304 C17.5071842,0.994055609 16.5357474,0 15.3417729,0 L7.65856025,0 C6.46458575,0 5.4931489,0.994055609 5.4931489,2.2158304 C5.4931489,2.68660914 5.86593279,3.06807287 6.32599942,3.06807287 Z" id="Shape"></path>
                        </g>
                    </g>
                </g>
            </svg>
          </div>
        </div>
        <div class={"upload__inputErrors " + (this.props.uploadError !== '' ? "upload__inputErrors--show" : "")}>{this.props.uploadError}</div>
      </div>
    );
  }
}


export default UploadInput