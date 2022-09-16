fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
    .then(json => {
        let menu = document.getElementById('mnuUsers');
        let opciones = '';
        for (let i = 0; i < json.length; i++) {
            opciones += `<option value='${json[i].id}'>${json[i].username}</option>`;
        }
        menu.innerHTML = opciones;

    })

const menu = document.getElementById('mnuUsers');
menu.addEventListener("change", () => {
    //console.log(mnuUsers.value);
    fetch('https://jsonplaceholder.typicode.com/users/' + menu.value)
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })



})
const btnPost = document.getElementById("btnPosts");
btnPost.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=' + menu.value)
        .then((response) => response.json())
        .then((json) => {
            let divpost = document.getElementById('posts');
            let datos = '';
            json.forEach(pub => {
                datos += `
                    <div class="divpost" id="pub${pub.id}">
                    <h2>${pub.title}</h2>
                    <p>${pub.body}</p>
                    <button type="button" class="btnMostar" onclick="Mostrar(${pub.id})">Mostar comentarios</button>
                    <div class="pcomes" id="pcom${pub.id}"></div>
                    </div> 
                `;

            })
            divpost.innerHTML = datos;
        })
});

const info = document.getElementById("infoUsers");
info.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/users/' + menu.value)
        .then((response) => response.json())
        .then((json) => {
            let a = document.getElementById("infos");
            let datos = '';

            datos += `
              <div>
              <b><p>Nombre: </b>${json.name}</p>
              <p><b>Apellido:</b> ${json.username}</p>
              <p><b>Correo:</b> ${json.email}</p>
              <p><b>Telefono:</b> ${json.phone}</p>
              <p><b>Pagina Web:</b> ${json.website}</p>

              </div>
          `;
            a.innerHTML = datos;
        });

});

function Mostrar(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
        .then(response => response.json())
        .then(json => {
            let divcom = document.getElementById('pcom' + id);
            let coments = '';
            json.forEach(comment => {
                coments += `<h5>${comment.name}</h5><p>${comment.body}</p>`;
            });
            divcom.innerHTML = `${coments} <button type="button" class="btnOcultar" onclick="Ocultar(${id})">Ocultar comentarios</button>`;
        });
};

function Ocultar(id) {
    let divcom = document.getElementById('pcom' + id);
    divcom.innerHTML = "";
}
const btnNoPosts = document.getElementById('btnNoPosts');
btnNoPosts.addEventListener('click', () => {
    let ocu = document.getElementById('posts');
    ocu.innerHTML = "";
});