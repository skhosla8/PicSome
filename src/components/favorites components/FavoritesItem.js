import React, { useContext } from 'react';
import { Context } from '../../contexts/Context';

function FavoritesItem({ item, alt }) {
    const { removeFromFavorites, addToCart } = useContext(Context);
    return (
        <div className="favorites__grid__item">
            <div>
                <img src={item.url} alt={alt}></img>
                <i className="ri-heart-fill ri-2x" onClick={() => removeFromFavorites(item)}></i>
            </div>
            <p>{item.id}</p>
            <p>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
    )
}

export default FavoritesItem;