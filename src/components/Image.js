import React, { useContext } from 'react';
import { Context } from '../contexts/Context';
import useHover from '../hooks/useHover';

function Image({ photo, className, alt }) {
    const [hovered, ref] = useHover();

    const { cartItems, favorites, addToFavorites, removeFromFavorites, addToCart, removeFromCart } = useContext(Context);

    const alreadyInCart = cartItems.some(item => item.id === photo.id);

    const alreadyInFavorites = favorites.some(item => item.id === photo.id);

    const addOverlay = hovered || alreadyInFavorites || alreadyInCart ? <div data-test="image-overlay" className='overlay'></div> : undefined;

    const heartIcon = () => {
        if (alreadyInFavorites) {
            return <i data-test="heart-icon-fill" className="ri-heart-fill favorite" onClick={() => removeFromFavorites(photo)}></i>
        } else if (hovered) {
            return <i data-test="heart-icon-line" className="ri-heart-line favorite" onClick={() => addToFavorites(photo)}></i>
        }
    }

    const cartIcon = () => {
        if (alreadyInCart) {
            return <i data-test="cart-icon-fill" className="ri-shopping-cart-fill cart" onClick={() => removeFromCart(photo)}></i>
        } else if (hovered) {
            return <i data-test="add-icon-line" className="ri-add-circle-line cart" onClick={() => addToCart(photo)}></i>
        }
    }

    return (
        <div data-test="image-container" className={`${className} photo-container`} ref={ref}>
            {addOverlay}
            <img src={photo.url} className='photo' alt={alt} />
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}

export default Image;