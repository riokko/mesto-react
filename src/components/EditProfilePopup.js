import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm
            name="edit-profile-form"
            title="Редактировать профиль"
            submitButtonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__label">
                <input
                    type="text"
                    className="form__input form__input_type_name"
                    id="name-input"
                    value={name || ''}
                    name="name"
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                    onChange={handleNameChange}
                />
                <span className="form__error" id="name-input-error" />
            </label>
            <label className="form__label">
                <input
                    type="text"
                    className="form__input form__input_type_profession"
                    id="profession-input"
                    value={description || ''}
                    name="about"
                    placeholder="О себе"
                    required
                    minLength="2"
                    maxLength="200"
                    onChange={handleDescriptionChange}
                />
                <span className="form__error" id="profession-input-error" />
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
