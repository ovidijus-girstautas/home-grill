import React from 'react';

const Menu = (props) => {

    const categories = props.categories.map((cat)=>{
        return (
            <div 
                key={cat.name}
                onClick={() => props.switchCategory(cat.name)}
                className={cat.name===props.activeCategory ? 'category active-cat' : 'category'}>
                <img src={cat.url} alt=""/>
                <h3>{cat.name}</h3>
            </div>
        )
    });

    let items;
   if(props.menu){
       items = props.menu.map((item, i) => {
           return <li onClick={()=>props.addOrder(item)} key={i}>{item.name}<span>{item.price} €</span></li>;
       })
   }

    return (
    <div className="menu">
            <div className="categories">
                {categories}
        </div>
        <ul className="menu-items">
            {items}
        </ul>
            {props.menu ? null : <div className="loader" />}
    </div>
    )
};

export default Menu;
