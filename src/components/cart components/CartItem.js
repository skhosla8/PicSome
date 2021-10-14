import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../contexts/Context';
import useHover from '../../hooks/useHover';

function CartItem({ item, alt, fx, calculateTotalCost, setTotal }) {
    const { cartItems, removeFromCart, currency, updateTotalQuantity } = useContext(Context);

    const [quantity, setQuantity] = useState(item.quantity);

    const [price, setPrice] = useState(item.price);

    const [hovered, ref] = useHover();

    const url =
        `https://openexchangerates.org/api/latest.json?app_id=a2af62494f6a4e0e8463e0e7614144d9`;

    const changeClassName = hovered ? 'fill' : 'line';

    useEffect(() => {
        setTotal(calculateTotalCost());
    });

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => Object.fromEntries(Object.entries(data.rates).filter(([key, value]) => key === currency || key === 'USD')))
            .then(obj => fx.rates = obj)
            .then(() => fx.settings = { from: 'USD', to: currency })
            .then(() => fx.convert(item.price * quantity))
            .then(result => setPrice(result));
        //eslint-disable-next-line     
    }, [currency]);

    useEffect(() => {
        if (item.quantity === 0) {
            removeFromCart(item);
        }

        updateTotalQuantity();
    }, [quantity, cartItems, item, removeFromCart, updateTotalQuantity]);

    const updateItemQuantity = (e) => {
        const { value } = e.target;
        setQuantity(value);
        fx.settings = { from: 'USD', to: currency };
        const updatedItemPrice = fx.convert(item.price);
        setPrice(updatedItemPrice * value);
        item.quantity = +value;
    }

    return (
        <tr className='cart-item'>
            <td className='cart-item--img'><img src={item.url} width="100px" height="100px" alt={alt}></img></td>
            <td className='cart-item--td'>
                <select name='size' className='drop-down'>
                    <option value='small'>S</option>
                    <option value='medium'>M</option>
                    <option value='large'>L</option>
                </select>
            </td>
            <td className='cart-item--td'><input type='number' value={quantity} step='1' min='0' max='10' onChange={(e) => updateItemQuantity(e)} onKeyPress={(e) => e.preventDefault()}></input></td>
            <td className='cart-item--td'>{price.toLocaleString('en-US', { style: 'currency', currency: currency })}</td>
            <td className='cart-item--td low-contrast'>
                <i
                    className={`ri-delete-bin-${changeClassName} ri-lg`}
                    onClick={() => removeFromCart(item)}
                    ref={ref}
                >
                </i>
            </td>
        </tr>
    )
}

export default CartItem;