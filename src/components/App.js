import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            const userInfo = await api.getUserInfo();
            setCurrentUser(userInfo);
        }
        fetchData();
    }, []);

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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Footer />
            </div>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <PopupWithForm
                name="edit-avatar-form"
                title="Обновить аватар"
                submitButtonText="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <label className="form__label">
                    <input
                        className="form__input form__input_type_avatar"
                        id="avatar-url-input"
                        value=""
                        name="avatar"
                        required
                        placeholder="Введите url для аватара"
                        onChange={() => {}}
                    />
                    <span className="form__error" id="avatar-url-input-error" />
                </label>
            </PopupWithForm>
            <PopupWithForm
                name="new-item-form"
                title="Новое место"
                submitButtonText="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <label className="form__label">
                    <input
                        type="text"
                        className="form__input form__input_type_place"
                        id="place-input"
                        name="name"
                        placeholder="Название"
                        required
                        minLength="1"
                        maxLength="30"
                        onChange={() => {}}
                    />
                    <span className="form__error" id="place-input-error" />
                </label>
                <label className="form__label">
                    <input
                        type="url"
                        className="form__input form__input_type_url"
                        id="url-input"
                        name="link"
                        placeholder="Ссылка на картинку"
                        required
                        onChange={() => {}}
                    />
                    <span className="form__error" id="url-input-error" />
                </label>
            </PopupWithForm>
            <PopupWithForm name="card-remove" title="Вы уверены?" submitButtonText="Да" onClose={closeAllPopups} />

            {selectedCard._id && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
        </CurrentUserContext.Provider>
    );
}

export default App;
