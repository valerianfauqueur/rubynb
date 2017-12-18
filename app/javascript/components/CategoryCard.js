import React from "react"
import PropTypes from "prop-types"

class CategoryCard extends React.Component {

  click() {
    this.props.clickHandler(this.props.index);
  }

  render () {
    return (
      <div className="category__card" data-category={this.props.category} onClick={this.click.bind(this)}>
        <div className="category__cardLeft">
          <img className="category__cardIcon" src={this.props.categoryImg} />
        </div>
        <div className="category__cardRight">
          <h4 className="cateogory__cardTitle">{this.props.categoryTitle}</h4>
        </div>
      </div>
    )
  }
}

CategoryCard.propTypes = {
  categoryTitle: PropTypes.string,
  categoryImg: PropTypes.string
};

export default CategoryCard
