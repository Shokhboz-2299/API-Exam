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
      user.querySelector(".user-name").textContent = `${obj.username}`;
      user.querySelector(".email-address").href = `mailto:${obj.email}`;
      user.querySelector(".email-address").textContent =`${obj.email}`;
      user.querySelector(".phone-number").href = `${obj.phone}`;
      user.querySelector(".phone-number").textContent =`Phone number: ${obj.phone}`;
      user.querySelector(".user-website").href =`https://${obj.website}`;
      user.querySelector(".user-website").textContent =`${obj.website}`;
      user.querySelector(".user-company").textContent = `name: ${obj.company.name}; catchPhrase: ${obj.company.catchPhrase}`;
      user.querySelector(".user-address").textContent = `street: ${obj.address.street}; city: ${obj.address.city}`;
      user.querySelector(".btn-posts-js").setAttribute("data-id", `${obj.id}`);
      UserFragment.appendChild(user);
    }
    renderUsersApi(obj);
  });

  elUserlist.appendChild(UserFragment);
};

// ============================================
// ====================POSTS====================
// =============================================



// post-title
// post-body

const elPostlist = document.querySelector(".js-post-list");
const elPostTemplete= document.querySelector("#post-templete-js").content;

const PostFragment =document.createDocumentFragment();

function postShow(id) {
  let Renderfunction = (post) => {
    let elPostList = elPostTemplete.cloneNode(true);
    elPostList.querySelector(".post-title").textContent = post.title;
    elPostList.querySelector(".btn-commend-js").setAttribute('data-id', `${post.id}`);
    elPostList.querySelector(".post-body").textContent = post.body;
    PostFragment.appendChild(elPostList);
  }
  fetch(postsUrl)
  .then(response => response.json())
  .then(data => newPost(data));

  
  function newPost(array) {
    let posts =array.filter((evt) => evt.userId == id)

    posts.forEach((post) => {
      Renderfunction(post);
    });
    
    elPostlist.appendChild(PostFragment);
  };

};


// ==============COMMENTS============================



const elCommentlist = document.querySelector(".js-comment-list");
const elCommentTemplete= document.querySelector("#comment-templete-js").content;

const CommentFragment =document.createDocumentFragment();

let CommentFunction = (id) => {
  let CommentRender =(comments) => {
    let comment = elCommentTemplete.cloneNode(true);
    comment.querySelector(".comment-title").textContent = comments.name;
    comment.querySelector(".comment-email").textContent= comments.email;
    comment.querySelector(".comment-email").href =`mailto: ${comments.email}`;
    comment.querySelector(".comment-body").textContent = comments.body;

    CommentFragment.appendChild(comment);
  }

  let newFunction =(array) => {
    let arrayComment = array.filter((evt) => evt.postId == id)
    arrayComment.forEach((comment) => {
      CommentRender(comment);
    });

    elCommentlist.appendChild(CommentFragment);
  };

  fetch(commentUrl).then((response) => response.json())
  .then((data) => newFunction(data));
};

// ============= ADDING NEW DATA ===========================

elUserlist.addEventListener('click', (evt) => {
  elPostlist.innerHTML = "";
  postShow(evt.target.dataset.id);
});

elPostlist.addEventListener("click", function(evt) {
  elCommentlist.innerHTML = "";
  CommentFunction(evt.target.dataset.id);
})


