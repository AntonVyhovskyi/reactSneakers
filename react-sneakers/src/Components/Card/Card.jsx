import cls from './Card.module.scss';
import unlike from '../../img/icons/like-1.svg'
import like from '../../img/icons/like-2.svg'
import checked from '../../img/icons/checked.svg'

import plus from '../../img/icons/plus.svg'
import { useState } from 'react';

const Card = (props) => {

   
    const [isAdded, setIsAdded] = useState(false)

    const hundlerIsAdded = () => {
        setIsAdded(true)
        props.addSneakersInCart(props.id)

        setTimeout(() => {
            setIsAdded(false)
        }, 500)

    }

    const hundlerLike = () => {
        props.addInFavorite(props.id)
    }

    const hundlerUnLike = () => {
        props.deleteFromFavorites(props.id)
    }

    return (
        <div className={cls.box}>
            <div className={cls.fotoContainer}>
                {props.filter && <div className={cls.like}>
                    {props.favorite ? <img src={like} alt="now like" onClick={hundlerUnLike} /> : <img src={unlike} alt="now unlike" onClick={hundlerLike}/>}
                    
                </div>}

                <img className={cls.foto} src={props.urlPhoto} alt="foto sneakers" />
            </div>
            <div className={cls.name}>
                <h3>Men's shoes</h3>
                <h3>{props.name}</h3>
            </div>
            <div className={cls.botton}>
                <div className={cls.price}>
                    <span>Price:</span>
                    <span><b>{props.price} $</b></span>
                </div>
                {props.filter && <div className={cls.buttonPlus}>
                    {isAdded && <img src={checked} alt="checked" className={cls.isAdd}
                    />}
                    

                    <img src={plus} alt="plus" onClick={hundlerIsAdded}  />
                    

                </div>}
            </div>
        </div>
    );
}

export default Card;

