import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onUpdatePlace }) {
    const [placeName, setPlaceName] = useState('');
    const [placeLink, setPlaceLink] = useState('');

    function handlePlaceNameChange(e) {
        setPlaceName(e.target.value);
    }

    function handlePlaceLinkChange(e) {
        setPlaceLink(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onUpdatePlace({
            name: placeName,
            link: placeLink,
        });
    }

    return (
        <PopupWithForm
            name="new-item-form"
            title="Новое место"
            submitButtonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
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
                    value={placeName}
                    onChange={handlePlaceNameChange}
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
                    value={placeLink}
                    onChange={handlePlaceLinkChange}
                />
                <span className="form__error" id="url-input-error" />
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
