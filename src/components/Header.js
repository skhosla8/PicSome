import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../contexts/Context';
import Navbar from './navbar components/Navbar';
import FlagIcon from '../utils/FlagIcon';

function Header() {
    const { cartItems, favorites, totalQuantity, setTotalQuantity, selectedFlag, updateTotalQuantity } = useContext(Context);

    useEffect(() => {
        setTotalQuantity(cartItems.length);
        updateTotalQuantity();
    }, [cartItems, totalQuantity, setTotalQuantity, updateTotalQuantity]);

    const cartIconClassName = cartItems.length > 0 ? 'ri-shopping-cart-fill' : 'ri-shopping-cart-line';

    const cartStackClassName = cartItems.length > 0 ? undefined : 'hidden';

    const displayCartCount =
        <span className={`${cartStackClassName} fa-stack`}>
            <i className="fas fa-circle fa-stack-2x"></i>
            <strong data-test="cart-count" className="cart-count fa-stack-1x">{totalQuantity}</strong>
        </span>

    return (
        <div data-test="component-header" className="header">
            <div className="header-banner">
                <p>20% OFF ALL IMAGES FOR A LIMITED TIME</p>
            </div>

            <div className="div1">
                <div className="group-left">
                    <Link to='/'>
                        <div className="logo">
                            <i className="ri-phone-camera-fill ri-2x"></i>
                            <span><h2>Pic Some</h2></span>
                        </div>
                    </Link>
                    <div className="search">
                        <i className="ri-search-line ri-1x"></i>
                        <input type="search" placeholder="Search photos" />
                    </div>
                </div>

                <div className="group-right">
                    <Link to='/context-chooser'>
                        <FlagIcon code={selectedFlag} className="flag-icon"></FlagIcon>
                    </Link>
                    <Link to='/favorites'>
                        <div>
                            {favorites.length > 0 ?
                                <i data-test="heart-icon-fill" className="heart-icon heart-icon--red ri-heart-fill ri-2x"></i> :
                                <i data-test="heart-icon-line" className="heart-icon ri-heart-line ri-2x"></i>
                            }
                        </div>
                    </Link>
                    <Link to='/cart'>
                        <div className="cart-icon-group">
                            <i data-test="cart-icon" className={`cart-icon ${cartIconClassName} ri-2x`}></i>
                            {displayCartCount}
                        </div>
                    </Link>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Header;