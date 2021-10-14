import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header';
import CountrySelector from './components/country selector components/CountrySelectorFinal';
import Favorites from './components/favorites components/Favorites';
import Cart from './components/cart components/Cart';
import Featured from './components/navbar components/Featured';
import Nature from './components/navbar components/Nature';
import People from './components/navbar components/People';
import Architecture from './components/navbar components/Architecture';
import Footer from './components/footer components/Footer';
import ReturnsExchanges from './components/footer components/footer link components/1- ReturnsExchanges';
import ManageAccount from './components/footer components/footer link components/2- ManageAccount';
import ContactUs from './components/footer components/footer link components/3- ContactUs';
import Sizing from './components/footer components/footer link components/4- Sizing';
import GiftCards from './components/footer components/footer link components/5- GiftCards';
import OffersPromotions from './components/footer components/footer link components/6- OffersPromotions';
import OurStory from './components/footer components/footer link components/7- OurStory';
import TermsOfUse from './components/footer components/footer link components/8- TermsOfUse';
import PrivacyPolicy from './components/footer components/footer link components/9- PrivacyPolicy';

function App() {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const modalStatus = localStorage.getItem('modal_status');

        if (!modalStatus) {
            setModalVisible(true);
            localStorage.setItem('modal_status', 1);
        }

        return () => {
            setModalVisible(false);
        }
    }, []);

    const WelcomeModal = () => {
        return (
            <React.Fragment>
                <div className="welcome__overlay"></div>
                <div className="welcome__modal">
                    <div>
                        <h1>WELCOME TO PICSOME!</h1>
                        <h2>The internet's source of premier images.</h2>
                    </div>
                    <div>
                        <button className="welcome__modal__button" onClick={() => setModalVisible(false)}>SHOP NOW</button>
                    </div>
                </div>
            </React.Fragment>
        )
    };

    const PageNotFound = () => {
        return (
            <div data-test="component-not-found" className="not-found">
                <h1>Page not found</h1>
                <p><NavLink to='/'>Click here</NavLink> to go back.</p>
            </div>
        )
    }

    return (
        <div data-test="component-app" className="app">
            {modalVisible && <WelcomeModal />}
            <Header />
            <Switch>
                <Route exact path='/' component={Featured} />
                <Route path='/nature' component={Nature} />
                <Route path='/people' component={People} />
                <Route path='/architecture' component={Architecture} />

                <Route exact path='/context-chooser' component={CountrySelector} />
                <Route path='/favorites' component={Favorites} />
                <Route path='/cart' component={Cart} />

                <Route path='/help/returns-exchanges' component={ReturnsExchanges} />
                <Route path='/help/manage-account' component={ManageAccount} />
                <Route path='/help/contact-us' component={ContactUs} />
                <Route path='/help/sizing' component={Sizing} />
                <Route path='/help/gift-cards' component={GiftCards} />
                <Route path='/best-deals' component={OffersPromotions} />
                <Route path='/s/our-story' component={OurStory} />
                <Route path='/help/terms-of-use' component={TermsOfUse} />
                <Route path='/help/privacy-policy' component={PrivacyPolicy} />

                <Route path='*' component={PageNotFound} />
            </Switch>
            <Footer />
        </div>
    )
}

export default App;