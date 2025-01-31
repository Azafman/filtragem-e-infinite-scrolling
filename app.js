const divPostContainer = document.querySelector('#posts-container');
const divLoader = document.querySelector('.loader');
const inputFilter = document.querySelector('#filter');

let page = 1;
let idPage = 0;


const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page${page}`);
    return response.json();
}
const htmlPostGenerator = postOfRequest => {
     return postOfRequest.map(({title, body}) => {
          idPage++;
          return `<div class="post">
              <div class="number">${idPage}</div>
              <div class="post-info">
                  <h2 class="post-title">${title}</h2>
                  <div class="post-body">${body}</div>
              </div>
          </div>`;
      });
}
const addPostsInDOM = async () => {
    const data = await getPosts();
    const postTemplate = htmlPostGenerator(data);
    divPostContainer.innerHTML += postTemplate.join('');
}
const showLoading = () => {
    divLoader.classList.add('show');
    removeShow();
}
const removeShow = () => {
    setTimeout(() => {
        divLoader.classList.remove('show');
        getNewPosts();
    }, 1000)
}
const getNewPosts = () => {
    setTimeout(() => {
         page++;
         addPostsInDOM();
    })
}
const filterPostsHTML = searchValue => el => {
     //abra map3.js
     const postTitle = el.querySelector('.post-title').textContent.toLowerCase();
     const postBody = el.querySelector('.post-body').textContent.toLowerCase();
     const postsContainSearchValue = postTitle.includes(searchValue) 
     || postBody.includes(searchValue);

     if(postsContainSearchValue) {
          el.style.display = 'flex';
          return;
     }
     el.style.display = 'none';
}
const changeInSearchField = e => {
     //input-> toda vez que o valor de input for mudado
     const searchValue = e.target.value.toLowerCase();
     const posts = document.querySelectorAll('.post');
     
     posts.forEach(filterPostsHTML(searchValue));
}
const scrollEvent = e => {
     // clientHeight -> altura visivel total do documento 
     // scrollTop -> distância entre o topo do documento e o topo visível da página
     // scrollHeight -> altura total do documento, incluindo as partes não visíveis  
     const {clientHeight, scrollHeight, scrollTop} = document.documentElement;
     const almostEndPage = scrollTop + clientHeight >= scrollHeight - 10;
         
     //altura visível do documento mais a distância existente entre o topo do site com o topo da minha visualização são maiores que a altura total(visível e invisível) do documento - 10px ?
     if(almostEndPage) { 
         showLoading();
     }
}

addPostsInDOM();

inputFilter.addEventListener('input', changeInSearchField);
window.addEventListener('scroll', scrollEvent);

/*
 Boas práticas:
 Deixe o código separa em partes -> 
 - declaração de variáveis -> separação entre let e const
 - evite expressões if muito grandes, use por exemplo códigos como os da linha 50
 - Dê bons nomes às funções. Nomes que representam o que elas fazem. Dica: faça uma pré-lista de 4 nomes candidatos, e por último escolha o nome que mais representa o papel da função.
*/