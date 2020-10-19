import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({
    onEditProfile, onAddPlace, onEditAvatar, onCardClick,
}) {
    const [userName, setUserName] = useState(null);
    const [userDescription, setUserDescription] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const [userInfo, cardsData] = await Promise.all([api.getUserInfo(), api.getInitialCards()]);
            setUserName(userInfo.name);
            setUserDescription(userInfo.about);
            setUserAvatar(userInfo.avatar);
            setCards(cardsData);
        }
        fetchData();
    }, []);

    return (
        <main>
            <section className="profile section">
                <div className="profile__user-pic" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="фото профиля" />
                    <div className="profile__pen" />
                </div>
                <div className="profile__info">
                    <div className="profile__name">
                        <h1 className="profile__name-title">{userName}</h1>
                        <button
                            type="button"
                            className="profile__edit-button"
                            aria-label="Редактировать"
                            onClick={() => {
                                onEditProfile();
                            }}
                        />
                    </div>
                    <p className="profile__profession">{userDescription}</p>
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
                        <Card key={card._id} card={card} onCardClick={onCardClick} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
