import React from 'react';
import _ from 'lodash';
import './App.css';
import './sass/main.scss';
import Header from "./components/Header";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import Settings from "./components/Settings";
import Stats from "./components/Stats";
import imgDrinks from './images/drinks.png';
import imgDishes from './images/main_dish.png';
import imgDeserts from './images/cake.png';
import imgSpecial from './images/special.png';
import axios from 'axios';
const API = 'https://enigmatic-cliffs-25405.herokuapp.com/menu';



class App extends React.Component {

  state={
    tabs: ['Orders', 'Statistics', 'Settings'],
    activeTab: 'Orders',
    categories: [
      {name: 'drinks', url: imgDrinks},
      {name: 'dishes', url: imgDishes},
      {name: 'deserts', url: imgDeserts},
      {name: 'special', url: imgSpecial}
    ],
    activeCategory: 'drinks',
    menu: '',
    tables: ['North Table', 'At the window', 'Close to WC', 'Two person table'],
    activeTable: 'North Table',
    orders: [],
    total: 0
  };

  checkOut = (table, amount) =>{
    const orders = this.state.orders.filter(order => order.table !== table)
    // this.setState({orders,total: this.state.total + total})
    this.setState((prevState)=>{
      return {orders:orders, total:prevState.total + amount}
    })
  };

  removeOrder = (id) =>{
    const orders = this.state.orders.filter(order => order.id !== id)
    this.setState({
      orders
    })
  };

  componentDidMount(){
    axios.get(API)
      .then((response)=>{
        console.log(response);
        this.setState({menu:response.data.menu})
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Naujas uzsakymas
  addOrder = (item) => {
    const orders = [...this.state.orders, 
      {
        name: item.name, 
        price: item.price, 
        table: this.state.activeTable,
        id: _.uniqueId()
      }]
    this.setState({
      orders
    })
    console.log(item)
  };

  //metodas keisti tab
  switchTab = activeTab => this.setState({activeTab});
  switchCategory = activeCategory => this.setState({ activeCategory });

  renderContent = () => {

    switch (this.state.activeTab) {
      case 'Orders': 
        return <Orders 
          checkOut={this.checkOut}
          removeOrder={this.removeOrder}
          orders={this.state.orders}
          switchTable={this.switchTable}
          active={this.state.activeTable}
          tables={this.state.tables}/>;    
      case 'Statistics': 
      return <Stats 
          total={this.state.total}/>;
      case 'Settings': return <Settings />
      default : return null
    }
  };

  switchTable = (name) =>{
    this.setState({
      activeTable: name
    })
  };

  render() {

    return (

      <div className="App">
        <Header 
        switchTab={this.switchTab}
        tabs={this.state.tabs}/>
        {this.renderContent()}
        <Menu 
        addOrder={this.addOrder}
        menu={this.state.menu[this.state.activeCategory]}
        switchCategory={this.switchCategory}
        activeCategory={this.state.activeCategory}
        categories={this.state.categories}/>
      </div>

    );
  }
}

export default App;

