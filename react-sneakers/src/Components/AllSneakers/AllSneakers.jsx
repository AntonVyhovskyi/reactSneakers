import cls from './AllSneakers.module.scss';
import search from '../../img/icons/search.svg'
import Card from '../Card/Card';
import { useState } from 'react';
import close from '../../img/icons/close.svg'
import ContentLoader from "react-content-loader"




const AllSneakers = (props) => {
    const [searchText, setSearchText] = useState('')

    function hundlerSearchText(e) {
        setSearchText(e.target.value)
    }

    return (
        <div className={cls.container}>
            <div className={cls.header} >
                <h2>{searchText ? `search by request: ${searchText}` : props.title}</h2>
                 {props.filter && <div className={cls.searchBox}>
                    <img src={search} alt="search" />
                    <input value={searchText} type="text" placeholder='search...' onChange={hundlerSearchText} />
                    {searchText && <img src={close} alt="close" onClick={() => setSearchText('')} className={cls.closeInInput} />}
                </div>}
            </div>
            <div className={cls.main}>

                {props.siLoading && [...Array(12)].map((_, index) => (
                    <ContentLoader 
                    key={index}
                    speed={0.2}
                    width={250}
                    height={313}
                    viewBox="0 0 250 313"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...props}
                  >
                    <circle cx="571" cy="238" r="20" /> 
                    <rect x="15" y="12" rx="0" ry="0" width="218" height="183" /> 
                    <rect x="17" y="204" rx="0" ry="0" width="184" height="19" /> 
                    <rect x="19" y="234" rx="0" ry="0" width="97" height="30" /> 
                    <rect x="194" y="236" rx="0" ry="0" width="36" height="29" />
                  </ContentLoader>
                ))}
                {props.sneakers.filter((e) => e.name.toLowerCase().includes(searchText.toLowerCase())).map((e) => {

                    const isFavorite = Boolean(props.favorites.find((f) => f.id === e.id))



                    return <Card
                        deleteFromFavorites={props.deleteFromFavorites}
                        addInFavorite={props.addInFavorite}
                        name={e.name}
                        price={e.price}
                        urlPhoto={e.urlPhoto}
                        inCart={e.inCart}
                        addSneakersInCart={props.addSneakersInCart}
                        id={e.id}
                        key={e.id}
                        favorite={isFavorite}
                        filter={props.filter}
                    />
                })
                }
            </div>
        </div>
    );
}

export default AllSneakers;