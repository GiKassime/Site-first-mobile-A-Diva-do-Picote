//Peguei na internet pra ver a data atual e só permitir que marque la nos serviços de hoje em diante
const inputData = document.getElementById('data');
const hoje = new Date().toISOString().split('T')[0];
inputData.setAttribute('min', hoje);

function cadastrarReserva(){
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico =  document.getElementById('servico').value;
    const observacao =  document.getElementById('observacoes').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioLog = usuarios.find(usuario=> usuario.logado ==true)
    const novaReserva = {
        nome: nome,
        telefone: telefone,
        data: data,
        hora: hora,
        servico: servico,
        observacao: observacao,
    };
    usuarioLog.reservas.push(novaReserva);
    const indiceUsuario = usuarios.indexOf(usuarioLog);
    usuarios[indiceUsuario] = usuarioLog; // Que trampo viu
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log(usuarios)
    mensagem.textContent = usuarioLog.nome + " reserva feita com sucesso, verifique na agenda!";
    modal.style.backgroundColor = "#B6FFA1";
    Modal();

    setTimeout(() => {
        Modal();
        window.location.href = 'agenda.html'; 
    }, 2000); 
}
