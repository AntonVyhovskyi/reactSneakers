import AllSneakers from "../AllSneakers/AllSneakers";
import cls from './Orders.module.scss';
const Orders = (props) => {
    console.log(props.orders);
    return ( <>
    <div className={cls.title}><h2 >Orders</h2></div>
    
    
    {props.orders.map((e)=>(
        <AllSneakers  deleteFromFavorites={props.deleteFromFavorites}
        key={e.id}
        addInFavorite={props.addInFavorite}
        favorites={props.favorites}
        sneakers={e.items}
        addSneakersInCart={props.addSneakersInCart}
        siLoading={props.siLoading}
        title={`order with id: ${e.id}`} 
        filter={false}
        />
        ))}
    
    </> );
}
 
export default Orders;