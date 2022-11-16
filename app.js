let page = 1;

const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&page${page}`)
    const data = await response.json();
    console.log(data);
}
getPosts()