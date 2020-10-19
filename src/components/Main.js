import React from 'react';

function Main(props) {
    return (
        <main>
            <section className="profile section">
                <div className="profile__user-pic" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src="#" alt="фото профиля" />
                    <div className="profile__pen"></div>
                </div>
                <div className="profile__info">
                    <div className="profile__name">
                        <h1 className="profile__name-title"></h1>
                        <button
                            type="button"
                            className="profile__edit-button"
                            aria-label="Редактировать"
                            onClick={() => {
                                props.onEditProfile();
                            }}
                        ></button>
                    </div>
                    <p className="profile__profession"></p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить место"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <section className="elements section">
                <ul className="elements__list"></ul>
            </section>
        </main>
    );
}

export default Main;
