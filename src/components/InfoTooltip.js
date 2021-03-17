import React from 'react';

function InfoTooltip({ onClose, isOk }) {
    return (
        <div className="popup popup_type_info popup_opened">
            <div className="popup__container popup__container_type_info">
                <button className="popup__close-button" type="button" aria-label="Закрыть форму" onClick={onClose} />
                <div className={`popup__register popup__register_type_${isOk ? 'ok' : 'notok'}`}></div>
                <h3 className="popup__title_type_info">
                    {isOk ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h3>
            </div>
        </div>
    );
}

export default InfoTooltip;
