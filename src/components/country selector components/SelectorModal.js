import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FlagIcon from '../../utils/FlagIcon';
import { Context } from '../../contexts/Context';

function SelectorModal() {
    const { selectedCountry, setSelectedCountry, selectedFlag, setSelectedFlag } = useContext(Context);

    return (
        <div data-test="component-selector-modal" className="country__modal">
            <div className="country__modal__logo">
                <i className="ri-phone-camera-fill ri-2x"></i>
                <span><h2>Pic Some</h2></span>
            </div>
            <div className="country__modal__context">
                <span data-test="country-modal-selected"><FlagIcon code={selectedFlag} className="country__modal__flag"></FlagIcon>
                    {selectedCountry}
                </span>
            </div>
            <div data-test="country-modal-text" className="country__modal__text">
                <p>DUTY-FREE SHOPPING IN YOUR LOCAL CURRENCY</p>
                <p>NEED HELP? <br /> email help@picsome.com</p>
            </div>
            <Link to='/'>
                <button data-test="country-modal-button" className="country__modal__button">START SHOPPING</button>
            </Link>
            <Link to='/'>
                <p onClick={() => { setSelectedCountry('United States'); setSelectedFlag('us') }}>
                    Take me to the U.S. site.</p>
            </Link>
            <div className="country__modal__disclaimer">
                <p>By clicking "start shopping," you agree to our <Link to='/help/terms-of-use'>Terms of Use</Link> and <Link to='/help/privacy-policy'>Privacy Policy</Link>,
                    including the use of cookies and the transfer of your personal information to the United States,
                    a jurisdiction that may not provide an equivalent level of data protection to the laws in your home country.
                </p>
            </div>
        </div>
    )
}
export default SelectorModal;