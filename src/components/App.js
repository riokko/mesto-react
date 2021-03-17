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

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

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
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem('token', data.token);
                } else if (data.status === 400) {
                    throw new Error('не передано одно из полей');
                } else if (data.status === 401) {
                    throw new Error('пользователь с email не найден');
                } else {
                    throw new Error('что-то пошл о не так');
                }
            })
            .catch((e) => console.log(e));
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                if (res.status !== 400) {
                    history.push('/sign-in');
                } else {
                    throw new Error('некорректно заполнено одно из полей');
                }
            })
            .catch((e) => console.log(e));
    }

    function tokenCheck() {
        const token = localStorage.getItem('token');
        auth.getContent(token).then((res) => {
            if (res.ok) {
                setLoggedIn(true);
            }
        });
    }
    useEffect(() => {
        tokenCheck();
    });

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
            firstRender.current = false;
        }
    });

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

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
                <Header />
                <Switch>
                    <Route path="/sign-in">
                        <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
                    </Route>
                    <Route path="/sign-up">
                        <Register handleRegister={handleRegister} />
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
                    <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
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
        </CurrentUserContext.Provider>
    );
}

export default App;
