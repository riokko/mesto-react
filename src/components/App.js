import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const cardsData = await api.getInitialCards();
            setCards(cardsData);
        }
        fetchData();
    }, []);

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
        api.patchUserInfo(userData).then((data) => {
            setCurrentUser(data);
        // eslint-disable-next-line no-console
        }).catch((err) => { console.log(err); });
        closeAllPopups();
    }

    function handleUpdateAvatar({ avatar }) {
        api.editAvatar(avatar).then((data) => {
            setCurrentUser(data);
            // eslint-disable-next-line no-console
        }).catch((err) => { console.log(err); });
        closeAllPopups();
    }

    function handleAddPlace(placeData) {
        api.addCard(placeData).then((data) => {
            setCards([data, ...cards]);
            // eslint-disable-next-line no-console
        }).catch((err) => { console.log(err); });
        closeAllPopups();
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
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
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onUpdatePlace={handleAddPlace}
            />
            <PopupWithForm name="card-remove" title="Вы уверены?" submitButtonText="Да" onClose={closeAllPopups} />

            {selectedCard._id && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
        </CurrentUserContext.Provider>
    );
}

export default App;
