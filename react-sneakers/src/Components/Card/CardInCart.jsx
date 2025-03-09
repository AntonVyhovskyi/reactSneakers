import cls from './CardInCart.module.scss';
import closeDelete from '../../img/icons/close.svg'


const CardInCart = (props) => {

    const deleteHundler = () => {
        props.deleteFromCart(props.id)
    }

    return (
        <div className={cls.cardInCart}>
            <div className={cls.foto}>
                <img src={props.urlPhoto} alt="sneaker" />
            </div>
            <div className={cls.description}>
                <div>
                    <h3>Мужские Кроссовки</h3>
                    <h3>{props.name}</h3>
                </div>
                <b>{props.price} $</b>
            </div>
            <div className={cls.delete}>
                <img src={closeDelete} alt="delete" onClick={deleteHundler} />
            </div>
        </div>
    );
}

export default CardInCart;