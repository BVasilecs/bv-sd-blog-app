const posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

const titleInputNode = document.querySelector(".js-title-input");
const textInputNode = document.querySelector(".js-text-input");
const postBtnNode = document.querySelector(".js-post-btn");
const postsNode = document.querySelector(".js-posts");
const errorFieldNode = document.querySelector(".js-error-field");
const titleCounterNode = document.querySelector(".js-title-char-counter");
const textCounterNode = document.querySelector(".js-text-char-counter");

const ERROR_TITLE = `Заголовок больше ${TITLE_VALIDATION_LIMIT} символов`;
const ERROR_TEXT = `Пост больше ${TEXT_VALIDATION_LIMIT} символов`;
const MISSING_TITLE = "Не хватает заголовка";
const MISSING_TEXT = "Не хватает текста поста";

titleInputNode.addEventListener("input", function() {
    validation();
    titleCharCounter();
});

textInputNode.addEventListener("input", function() {
    validation();
    textCharCounter();
});

postBtnNode.addEventListener("click", function() {
    if (titleInputNode.value.trim().length > TITLE_VALIDATION_LIMIT || textInputNode.value.trim().length > TEXT_VALIDATION_LIMIT || titleInputNode.value.trim().length == 0 || textInputNode.value.trim().length == 0) {
        return;
    }
    
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
});

function validation () {
    const titleLen = titleInputNode.value.trim().length;
    const textLen = textInputNode.value.trim().length;

    if (titleLen === 0) {
        errorFieldNode.innerHTML = MISSING_TITLE;
        errorFieldNode.classList.remove("error-field_hidden");
        postBtnNode.disabled = true;
        return;
    }

    if (titleLen > TITLE_VALIDATION_LIMIT) {
        errorFieldNode.innerHTML = ERROR_TITLE;
        errorFieldNode.classList.remove("error-field_hidden");
        postBtnNode.disabled = true;
        return;
    }

    if (textLen === 0) {
        errorFieldNode.innerHTML = MISSING_TEXT;
        errorFieldNode.classList.remove("error-field_hidden");
        postBtnNode.disabled = true;
        return;
    }

    if (textLen > TEXT_VALIDATION_LIMIT) {
        errorFieldNode.innerHTML = ERROR_TEXT;
        errorFieldNode.classList.remove("error-field_hidden");
        postBtnNode.disabled = true;
        return;
    }

    errorFieldNode.classList.add("error-field_hidden");
    postBtnNode.disabled = false;
}

function getCurrentFormattedDate() {
    let date = new Date();

    // Extract date components
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    // Construct the final formatted string
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}



function getPostFromUser () {
    const date = getCurrentFormattedDate();
    const title = titleInputNode.value.trim();
    const text = textInputNode.value.trim();
    
    return {
        date: date,
        title: title,
        text: text
    };
}

function addPost({date, title, text}) {
    posts.push({
        date: date,
        title: title,
        text: text
    });
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = "";

    posts.forEach(post => {
        postsHTML += `
            <div class="post">
                <h3 class="post__date">${post.date}</h3>
                <h2 class="post__title">${post.title}</h2>
                <p class="post__text">${post.text}</p>
            </div>
        `
    });

    postsNode.innerHTML = postsHTML;
}

function titleCharCounter() {
    titleCounterNode.innerHTML = `${titleInputNode.value.length}/${TITLE_VALIDATION_LIMIT}`;
    if (titleInputNode.value.length > TITLE_VALIDATION_LIMIT) {
        titleCounterNode.classList.add("limit-reached");
        return;
    }
    titleCounterNode.classList.remove("limit-reached");
}

function textCharCounter() {
    textCounterNode.innerHTML = `${textInputNode.value.length}/${TEXT_VALIDATION_LIMIT}`;
    if (textInputNode.value.length > TEXT_VALIDATION_LIMIT) {
        textCounterNode.classList.add("limit-reached");
        return;
    }
    textCounterNode.classList.remove("limit-reached");
}