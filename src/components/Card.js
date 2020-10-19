import React from 'react';

export default function Card({card, onCardClick}) {
    const {_id, link, likes, name} = card;
    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="element" key={_id}>
            <button className="element__delete element__delete_hidden" type="button" aria-label="Удалить место" />
            <img src={link} alt={name} className="element__photo" onClick={handleClick} />
            <div className="element__title">
                <h2 className="element__name">{name}</h2>
                <div className="element__likes-container">
                    <button className="element__like" type="button" aria-label="Отметить место" />
                    <p className="element__likes">{likes.length}</p>
                </div>
            </div>
        </li>
    );
}
