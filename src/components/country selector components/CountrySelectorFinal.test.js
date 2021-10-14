import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';
import { Context } from '../../contexts/Context';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import CountrySelector from './CountrySelectorFinal';
import SelectorCategory from './SelectorCategory';
import SelectorModal from './SelectorModal';


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn()
}));

const setup = ({ selectedCountry, setSelectedCountry, selectedFlag, setSelectedFlag }) => {
    selectedCountry = selectedCountry || 'United States';
    selectedFlag = selectedFlag || 'us';
    setSelectedCountry = setSelectedCountry || jest.fn();
    setSelectedFlag = setSelectedFlag || jest.fn();

    return mount(
        <Context.Provider value={{ selectedCountry, setSelectedCountry, selectedFlag, setSelectedFlag }}>
            <Router>
                <ScrollToTop />
                <CountrySelector />
            </Router>
        </Context.Provider>
    )
};

describe('<CountrySelector />', () => {
    describe('SelectorCategory country clicked', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = setup({ selectedCountry: 'Bahrain', selectedFlag: 'bh' });
            const selectorCategory = wrapper.find(SelectorCategory).last();
            selectorCategory.simulate('click');

            const selectorCountry = findByTestAttr(wrapper, 'selector-country').first();
            selectorCountry.simulate('click');
        })

        test('SelectorModal shows', () => {
            const selectorModal = wrapper.find(SelectorModal);
            expect(selectorModal.length).toBe(1);
        });

        test('SelectorModal renders country name and corresponding flag of selected country', () => {
            const displayedCountry = findByTestAttr(wrapper, 'country-modal-selected');
            const displayedFlag = wrapper.find('.country__modal__flag').first();

            expect(displayedCountry.text()).toBe('Bahrain');
            expect(displayedFlag.props()["code"]).toBe('bh');
        });
    });

    test('renders country name and corresponding flag of selected country', () => {
        const wrapper = setup({ selectedCountry: 'Bahrain', selectedFlag: 'bh' });
        const displayedCountry = findByTestAttr(wrapper, 'displayed-country');
        const displayedFlag = wrapper.find('.selector__flag-icon').first();

        expect(displayedCountry.text()).toBe('Bahrain');
        expect(displayedFlag.props()["code"]).toBe('bh');
    });

    test('only 1 SelectorCategory open at a time', () => {
        const wrapper = setup({});
        const selectorCategoryFirst = wrapper.find(SelectorCategory).first();
        const selectorCategoryLast = wrapper.find(SelectorCategory).last();

        selectorCategoryFirst.simulate('click');
        selectorCategoryLast.simulate('click');
        expect(selectorCategoryFirst.hasClass('none')).toBe(true);
    });
});