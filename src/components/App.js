import React, { useState } from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
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

    return (
        <>
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
            <PopupWithForm
                name="edit-profile-form"
                title="Редактировать профиль"
                submitButtonText="Сохранить"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <label className="form__label">
                    <input
                        type="text"
                        className="form__input form__input_type_name"
                        id="name-input"
                        value=""
                        name="name"
                        placeholder="Имя"
                        required
                        minLength="2"
                        maxLength="40"
                        onChange={() => {}}
                    />
                    <span className="form__error" id="name-input-error" />
                </label>
                <label className="form__label">
                    <input
                        type="text"
                        className="form__input form__input_type_profession"
                        id="profession-input"
                        value=""
                        name="about"
                        placeholder="О себе"
                        required
                        minLength="2"
                        maxLength="200"
                        onChange={() => {}}
                    />
                    <span className="form__error" id="profession-input-error" />
                </label>
            </PopupWithForm>
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
                        value=""
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
                        value=""
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
        </>
    );
}

export default App;
