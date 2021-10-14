import React, { useState, useContext, useRef } from 'react';
import { Context } from '../../contexts/Context';
import { Link } from 'react-router-dom';
import FlagIcon from '../../utils/FlagIcon';
import FooterLinks from './FooterLinks';

function Footer() {
    const { selectedCountry, selectedFlag } = useContext(Context);

    const [inputValue, setInputValue] = useState('');
    const [alert, setAlert] = useState(false);

    const inputRef = useRef();

    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
    }

    const handleEmailSubmit = () => {
        !inputRef.current.value ? setAlert(true) : setAlert(false);
    }

    const hiddenClass = !alert && 'hidden';

    return (
        <div data-test="component-footer" className="footer">
            <div className="footer__container">
                <div className="footer__div footer__email">
                    <h4 className="footer__heading">Like Being First?</h4>
                    <p>Get can't-miss style news, before everybody else.</p>
                    <div className="footer__sign-up">
                        <input data-test="email" className="footer__input" type="email" name="email" value={inputValue} placeholder="Enter your email." ref={inputRef} onChange={handleChange}></input>
                        <button data-test="sign-up" className="footer__submit" type="submit" onClick={handleEmailSubmit}>SIGN UP</button>
                    </div>
                    <p data-test="alert" className={`${hiddenClass} footer__alert`}>Please enter a valid email address.</p>
                </div>

                <div className="footer__div footer__navigation">
                    <FooterLinks />
                </div>

                <div className="footer__div footer__icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="social-icon ri-instagram-line ri-2x"></i></a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="social-icon ri-facebook-fill ri-2x"></i></a>
                    <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer"><i className="social-icon ri-twitter-fill ri-2x"></i></a>
                </div>

                <div className="footer__div footer__flag">
                    <Link to='/context-chooser'>
                        <span data-test="selected-country">{selectedCountry}</span><FlagIcon code={selectedFlag} className='footer__flag-icon'></FlagIcon>
                    </Link>
                </div>

                <div>
                    <div className="footer__div footer__copy">
                        <div className="footer__logo">
                            <i className="ri-phone-camera-fill ri-2x"></i>
                            <span><h2>Pic Some</h2></span>
                        </div>
                        <div className="footer__copyright">&copy; 2021 Pic Some</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;