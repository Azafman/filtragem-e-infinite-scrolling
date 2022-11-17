const divPostContainer = document.querySelector('#posts-container');
const divLoader = document.querySelector('.loader');
let page = 1;
let idPage = 0;

const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page${page}`);
    console.log(page);
    return response.json();
}
const addPostsInDOM = async () => {
    const data = await getPosts();
    const postTemplate = data.map(({title, body}) => {
        idPage++;
        return `<div class="post">
            <div class="number">${idPage}</div>
            <div class="post-info">
                <h2 class="post-title">${title}</h2>
                <div class="post-body">${body}</div>
            </div>
        </div>`;
    });
    divPostContainer.innerHTML += postTemplate.join('');
    //abra a documentação sobre join
    
}
addPostsInDOM();

window.addEventListener('scroll', e => {
    // clientHeight -> altura visivel total do documento 
    // scrollTop -> distância entre o topo do documento e o topo visível da página
    // scrollHeight -> altura total do documento, incluindo as partes não visíveis  
    const {clientHeight, scrollHeight, scrollTop} = document.documentElement;
    const almostEndPage = scrollTop + clientHeight >= scrollHeight - 10;

    //altura visível do documento mais a distância existente entre o topo do site com o topo da minha visualização são maiores que a altura total(visível e invisível) do documento - 10px ?
    if(almostEndPage) { 
        showLoading();
    }
})
const showLoading = () => {
    divLoader.classList.add('show');
    removeShow();
}
const removeShow = () => {
    setTimeout(() => {
        divLoader.classList.remove('show')
        getNewPosts();
    }, 1000)
}
const getNewPosts = () => {
    page++;
    addPostsInDOM();
}