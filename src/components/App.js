import React, { useEffect, useState, useRef } from 'react';
import {
    Route, Switch, useHistory, Redirect,
} from 'react-router-dom';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth';
import InfoTooltip from './InfoTooltip';
import { SIGNIN, SIGNUP, MAIN } from '../utils/routes';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')));
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [showInfoTooltip, setShowInfoTooltip] = useState(false);
    const [registerIsOk, setRegisterIsOk] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const cardsData = await api.getInitialCards();
            setCards(cardsData);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn]);

    function handleLogin(email, password) {
        return auth
            .authorize(email, password)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem('token', data.token);
                } else if (data.status === 400) {
                    throw new Error('не передано одно из полей');
                } else if (data.status === 401) {
                    throw new Error('пользователь с email не найден');
                } else {
                    throw new Error('что-то пошло не так');
                }
            })
            .catch((e) => console.log(e));
    }
    const closeInfoTooltipSuccess = () => {
        setShowInfoTooltip(false);
        history.push('/');
    };

    const closeInfoTooltipFailure = () => {
        setShowInfoTooltip(false);
    };

    function handleRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                if (res.status === 400) {
                    setRegisterIsOk(false);
                    setShowInfoTooltip(true);
                    throw new Error('некорректно заполнено одно из полей');
                } else {
                    setRegisterIsOk(true);
                    setShowInfoTooltip(true);
                }
            })
            .catch((e) => console.log(e));
    }

    function tokenCheck() {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        auth.getUserData(token)
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Токен не передан или передан не в том формате');
                } else if (res.status === 400) {
                    throw new Error('Переданный токен некорректен');
                } else {
                    return res.json();
                }
            })
            .then((res) => {
                console.log(res);
                const data = res.data ? res.data : {};
                setUserProfile(data);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.like(card._id, isLiked ? 'DELETE' : 'PUT').then((newCard) => {
            const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
            setCards(newCards);
        });
    }

    function handleCardDelete(card) {
        api.removeCard(card._id).then(() => {
            setCards(cards.filter((item) => item._id !== card._id));
        });
    }

    const firstRender = useRef(true);
    useEffect(() => {
        async function fetchData() {
            const userInfo = await api.getUserInfo();
            setCurrentUser(userInfo);
        }
        if (firstRender.current) {
            fetchData();
            tokenCheck();
            firstRender.current = false;
        }
    });

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser(userData) {
        api.patchUserInfo(userData)
            .then((data) => {
                setCurrentUser(data);
                // eslint-disable-next-line no-console
            })
            .catch((err) => {
                console.log(err);
            });
        closeAllPopups();
    }

    function handleUpdateAvatar({ avatar }) {
        api.editAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                // eslint-disable-next-line no-console
            })
            .catch((err) => {
                console.log(err);
            });
        closeAllPopups();
    }

    function handleAddPlace(placeData) {
        api.addCard(placeData)
            .then((data) => {
                setCards([data, ...cards]);
                // eslint-disable-next-line no-console
            })
            .catch((err) => {
                console.log(err);
            });
        closeAllPopups();
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userProfile={userProfile} />
                <Switch>
                    <Route path={SIGNUP}>
                        <Register handleRegister={handleRegister} />
                    </Route>
                    <Route path={SIGNIN}>
                        <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
                    </Route>
                    <ProtectedRoute
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Route>{loggedIn ? <Redirect to={MAIN} /> : <Redirect to={SIGNIN} />}</Route>
                </Switch>
                <Footer />
            </div>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdatePlace={handleAddPlace} />
            <PopupWithForm name="card-remove" title="Вы уверены?" submitButtonText="Да" onClose={closeAllPopups} />

            {selectedCard._id && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
            {showInfoTooltip && (
                <InfoTooltip
                    onClose={registerIsOk ? closeInfoTooltipSuccess : closeInfoTooltipFailure}
                    isOk={registerIsOk}
                />
            )}
        </CurrentUserContext.Provider>
    );
}

export default App;
