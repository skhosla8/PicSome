import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../contexts/Context';
import FlagIcon from '../../utils/FlagIcon';
import { countriesData } from '../../utils/countries';
import SelectorCategory from './SelectorCategory';
import SelectorModal from './SelectorModal';

function CountrySelector() {
    const { selectedCountry, setSelectedCountry, selectedFlag, setSelectedFlag, setCurrency } = useContext(Context);

    const [isOpen, setIsOpen] = useState({
        isOpen1: false,
        isOpen2: false,
        isOpen3: false,
        isOpen4: false,
        isOpen5: false
    });

    const [category, setCategory] = useState(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [selectedCountry, selectedFlag])

    const toggleCollapsible = (index) => {
        const collapse = 'isOpen' + index;

        setIsOpen(prevState => {
            return {
                [collapse]: !prevState[collapse]
            }
        });
    }

    const countries = countriesData
        .filter(country => country.category === category)
        .map(country =>

            <div data-test="selector-country"
                className="selector__country"
                key={country.name}
                onClick={() => { setSelectedCountry(country.name); setSelectedFlag(country.code); setClicked(!clicked); setCurrency(country.currency) }}>
                <FlagIcon code={country.code} className="selector__flag-icon"></FlagIcon>
                <span className="selector__name">{country.name}</span>
            </div>
        );

    return (
        <div className="selector">
            <h1 className="selector__heading">CHOOSE YOUR COUNTRY</h1>
            <p className="selector__current">You are currently shipping to:<br />
                <span data-test="displayed-country"><FlagIcon code={selectedFlag} className="selector__flag-icon"></FlagIcon>{selectedCountry}</span>
            </p>

            <div className="selector__menu">
                <SelectorCategory
                    index='1'
                    setCategory={setCategory}
                    toggleCollapsible={toggleCollapsible}
                    title='UNITED STATES & CANADA'
                    className={isOpen.isOpen1 ? 'selector__content' : 'none'}
                    content={countries}
                />

                <SelectorCategory
                    index='2'
                    setCategory={setCategory}
                    toggleCollapsible={toggleCollapsible}
                    title='ASIA PACIFIC'
                    className={isOpen.isOpen2 ? 'selector__content' : 'none'}
                    content={countries}
                />

                <SelectorCategory
                    index='3'
                    setCategory={setCategory}
                    toggleCollapsible={toggleCollapsible}
                    title='EUROPE'
                    className={isOpen.isOpen3 ? 'selector__content' : 'none'}
                    content={countries}
                />

                <SelectorCategory
                    index='4'
                    setCategory={setCategory}
                    toggleCollapsible={toggleCollapsible}
                    title='LATIN AMERICA & THE CARIBBEAN'
                    className={isOpen.isOpen4 ? 'selector__content' : 'none'}
                    content={countries}
                />

                <SelectorCategory
                    index='5'
                    setCategory={setCategory}
                    toggleCollapsible={toggleCollapsible}
                    title='MIDDLE EAST & AFRICA'
                    className={isOpen.isOpen5 ? 'selector__content' : 'none'}
                    content={countries}
                />
            </div>
            {clicked &&
                <div data-test="selector-modal-container" className="selector__modal"><SelectorModal /></div>
            }
        </div>
    )
}

export default CountrySelector;