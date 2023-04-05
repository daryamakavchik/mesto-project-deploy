import { openPopup } from "./utils.js";

const profilePicPopup = document.querySelector(".popup-profilepic");

const addCardPopup = document.querySelector("#item-form");

export function openEditProfilePic() {
    openPopup(profilePicPopup);
}

export function openAddCardPopup() {
    openPopup(addCardPopup);
}
