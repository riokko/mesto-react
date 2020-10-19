import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className="popup popup_type_photo popup_opened">
            <div className="popup__container popup__container_type_photo">
                <button className="popup__close-button" type="button" aria-label="Закрыть форму" onClick={onClose} />
                <img className="popup__image" src={card.link} alt="" />
                <h3 className="popup__caption">{card.name}</h3>
            </div>
        </div>
    );
}

export default ImagePopup;
