document.getElementById('soloForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário

    // Obter os valores dos campos do formulário
    const dados = {
        ph: parseFloat(document.getElementById('ph').value),
        umidade: parseFloat(document.getElementById('umidade').value),
        temperatura: parseFloat(document.getElementById('temperatura').value),
        nitrogenio: parseFloat(document.getElementById('nitrogenio').value),
        fosforo: parseFloat(document.getElementById('fosforo').value),
        potassio: parseFloat(document.getElementById('potassio').value),
        microbioma: parseFloat(document.getElementById('microbioma').value)
    };

    // Enviar os dados para a API Flask
    fetch('https://backsolo2.onrender.com/api/solo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('responseMessage');
        messageDiv.textContent = 'Dados inseridos com sucesso!';
        messageDiv.className = 'success';
    })
    .catch(error => {
        const messageDiv = document.getElementById('responseMessage');
        messageDiv.textContent = 'Erro ao cadastrar dados.';
        messageDiv.className = 'error';
        console.error('Erro:', error);
    });
});
