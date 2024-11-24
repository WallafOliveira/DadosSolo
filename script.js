document.getElementById('soloForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário para processar com JavaScript

    // Obter os valores dos campos do formulário e garantir que sejam válidos
    const dados = {
        ph: parseFloat(document.getElementById('ph').value),
        umidade: parseFloat(document.getElementById('umidade').value),
        temperatura: parseFloat(document.getElementById('temperatura').value),
        nitrogenio: parseFloat(document.getElementById('nitrogenio').value),
        fosforo: parseFloat(document.getElementById('fosforo').value),
        potassio: parseFloat(document.getElementById('potassio').value),
        microbioma: parseFloat(document.getElementById('microbioma').value)
    };

    // Validar se os valores dos campos estão corretos (ex: não podem ser NaN)
    for (let key in dados) {
        if (isNaN(dados[key])) {
            alert(`Por favor, insira um valor válido para ${key}`);
            return;
        }
    }

    // Enviar os dados para a API Flask
    fetch('https://backsolo2.onrender.com/api/solo', {  // Verifique se o URL está correto
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)  // Envia os dados como JSON
    })
    .then(response => response.json())  // Converte a resposta da API para JSON
    .then(data => {
        const messageDiv = document.getElementById('responseMessage');
        messageDiv.textContent = 'Dados inseridos com sucesso!';
        messageDiv.className = 'success';  // Adiciona uma classe de sucesso
    })
    .catch(error => {
        const messageDiv = document.getElementById('responseMessage');
        messageDiv.textContent = 'Erro ao cadastrar dados.';
        messageDiv.className = 'error';  // Adiciona uma classe de erro
        console.error('Erro:', error);  // Log de erro no console
    });
});
