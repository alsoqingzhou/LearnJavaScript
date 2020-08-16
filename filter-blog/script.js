const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// fetch posts from api
async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    const data = await res.json();

    return data;
}

// show posts in dom
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEle = document.createElement('div');
        postEle.classList.add('post');
        postEle.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;

        postsContainer.appendChild(postEle);
        console.log(post.title)
    });
}

// show loader & fetch more posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

// filter posts by input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

// show initial posts
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // scrollTop 是页面最顶端到当前滚动页面顶部的距离，可以理解为滚动过程中隐藏的距离
    // scrollHeight 是整个可以滚动的页面高度
    // clientHeight 页面视窗可见高度
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    };
});

filter.addEventListener('input', filterPosts);