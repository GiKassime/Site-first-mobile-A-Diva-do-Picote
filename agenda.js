window.onload = carregarReservas(),mostrarUsuario();  
function carregarReservas() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];  
    const usuarioLog = usuarios.find(usuario => usuario.logado === true);

    const reservas = usuarioLog.reservas;
    const divMaior = document.querySelector('.agenda'); 
    if (reservas.length === 0) {
        const div = document.createElement('div');
        div.classList.add('reserva');
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Você não tem reservas ainda';
        div.appendChild(mensagem);
        divMaior.appendChild(div);
    } else {
        reservas.forEach(reserva => {
            const div = document.createElement('div');
            div.classList.add('reserva');

            const nome = document.createElement('p');
            nome.textContent = reserva.nome;

            const data = document.createElement('p');
            const dataFormatada = new Date(reserva.data).toLocaleDateString('pt-BR');
            data.textContent = dataFormatada;

            const hora = document.createElement('p');
            hora.textContent = reserva.hora+'hrs';

            const servico = document.createElement('p');
            servico.textContent = reserva.servico;

            const img = document.createElement('img');
            img.src = "img/servico/"+reserva.servico+".png";  

            div.appendChild(img);
            div.appendChild(nome);
            div.appendChild(data);
            div.appendChild(hora);
            div.appendChild(servico);

            divMaior.append(div);
        });
    }
}
