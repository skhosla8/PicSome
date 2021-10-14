import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../contexts/Context';
import FavoritesItem from './FavoritesItem';

function Favorites() {
    const { favorites } = useContext(Context);

    const favoritesPageElements = favorites.map(item =>
        <FavoritesItem
            key={item.id}
            item={item}
            alt={`photo-${item.id}`}
        />
    );

    return (
        <div className="favorites">
            <h1>My Favorites</h1>
            {favorites.length > 0 &&
                <div className="favorites__message">
                    <div className="favorites__message__icon">
                        <i className="ri-heart-fill ri-2x"></i>
                    </div>
                    <div className="favorites__message__text">
                        <h2>Be sure to <Link to="">sign in</Link> to save these favorites to your account.</h2>
                        <p>Don't have an account? <Link to="">Sign up here</Link> for member perks,
                            points on every purchase and so much more!
                        </p>
                    </div>
                </div>
            }
            {favorites.length > 0 &&
                <div className="favorites__grid">
                    {favoritesPageElements}
                </div>
            }
            {favorites.length === 0 &&
                <p className="alert">You have no favorited items.</p>
            }
        </div>
    )
}

export default Favorites;