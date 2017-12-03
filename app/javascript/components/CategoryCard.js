import React from "react"
import PropTypes from "prop-types"
class CategoryCard extends React.Component {
  render () {
    return (
      <div className="category__card">
        <div className="category__cardLeft">
          <div className="category__cardIcon">H</div>
        </div>
        <div className="category__cardRight">
          <h4 className="cateogory__cardTitle">Jeux de cartes</h4>
        </div>
      </div>
    )
  }
}

export default CategoryCard
