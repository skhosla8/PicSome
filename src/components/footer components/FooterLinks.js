import React from 'react';
import { NavLink } from 'react-router-dom';

function FooterLinks() {
  const handleDealsClick = () => {
    window.open('https://skhosla8.github.io/picsome/#/picsome/best-deals', '_blank', 'noopener');
  };

  return (
    <React.Fragment>
      <div className="footer__help footer__navlinks">
        <h4 className="footer__heading">Help</h4>
        <NavLink to="/help/returns-exchanges">Returns & Exchange</NavLink>
        <NavLink to="/help/manage-account">Manage Account</NavLink>
        <NavLink to="/help/contact-us">Contact Us</NavLink>
      </div>
      <div className="footer__links footer__navlinks">
        <h4 className="footer__heading">Quick Links</h4>
        <NavLink to="/help/sizing">Sizing</NavLink>
        <NavLink to="/help/gift-cards">Gift Cards</NavLink>
        <NavLink to="/best-deals" onClick={handleDealsClick}>
          Offers & Promotions
        </NavLink>
      </div>
      <div className="footer__about footer__navlinks">
        <h4 className="footer__heading">About Pic Some</h4>
        <NavLink to="/s/our-story">Our Story</NavLink>
        <NavLink to="/help/terms-of-use">Terms of Use</NavLink>
        <NavLink to="/help/privacy-policy">Updated Privacy Policy</NavLink>
      </div>
    </React.Fragment>
  );
}

export default FooterLinks;
