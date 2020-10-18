import React from "react";
import "./App.css";

function App() {
    return (
        <>
            <div className="page__content">
                <header className="header">
                    <div className="logo header__logo"></div>
                </header>
                <main>
                    <section className="profile section">
                        <div className="profile__user-pic">
                            <img
                                className="profile__avatar"
                                src="#"
                                alt="фото профиля"
                            />
                            <div className="profile__pen"></div>
                        </div>
                        <div className="profile__info">
                            <div className="profile__name">
                                <h1 className="profile__name-title"></h1>
                                <button
                                    type="button"
                                    className="profile__edit-button"
                                    aria-label="Редактировать"
                                ></button>
                            </div>
                            <p className="profile__profession"></p>
                        </div>
                        <button
                            className="profile__add-button"
                            type="button"
                            aria-label="Добавить место"
                        ></button>
                    </section>
                    <section className="elements section">
                        <ul className="elements__list"></ul>
                    </section>
                </main>
                <footer className="footer section">
                    <p className="footer__copyright">
                        &copy; 2020 Mesto Russia
                    </p>
                </footer>
            </div>
            <div className="popup popup_type_edit-profile-form">
                <div className="popup__container">
                    <button
                        className="popup__close-button"
                        type="button"
                        aria-label="Закрыть форму"
                    ></button>
                    <h3 className="popup__title">Редактировать профиль</h3>
                    <form
                        className="form"
                        name="edit-profile"
                        method="GET"
                        noValidate
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
                            <span
                                className="form__error"
                                id="name-input-error"
                            ></span>
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
                            <span
                                className="form__error"
                                id="profession-input-error"
                            ></span>
                        </label>
                        <button
                            type="submit"
                            className="form__button form__button_disabled"
                            disabled
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
            <div className="popup popup_type_edit-avatar-form">
                <div className="popup__container">
                    <button
                        className="popup__close-button"
                        type="button"
                        aria-label="Закрыть форму"
                    ></button>
                    <h3 className="popup__title">Обновить аватар</h3>
                    <form
                        className="form"
                        name="edit-profile"
                        method="GET"
                        noValidate
                    >
                        <label className="form__label">
                            <input
                                className="form__input form__input_type_avatar"
                                id="avatar-url-input"
                                value=""
                                name="avatar"
                                required
                            />
                            <span
                                className="form__error"
                                id="avatar-url-input-error"
                            ></span>
                        </label>
                        <button
                            type="submit"
                            className="form__button form__button_disabled"
                            disabled
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
            <div className="popup popup_type_new-item-form">
                <div className="popup__container">
                    <button
                        className="popup__close-button"
                        type="button"
                        aria-label="Закрыть форму"
                    ></button>
                    <h3 className="popup__title">Новое место</h3>
                    <form
                        className="form"
                        name="add-item"
                        method="GET"
                        noValidate
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
                            <span
                                className="form__error"
                                id="place-input-error"
                            ></span>
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
                            <span
                                className="form__error"
                                id="url-input-error"
                            ></span>
                        </label>
                        <button
                            type="submit"
                            className="form__button form__button_disabled"
                            disabled
                        >
                            Создать
                        </button>
                    </form>
                </div>
            </div>
            <div className="popup popup_type_card-remove">
                <div className="popup__container">
                    <button
                        className="popup__close-button"
                        type="button"
                        aria-label="Закрыть форму"
                    ></button>
                    <h3 className="popup__title">Вы уверены?</h3>
                    <button type="submit" className="popup__submit-button">
                        Да
                    </button>
                </div>
            </div>
            <div className="popup popup_type_photo">
                <div className="popup__container popup__container_type_photo">
                    <button
                        className="popup__close-button"
                        type="button"
                        aria-label="Закрыть форму"
                    ></button>
                    <img className="popup__image" src="#" alt="" />
                    <h3 className="popup__caption"></h3>
                </div>
            </div>
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
                            <button
                                className="element__like"
                                type="button"
                                aria-label="Отметить место"
                            ></button>
                            <p className="element__likes"></p>
                        </div>
                    </div>
                </li>
            </template>
        </>
    );
}

export default App;
