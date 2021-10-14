import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';
import { Context } from '../../contexts/Context';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Footer';

const setup = ({ selectedCountry, selectedFlag }) => {
    selectedCountry = selectedCountry || 'United States';
    selectedFlag = selectedFlag || 'us';

    return mount(
        <Context.Provider value={{ selectedCountry, selectedFlag }}>
            <Router>
                <Footer />
            </Router>
        </Context.Provider>
    )
};

describe('<Footer />', () => {
    test('warning shows when email input field is blank and sign up button clicked', () => {
        const wrapper = setup({});

        const emailInput = findByTestAttr(wrapper, 'email');
        emailInput.simulate('change', { target: { value: '' } });

        const signUpButton = findByTestAttr(wrapper, 'sign-up');
        signUpButton.simulate('click');

        const alert = findByTestAttr(wrapper, 'alert');
        expect(alert.hasClass('hidden')).toBe(false);
    });

    test('renders flag icon with selected country', () => {
        const wrapper = setup({ selectedCountry: 'United Kingdom', selectedFlag: 'gb' });
        const selectedCountry = findByTestAttr(wrapper, 'selected-country');
        const flagIcon = wrapper.find('.footer__flag-icon').first();

        expect(selectedCountry.text()).toBe('United Kingdom');
        expect(flagIcon.props()["code"]).toBe('gb');
    });
});

