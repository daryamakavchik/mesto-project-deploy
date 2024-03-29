import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Card from './Card';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddCardClick,
  onCardClick,
  onCardDeleteButtonClick,
  cards,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content section page__section">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__overlay" onClick={onEditAvatar}></div>
          <img
            className="profile__image"
            src={currentUser && currentUser.data && currentUser.data.avatar}
            alt="User avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser && currentUser.data && currentUser.data.name}</h1>
          <p className="profile__about">{currentUser && currentUser.data && currentUser.data.about}</p>
          <button
            className="button profile__button-edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="button profile__button-add"
          type="button"
          onClick={onAddCardClick}
        ></button>
      </section>
      <section className="elements">
        {cards && cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardDeleteButtonClick={onCardDeleteButtonClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
