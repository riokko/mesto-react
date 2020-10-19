import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
    }

    return (
        <>
            <div className="page__content">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
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
                    />
                    <span className="form__error" id="name-input-error"></span>
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
                    />
                    <span className="form__error" id="profession-input-error"></span>
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
                    />
                    <span className="form__error" id="avatar-url-input-error"></span>
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
                    />
                    <span className="form__error" id="place-input-error"></span>
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
                    />
                    <span className="form__error" id="url-input-error"></span>
                </label>
            </PopupWithForm>
            <PopupWithForm name="card-remove" title="Вы уверены?" submitButtonText="Да" onClose={closeAllPopups} />
            <ImagePopup />
            <template className="template-element">
                <li className="element">
                    <button
                        className="element__delete element__delete_hidden"
                        type="button"
                        aria-label="Удалить место"
                    ></button>
                    <img src="#" alt="" className="element__photo" />
                    <div className="element__title">
                        <h2 className="element__name"></h2>
                        <div className="element__likes-container">
                            <button className="element__like" type="button" aria-label="Отметить место"></button>
                            <p className="element__likes"></p>
                        </div>
                    </div>
                </li>
            </template>
        </>
    );
}

export default App;
