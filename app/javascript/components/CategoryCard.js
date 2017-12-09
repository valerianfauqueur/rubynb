import React from "react"
import PropTypes from "prop-types"
class CategoryCard extends React.Component {
  render () {
    return (
      <div className="category__card">
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
