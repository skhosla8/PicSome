import React, { useState, useContext } from 'react';
import fx from 'money';
import { Context } from '../../contexts/Context';
import CartItem from './CartItem';

function Cart() {
    const [orderStatus, setOrderStatus] = useState('Place Order');

    //eslint-disable-next-line
    const [total, setTotal] = useState(null);

    const { totalQuantity, cartItems, emptyCart, currency } = useContext(Context);

    const calculateTotalCost = () => {
        let itemCost = cartItems.map(item => fx.convert(item.price) * item.quantity);
        let totalCost = itemCost.reduce((a, b) => a + b, 0);
        return totalCost.toLocaleString('en-US', { style: 'currency', currency: currency });
    }

    const placeOrder = () => {
        setOrderStatus('Ordering...');
        setTimeout(function () {
            emptyCart();
            setOrderStatus('Place Order');
        }, 3000);
    }

    const cartPageElements = cartItems.map(item => (
        <CartItem
            key={item.id}
            item={item}
            alt={`photo-${item.id}`}
            fx={fx}
            calculateTotalCost={calculateTotalCost}
            setTotal={setTotal}
        />
    ))

    return (
        <div className="cart-page">
            <h1>{cartItems.length > 0 ? `Shopping Bag (${totalQuantity})` : 'Shopping Cart'}</h1>
            <table>
                {cartItems.length >= 1 &&
                    <thead className="cart-page--thead low-contrast">
                        <tr>
                            <th className="th-item">ITEM</th>
                            <th className="th">SIZE</th>
                            <th className="th">QTY</th>
                            <th className="th">PRICE</th>
                            <th className="th">TRASH</th>
                        </tr>
                    </thead>
                }
                <tbody>
                    {cartPageElements}
                </tbody>
                <tfoot>
                    {cartItems.length > 0 &&
                        <tr className="cart-page--total">
                            <th colSpan="3"></th>
                            <td colSpan="2"><span className="low-contrast">TOTAL: </span>{calculateTotalCost()}</td>
                        </tr>
                    }
                    {cartItems.length > 0 ?
                        <tr className="cart-page--order">
                            <th colSpan="3"></th>
                            <td colSpan="2"><button className="place-order" onClick={placeOrder}>{orderStatus}</button></td>
                        </tr>
                        :
                        <tr>
                            <td className="alert" colSpan="3">You have no items in your cart.</td>
                        </tr>
                    }
                </tfoot>
            </table>
        </div>
    )
}

export default Cart;