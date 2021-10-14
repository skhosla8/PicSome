import React, { useState } from 'react';
import Image from '../components/Image';
import { getClass } from '../utils';

const Context = React.createContext();

function ContextProvider(props) {
    const [allPhotos, setAllPhotos] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('United States');
    const [selectedFlag, setSelectedFlag] = useState('us');
    const [currency, setCurrency] = useState('USD');

    const photoElements = allPhotos.map((photo, i) => (
        <Image
            key={photo.id}
            photo={photo}
            className={getClass(i)}
            alt={`photo-${i}`}
        />
    ));

    const addToFavorites = (newItem) => {
        setFavorites((prevItems) => [...prevItems, newItem]);
    };

    const removeFromFavorites = (newItem) => {
        const updatedFavorites = favorites.filter((item => item.id !== newItem.id));
        setFavorites(updatedFavorites);
    };

    const addToCart = (newItem) => {
        setCartItems((prevItems) => [...prevItems, newItem]);
    };

    const removeFromCart = (newItem) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== newItem.id);
        setCartItems(updatedCartItems);
    };

    const emptyCart = () => {
        setCartItems([]);
    };

    const updateTotalQuantity = () => {
        let quantity = cartItems.map(item => item.quantity)
        let totalQuantity = quantity.reduce((a, b) => a + b, 0);
        setTotalQuantity(totalQuantity);
    };

    return (
        <Context.Provider
            value={{
                allPhotos,
                setAllPhotos,
                cartItems,
                favorites,
                totalQuantity,
                setTotalQuantity,
                selectedCountry,
                setSelectedCountry,
                selectedFlag,
                setSelectedFlag,
                currency,
                setCurrency,
                photoElements,
                addToFavorites,
                removeFromFavorites,
                addToCart,
                removeFromCart,
                emptyCart,
                updateTotalQuantity
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export { ContextProvider, Context };

