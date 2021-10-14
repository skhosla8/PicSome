import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../test/testUtils';
import { Context } from '../contexts/Context';
import useHover from '../hooks/useHover';
import { BrowserRouter as Router } from 'react-router-dom';
import Image from './Image';

const photo = {
    url: 'https://github.com/bobziroll/scrimba-react-bootcamp-images/blob/master/pic1.jpg?raw=true',
    id: '1-featured',
    price: 6.99,
    quantity: 1,
    isFavorite: false
};

jest.mock('../hooks/useHover');

const setup = ({ cartItems, favorites, addToFavorites, removeFromFavorites, addToCart, removeFromCart }) => {
    cartItems = cartItems || [];
    favorites = favorites || [];
    addToFavorites = addToFavorites || jest.fn();
    removeFromFavorites = removeFromFavorites || jest.fn();
    addToCart = addToCart || jest.fn();
    removeFromCart = removeFromCart || jest.fn();

    return mount(
        <Context.Provider value={{ cartItems, favorites, addToFavorites, removeFromFavorites, addToCart, removeFromCart }}>
            <Router>
                <Image photo={photo} />
            </Router>
        </Context.Provider>
    );
};

describe('<Image />', () => {
    describe('image hovered on', () => {
        let wrapper;
        let imageContainer;

        beforeEach(() => {
            useHover.mockReturnValue([true]);
            wrapper = setup({});
            imageContainer = findByTestAttr(wrapper, 'image-container');
            imageContainer.simulate('mouseover');
        });

        test('heart icon outline shows when image is hovered on', () => {
            const heartIcon = findByTestAttr(wrapper, 'heart-icon-line');

            expect(useHover).toHaveBeenCalled();
            expect(heartIcon.length).toBe(1);
        });

        test('add icon outline shows when image is hovered on', () => {
            const addIcon = findByTestAttr(wrapper, 'add-icon-line');

            expect(useHover).toHaveBeenCalled();
            expect(addIcon.length).toBe(1);
        });

        test('image overlay shows', () => {
            const imageOverlay = findByTestAttr(wrapper, 'image-overlay');

            expect(imageOverlay.length).toBe(1);
        });
    });

    describe('image not hovered on', () => {
        let wrapper;
        let imageOverlay;

        beforeEach(() => {
            useHover.mockReturnValue([false]);
            wrapper = setup({ cartItems: [photo], favorites: [photo] });
            imageOverlay = findByTestAttr(wrapper, 'image-overlay');
        });

        test('overlay shows when photo has been added to cart', () => {
            const addIcon = findByTestAttr(wrapper, 'cart-icon-fill');

            addIcon.simulate('click');
            expect(imageOverlay.length).toBe(1);
        });

        test('overlay shows when photo has been favorited', () => {
            const heartIcon = findByTestAttr(wrapper, 'heart-icon-fill');

            heartIcon.simulate('click');
            expect(imageOverlay.length).toBe(1);
        });
    });

    describe('heart icon clicked', () => {
        beforeEach(() => {
            useHover.mockReturnValue([true]);
        });

        test('filled heart icon shows when photo is not favorited', () => {
            let wrapper = setup({});
            let heartIcon = findByTestAttr(wrapper, 'heart-icon-line');
            heartIcon.simulate('click');

            wrapper = setup({ favorites: [photo] });
            heartIcon = findByTestAttr(wrapper, 'heart-icon-fill');
            expect(heartIcon.length).toBe(1);
        });

        test('heart icon outline shows when photo is favorited', () => {
            let wrapper = setup({ favorites: [photo] });
            let heartIcon = findByTestAttr(wrapper, 'heart-icon-fill');
            heartIcon.simulate('click');

            wrapper = setup({});
            heartIcon = findByTestAttr(wrapper, 'heart-icon-line');
            expect(heartIcon.length).toBe(1);
        });
    });

    describe('add/cart icon clicked', () => {
        beforeEach(() => {
            useHover.mockReturnValue([true]);
        });

        test('filled cart icon shows when photo is not in cart', () => {
            let wrapper = setup({});
            const addIcon = findByTestAttr(wrapper, 'add-icon-line');
            addIcon.simulate('click');

            wrapper = setup({ cartItems: [photo] });
            const cartIcon = findByTestAttr(wrapper, 'cart-icon-fill');
            expect(cartIcon.length).toBe(1);
        });

        test('add icon shows when photo is in cart', () => {
            let wrapper = setup({ cartItems: [photo] });
            const cartIcon = findByTestAttr(wrapper, 'cart-icon-fill');
            cartIcon.simulate('click');

            wrapper = setup({});
            const addIcon = findByTestAttr(wrapper, 'add-icon-line');
            expect(addIcon.length).toBe(1);
        });
    });
});