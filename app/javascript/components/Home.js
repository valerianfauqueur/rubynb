import React from "react"
import PropTypes from "prop-types"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AnnouncementCardGrid from './AnnouncementCardGrid';
import CategoryCard from './CategoryCard';
import * as $ from 'jquery';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.getAnnouncementCategory(1);
  }


  state = {
    category: 1,
    cardsData: [],
  }


  getAnnouncementCategory(category) {
    console.log(category);
    $.ajax({
      method: "GET",
      url: `/announcements?category=${category}&sort=-updated_at`,
      dataType: "json",
    })
    .done((data) => {
      this.setState({cardsData: data})
    })
    .fail((err) => {
    })
  }

  changeCategory(index) {
    if (this.refs.myRef)  {
      this.setState({
        category: index
      }, () => {
        this.getAnnouncementCategory(index);
      });
    }
  }

  render () {
    return (
      <section class="content">
        <section class="introduction">
          <div class="introduction__content">
            <h2 class="introduction__title">Partajouer</h2>
            <h3 class="introduction__desc">Réservez le jeu qui occupera votre<br></br> soirée dès maintenant.</h3>
            <div class="introduction__search">
              <input class="introduction__searchInput" type="text" placeholder="Essayez « 1000 bornes »"></input>
              <input class="introduction__searchBtn" type="button" value="Rechercher"></input>
            </div>
          </div>
        </section>

        <section class="category">
          <div class="category__header">
            <h2 class="category__title title">Catégories</h2>
          </div>
          <div class="category__cards">
              <CategoryCard categoryTitle={this.props.categoryTitle[0]} categoryImg={this.props.categoryImg[0]} index={1} clickHandler={this.changeCategory.bind(this)} />
              <CategoryCard categoryTitle={this.props.categoryTitle[1]} categoryImg={this.props.categoryImg[1]} index={2} clickHandler={this.changeCategory.bind(this)} />
              <CategoryCard categoryTitle={this.props.categoryTitle[2]} categoryImg={this.props.categoryImg[2]} index={3} clickHandler={this.changeCategory.bind(this)} />
              <CategoryCard categoryTitle={this.props.categoryTitle[3]} categoryImg={this.props.categoryImg[3]} index={4} clickHandler={this.changeCategory.bind(this)} />
          </div>
        </section>

        <section class="announcements">
          <section class="announcements__category">
            <div class="announcements__categoryHeader">
              <h2 class="announcements__categoryTitle title">Les dernières annonces</h2>
            </div>
            <AnnouncementCardGrid cardsData={this.state.cardsData} ref="myRef" category={this.state.category}/>
          </section>
        </section>
      </section>
    );
  }
}

export default Home
