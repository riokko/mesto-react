import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
    onEditProfile, onAddPlace, onEditAvatar, onCardClick,
}) {
    const currentUser = useContext(CurrentUserContext);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const cardsData = await api.getInitialCards();
            setCards(cardsData);
        }
        fetchData();
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.like(card._id, isLiked ? 'DELETE' : 'PUT').then((newCard) => {
            const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
            setCards(newCards);
        });
    }

    function handleCardDelete(card) {
        api.removeCard(card._id).then(() => {
            setCards(cards.filter((item) => item._id !== card._id));
        });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <main>
                <section className="profile section">
                    <div className="profile__user-pic" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="фото профиля" />
                        <div className="profile__pen" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__name-title">{currentUser.name}</h1>
                            <button
                                type="button"
                                className="profile__edit-button"
                                aria-label="Редактировать"
                                onClick={() => {
                                    onEditProfile();
                                }}
                            />
                        </div>
                        <p className="profile__profession">{currentUser.about}</p>
                    </div>
                    <button
                        className="profile__add-button"
                        type="button"
                        aria-label="Добавить место"
                        onClick={onAddPlace}
                    />
                </section>
                <section className="elements section">
                    <ul className="elements__list">
                        {cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                        ))}
                    </ul>
                </section>
            </main>
        </CurrentUserContext.Provider>
    );
}

export default Main;
