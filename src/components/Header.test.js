import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../test/testUtils';
import { Context } from '../contexts/Context';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

const setup = ({ cartItems, favorites, totalQuantity, setTotalQuantity, selectedFlag }) => {
    cartItems = cartItems || [];
    favorites = favorites || [];
    totalQuantity = totalQuantity || null;
    setTotalQuantity = setTotalQuantity || jest.fn();
    selectedFlag = selectedFlag || 'us';

    return mount(
        <Context.Provider value={{ cartItems, favorites, totalQuantity, setTotalQuantity, selectedFlag }}>
            <Router>
                <Header />
            </Router>
        </Context.Provider>
    );
}

describe('<Header />', () => {
    const wrapper = setup({ selectedFlag: 'gb' });

    test('renders navbar component', () => {
        const navbarComponent = findByTestAttr(wrapper, 'component-navbar');
        expect(navbarComponent.length).toBe(1);
    });

    test('renders flag icon with selected country', () => {
        const flagIcon = wrapper.find('.flag-icon').first();
        expect(flagIcon.props()["code"]).toBe('gb');
    });

    describe('favorites icon', () => {
        test('filled heart icon shows when at least one photo has been favorited', () => {
            const wrapper = setup({
                favorites: [{
                    url: 'https://github.com/bobziroll/scrimba-react-bootcamp-images/blob/master/pic1.jpg?raw=true',
                    id: '1-featured',
                    price: 6.99,
                    quantity: 1,
                    isFavorite: false
                }]
            });

            const heartIcon = findByTestAttr(wrapper, 'heart-icon-fill');
            expect(heartIcon.length).toBe(1);
        });

        test('heart icon outline shows when no photos have been favorited', () => {
            const wrapper = setup({});
            const heartIcon = findByTestAttr(wrapper, 'heart-icon-line');
            expect(heartIcon.length).toBe(1);
        });
    });

    describe('cart icon', () => {
        test('filled cart icon shows when at least one photo has been added to cart', () => {
            const wrapper = setup({
                cartItems: [{
                    url: 'https://images.unsplash.com/photo-156879483825…xlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60',
                    id: '3-nature',
                    price: 4.99,
                    quantity: 1,
                    isFavorite: false
                }]
            });

            const cartIcon = findByTestAttr(wrapper, 'cart-icon');
            expect(cartIcon.hasClass('ri-shopping-cart-fill')).toEqual(true);
        });

        test('cart icon outline shows when no photos have been added to cart', () => {
            const wrapper = setup({});
            const cartIcon = findByTestAttr(wrapper, 'cart-icon');
            expect(cartIcon.hasClass('ri-shopping-cart-line')).toEqual(true);
        });

        test('cart icon shows correct cart item count when a photo is added to the cart', () => {
            const wrapper = setup({ totalQuantity: 3 });
            const cartCount = findByTestAttr(wrapper, 'cart-count');
            expect(cartCount.text()).toEqual('3');
        });
    });
});

