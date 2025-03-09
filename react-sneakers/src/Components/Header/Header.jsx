import heart from '../../img/icons/heart.svg'
import heartHover from '../../img/icons/heartHover.svg'
import shop from '../../img/icons/shop.svg'
import shopHover from '../../img/icons/shopHover.svg'
import user from '../../img/icons/user.svg'
import userHover from '../../img/icons/userHover.svg'
import logo from '../../img/logo/logo.png'
import cls from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return ( 
        <header className={cls.headerContainer}>
        <div className={cls.header}>
          <Link to="/" className={cls.headerLeft}>
            
            <div className={cls.headerLogoImg}><img src={logo} alt="logo" /></div>
            <div className={cls.headerLogoDescription}>
              <div>REACT SNEAKERS</div>
              <div>Магазин лучших кроссовок</div>
            </div>
            
          </Link>
          <div className={cls.headerRight}>
            <div className={cls.shopBox}><button className={cls.headerRightButton} onClick={()=>{props.setCartOpen(true)}}><img src={shop}   alt="shop" /><img src={shopHover} className={cls.iconHover} alt="shop" /></button><span className={cls.shopDescription}>{props.totalPrice}$</span></div>
            <button className={cls.headerRightButton}><Link to='/likes'><img src={heart} alt="heart"  /><img src={heartHover} className={cls.iconHover} alt="heart" /></Link></button>
            <button className={cls.headerRightButton}><Link to='/orders'><img src={user} alt="user"  /><img src={userHover} className={cls.iconHover} alt="userHover" /></Link></button>
          </div>
        </div>
      </header>
     );
}
 
export default Header;