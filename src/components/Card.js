import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({
    card, onCardClick, onCardLike, onCardDelete,
}) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `element__delete ${!isOwn ? 'element__delete_hidden' : ''}`;

    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_is_selected' : ''}`;

    const {
        _id, link, likes, name,
    } = card;
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element" key={_id}>
            <button
                className={cardDeleteButtonClassName}
                type="button"
                aria-label="Удалить место"
                onClick={handleDeleteClick}
            />
            <img src={link} alt={name} className="element__photo" onClick={handleClick} />
            <div className="element__title">
                <h2 className="element__name">{name}</h2>
                <div className="element__likes-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Отметить место"
                        onClick={handleLikeClick}
                    />
                    <p className="element__likes">{likes.length}</p>
                </div>
            </div>
        </li>
    );
}
