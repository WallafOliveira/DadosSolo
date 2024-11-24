// Login do usuário
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('https://backsolo2.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciais inválidas');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('usuario_id', data.usuario_id); // Armazena o usuário logado
        document.getElementById('loginMessage').textContent = 'Login realizado com sucesso!';
        document.getElementById('loginMessage').className = 'success';

        // Mostra o formulário de dados do solo
        document.getElementById('soloContainer').style.display = 'block';
    })
    .catch(error => {
        document.getElementById('loginMessage').textContent = 'Erro no login: ' + error.message;
        document.getElementById('loginMessage').className = 'error';
    });
});

// Cadastro de dados do solo
document.getElementById('soloForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const usuarioId = localStorage.getItem('usuario_id'); // Recupera o ID do usuário logado

    if (!usuarioId) {
        alert('Você precisa estar logado para cadastrar dados do solo.');
        return;
    }

    const dados = {
        usuario_id: usuarioId,
        ph: parseFloat(document.getElementById('ph').value),
        umidade: parseFloat(document.getElementById('umidade').value),
        temperatura: parseFloat(document.getElementById('temperatura').value),
        nitrogenio: parseFloat(document.getElementById('nitrogenio').value),
        fosforo: parseFloat(document.getElementById('fosforo').value),
        potassio: parseFloat(document.getElementById('potassio').value),
        microbioma: parseFloat(document.getElementById('microbioma').value)
    };


    fetch('https://backsolo2.onrender.com/api/solo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
