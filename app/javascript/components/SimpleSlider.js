import React from "react"
import Slider from "react-slick"


class SimpleSlider extends React.Component {

  settings = {
    infinite: false,
    speed: 500,
    cssEase: 'linear',
    dots: true,
  };
  render() {
    return (
      <Slider {...this.settings}>
        {this.props.images.length > 0 && this.props.images.map(function(image, i){
          return(
            <div key={i} style={{
              height: '100%',
              backgroundImage:`url(/images/products/${image.announcement_id}/medium/${image.image_file_name})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}></div>
          );
        })}
      </Slider>
    )
  }
}

export default SimpleSlider
