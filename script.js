document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-solo');
    const usuarioId = localStorage.getItem('usuarioId'); // Obtém o usuário autenticado
    const phInput = document.getElementById('ph');
    const umidadeInput = document.getElementById('umidade');
    const temperaturaInput = document.getElementById('temperatura');
    const nitrogenioInput = document.getElementById('nitrogenio');
    const fosforoInput = document.getElementById('fosforo');
    const potassioInput = document.getElementById('potassio');
    const microbiomaInput = document.getElementById('microbioma');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    const mensagemErro = document.getElementById('mensagem-erro');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coleta os dados dos inputs do formulário
        const dadosSolo = {
            usuario_id: usuarioId,
            ph: parseFloat(phInput.value),
            umidade: parseFloat(umidadeInput.value),
            temperatura: parseFloat(temperaturaInput.value),
            nitrogenio: parseFloat(nitrogenioInput.value),
            fosforo: parseFloat(fosforoInput.value),
            potassio: parseFloat(potassioInput.value),
            microbioma: parseFloat(microbiomaInput.value)
        };

        // Envia os dados para o backend via POST
        fetch('https://dadoscadasolo.onrender.com/api/solo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosSolo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    mensagemSucesso.style.display = 'block';
                    mensagemErro.style.display = 'none';
                    form.reset();  // Limpa os campos após o envio
                }
            })
            .catch(error => {
                mensagemErro.style.display = 'block';
                mensagemSucesso.style.display = 'none';
            });
    });
});
