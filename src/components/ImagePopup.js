import React from 'react';

function ImagePopup() {
    return (
        <div className="popup popup_type_photo">
            <div className="popup__container popup__container_type_photo">
                <button className="popup__close-button" type="button" aria-label="Закрыть форму"></button>
                <img className="popup__image" src="#" alt="" />
                <h3 className="popup__caption"></h3>
            </div>
        </div>
    );
}

export default ImagePopup;
