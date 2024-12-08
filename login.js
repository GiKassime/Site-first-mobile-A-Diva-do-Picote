const preloader = document.querySelector('.preloader')
const mensagem = document.querySelector('.preloader h1')




window.onload = () => {
    setTimeout(() => {
        preloader.style.display ="none";
    }, 1500);
}

function MenuAbreFecha() {
    const menuHamburguer = document.querySelector('.menu-hamburguer')
    const seta = document.querySelector('.menu-icone-fecha')
    console.log("to aqui")
    menuHamburguer.classList.toggle('fechado')
    seta.classList.toggle('fechado')
}

//Esse aqiu é quando for login
document.querySelector('.login form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
    let usuarioEncontrado = false;
    usuarios.forEach(usuario => {
        if (usuario.nome === nome && usuario.senha === senha) {
            usuarioEncontrado = true;
            preloader.style.backgroundColor = "#4CAF50";  
            mensagem.textContent = "Usuário encontrado, redirecionando...";

            setTimeout(() => {
                preloader.style.display = "none";  
                window.location.href = 'servicos.html';  
            }, 2000);  
        }
    });
    if (!usuarioEncontrado) {
        preloader.style.backgroundColor = "#E195AB";
        mensagem.textContent = "Usuário ou senha incorretos"
        setTimeout(() => {
            preloader.style.display = "none";
            window.location.href = 'login.html'
        }, 1200);
    }
});

//esse é pra cadastrar

document.querySelector('.cadastro form').addEventListener('submit', function(event) {
    event.preventDefault()
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
    const usuario = {
        nome: nome,
        senha: senha
    };
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setTimeout(() => {
        preloader.style.display = "none";
    }, 1500);
    window.location.href = 'login.html'
})
