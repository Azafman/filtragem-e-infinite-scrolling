let page = 1;

const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&page${page}`)
    // const data = await response.json();//response.json() retorna uma promise por isso é necessário usar o await -> neste caso o motor Js, não irá para linha de baixo enquanto não entregar a promessa resolvida
    // response.json().then(console.log)
    // console.log(data);
    //se eu for jogar uma promessa em variável é necessário usar await. Assim sendo a variável terá o valor resolvido; ou seja, não será usado o .then
    //Caso contrário, eu não use uma variável é necessário usar o .then() para pegar o resultado da promessa
    // const data = await response.json();
    response.json().then(console.log)//neste caso enquanto, a promise está sendo processada, o restante do código vai sendo executado, e quando a promessa estiver resolvida será lançada no console.
    // ai está a diferença -> coódigo síncrono e assíncono
    console.log('data');
    console.log('as');
}
getPosts()