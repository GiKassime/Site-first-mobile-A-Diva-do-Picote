const preloader = document.querySelector('.preloader')
const mensagem = document.querySelector('.modal h2')
const fundo = document.querySelector('.fundo-escuro');
const modal = document.querySelector('.modal');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 


window.onload = () => {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('cadastro.html')) {
        setTimeout(() => {
            preloader.style.display = "none"; 
            deslogarUsuarios();
        }, 5000);
    } else {
        const usuarioLogado = usuarios.find(usuario => usuario.logado === true); 
        if (!usuarioLogado) {
            Modal();
            mensagem.textContent = "Faça seu Login primeiro para desfrutar de nossos serviços!";
            modal.style.backgroundColor = "#B6FFA1";
            setTimeout(() => {
                window.location.href = 'index.html';
                Modal();
            }, 1500);
        }
        mostrarUsuario();
    }
}


function MenuAbreFecha() {
    const menuHamburguer = document.querySelector('.menu-hamburguer')
    const seta = document.querySelector('.menu-icone-fecha')
    console.log("to aqui")
    menuHamburguer.classList.toggle('fechado')
    seta.classList.toggle('fechado')
}

//Esse aqiu é quando for login

function logaUsuario(event){
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
    let usuarioEncontrado = false;
    usuarios.forEach(usuario => {
        if (usuario.nome === nome && usuario.senha === senha) {
            usuarioEncontrado = true
            modal.style.backgroundColor = "#B6FFA1"; 
            usuario.logado = true; 
            localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
            Modal()
            mensagem.textContent = "Bem vindo "+nome+" desfrute nossos serviços!";
            modal.style.backgroundColor = "#B6FFA1"
            setTimeout(() => {
                Modal()
                window.location.href = 'servicos.html'
        
            }, 1500);
        }
    });
    if (!usuarioEncontrado) {
        Modal()
        modal.style.backgroundColor = "#E195AB";
        mensagem.textContent = "Usuário ou senha incorretos"
        setTimeout(() => {
            Modal()
        }, 1200);
    }
}

//esse é pra cadastrar
function cadastrarUsuario(event){
    event.preventDefault()
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
    const nomeExistente = usuarios.find(usuario => usuario.nome === nome);//procura se tem um nome igual
    if (nomeExistente) {
        mensagem.textContent = "Nome de usuário já existe!";
        modal.style.backgroundColor = "#E195AB";
        Modal();
        setTimeout(() => {
            Modal();
        }, 1200);
        return;
    }
    const usuario = {
        nome: nome,
        senha: senha,
        logado: false,
        reservas: []
    };
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    Modal()
    mensagem.textContent = "Usuário "+nome+" Cadastrado, faça seu Login!";
    modal.style.backgroundColor = "#B6FFA1"
    setTimeout(() => {
        Modal()
        window.location.href = 'index.html'

    }, 1500);
}



function Modal() {
    fundo.classList.toggle('aparecendo');
    modal.classList.toggle('aparecendo');
}

function deslogarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.forEach(usuario => {
        if (usuario.logado == true) {
            usuario.logado = false;
        }
    });
    console.log(usuarios);
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
    if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('cadastro.html')) {
        window.location.href = 'index.html'
    }
}

function mostrarUsuario() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioLogado = usuarios.find(usuario => usuario.logado === true);
    
    if (usuarioLogado) {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.classList.add('usuario');

        const imgPerfil = document.createElement('img');
        imgPerfil.src = 'img/user.png'; 

        const nomeUsuario = document.createElement('h2');
        nomeUsuario.textContent = usuarioLogado.nome; 

        const imgLogout = document.createElement('img');
        imgLogout.src = 'img/power.png';

        imgLogout.addEventListener('click', () => {
            deslogarUsuarios(); 
        });

        usuarioDiv.appendChild(imgPerfil);
        usuarioDiv.appendChild(nomeUsuario);
        usuarioDiv.appendChild(imgLogout);

        document.body.prepend(usuarioDiv); 
    }
}



