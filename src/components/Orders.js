import React from 'react';
import Table from './Table'



const Orders = (props) => {

    const tables = props.tables.map((table, i)=>{
        return (
            <Table 
                checkOut={props.checkOut}
                removeOrder={props.removeOrder}
                orders={props.orders.filter((order)=>order.table === table)}
                switchTable={props.switchTable}
                active={props.active}
                key={i} 
                name={table}/>
        )
    });

    return (
        <div className="orders">
            {tables}
        </div>
    );
};



export default Orders;

