import React from "react";

export const addPlaceFormElements = (
  <>
    <input
      id="name-picture-input"
      className="popup__input popup__input_type_picture-name"
      type="text"
      name="name"
      placeholder="Name"
      required
      minLength="2"
      maxLength="30"
    />
    <span className="popup__error name-picture-input-error"></span>
    <input
      id="link-input"
      className="popup__input popup__input_type_link"
      type="url"
      name="link"
      placeholder="Image link"
      required
    />
    <span className="popup__error link-input-error"></span>
    <button className="button popup__button-submit" type="submit">
      Create
    </button>
  </>
);

export const editProfileFormElements = (
  <>
    <input
      id="name-input"
      className="popup__input popup__input_type_name"
      type="text"
      name="name"
      placeholder="Name"
      required
      minLength="2"
      maxLength="40"
    />
    <span className="popup__error name-input-error"></span>
    <input
      id="about-input"
      className="popup__input popup__input_type_about"
      type="text"
      name="about"
      placeholder="About"
      required
      minLength="2"
      maxLength="200"
    />
    <span className="popup__error about-input-error"></span>
    <button className="button popup__button-submit" type="submit">
      Save
    </button>
  </>
);

export const editAvatarFormElements = (
  <>
    <input
      id="avatar-input"
      className="popup__input popup__input_type_avatar"
      type="url"
      name="avatar"
      placeholder="Image link"
      required
    />
    <span className="popup__error avatar-input-error"></span>
    <button className="button popup__button-submit" type="submit">
      Save
    </button>
  </>
);

export const confirmFormElements = (
  <button className="button popup__button-submit" type="submit">
    Yes
  </button>
);
