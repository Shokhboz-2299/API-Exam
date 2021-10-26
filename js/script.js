// https://jsonplaceholder.typicode.com/ 

const userUrl = "https://jsonplaceholder.typicode.com/users";
const commentUrl = "https://jsonplaceholder.typicode.com/comments";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";


fetch(userUrl)
  .then(response => response.json())
  .then(data => usersArr(data));


const elUserlist = document.querySelector(".js-user-list");
const elUserTemplete= document.querySelector("#user-templete-js").content;

const UserFragment =document.createDocumentFragment();



function usersArr(arr) {
  arr.forEach(obj => {
    function renderUsersApi(obj) {
      let user = elUserTemplete.cloneNode(true);
      user.querySelector(".full-name").textContent = `Full Name: ${obj.name}`;
      user.querySelector(".user-name").textContent = `UserName: ${obj.username}`;
      user.querySelector(".email-address").href = `mailto:${obj.email}`;
      user.querySelector(".email-address").textContent =`Email: ${obj.email}`;
      user.querySelector(".phone-number").href = `tel:${obj.phone}`;
      user.querySelector(".phone-number").textContent =`Phone number: ${obj.phone}`;
      UserFragment.appendChild(user);
    }
    renderUsersApi(obj);
  });

  elUserlist.appendChild(UserFragment);
};

