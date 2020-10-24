import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm
            name="edit-avatar-form"
            title="Обновить аватар"
            submitButtonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__label">
                <input
                    className="form__input form__input_type_avatar"
                    id="avatar-url-input"
                    type="url"
                    name="avatar"
                    required
                    placeholder="Введите url для аватара"
                    ref={avatarRef}
                />
                <span className="form__error" id="avatar-url-input-error" />
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
