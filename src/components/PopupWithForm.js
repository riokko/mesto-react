import React from 'react';

function PopupWithForm({ name, title, submitButtonText, isOpen, onClose, children }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть форму" onClick={onClose} />
                <h3 className="popup__title">{title}</h3>
                <form className="form" name={name} method="GET" noValidate>
                    {children}
                    <button type="submit" className="form__button form__button_disabled" disabled>
                        {submitButtonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
