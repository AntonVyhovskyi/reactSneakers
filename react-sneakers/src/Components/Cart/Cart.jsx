import CardInCart from '../Card/CardInCart';
import cls from './Cart.module.scss';
import close from '../../img/icons/close.svg';
import noInCartImg from '../../img/icons/package-icon.png'
import orderSucess from '../../img/icons/order-success-icon.png'


const Cart = (props) => {
    const tax = props.totalPrice * 0.05
    const fixedTax = tax.toFixed(2)
    console.log(props.sneakers);
    return (
        <div className={`${cls.background} ${props.cartOpen ? cls.cartOpen : cls.cartClose}`}>
            <div className={cls.cart}>
                <div className={cls.box}>
                    <div className={cls.title}>
                        <h2>Cart</h2>
                        <button onClick={() => { props.setCartOpen(false); props.updateOrderIsProcessed(false)  }}>
                            <img src={close} alt="close" />
                        </button>
                    </div>

                    {props.orderIsProcessed ? <div className={cls.noInCart}>
                        <div className={cls.noInCartImg}><img src={orderSucess} alt="order succes" /></div>
                        <div className={cls.noInCartDescription}>Order Sucess</div>
                        <button className={cls.noInCartButton} onClick={() => { props.setCartOpen(false); props.updateOrderIsProcessed(false) }}>back to the store</button>
                    </div> : (<>
                        {props.sneakers.length > 0 ? <>  <div className={cls.inCart}>
                            {!props.preloaderInCart ? (
                                props.sneakers.map((e) => (
                                    <CardInCart
                                        name={e.name}
                                        price={e.price}
                                        urlPhoto={e.urlPhoto}
                                        deleteFromCart={props.deleteFromCart}
                                        id={e.id}
                                        key={e.id}

                                    />
                                ))
                            ) : (
                                <span>preloader</span>
                            )}

                        </div>
                            <div>
                                <div className={cls.price}>
                                    <span>Total</span>
                                    <span></span>
                                    <span>{props.totalPrice}$</span>
                                </div>
                                <div className={cls.price}>
                                    <span>Tax 5%</span>
                                    <span></span>
                                    <span>{fixedTax}$</span>
                                </div>
                                <div className={cls.button}>
                                    <button onClick={() => { props.updateOrderIsProcessed(true) }}>Place an order</button>
                                </div>
                            </div> </> : <>
                            <div className={cls.noInCart}>
                                <div className={cls.noInCartImg}><img src={noInCartImg} alt="no in cart" /></div>
                                <button className={cls.noInCartButton} onClick={() => { props.setCartOpen(false) }}>back to the store</button>
                            </div>
                        </>}

                    </>)}

                </div>
            </div>
        </div>
    );
}

export default Cart;
