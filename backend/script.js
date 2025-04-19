const API_CLIENTE = "http://localhost:3000/api/cliente"
const API_PET = "http://localhost:3000/api/pet"
let editingId = null


// Função auxiliar para evitar XSS
function escapeHtml(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function getCliente() {
    const res = await fetch(API_CLIENTE);
    if (!res.ok) throw new Error("Falha ao buscar dados");
    return await res.json();
}

async function fetchCliente() {
    try {
        const list = document.getElementById("listaClientes");
        if (!list) return;

        const res = await fetch(API_CLIENTE);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        list.innerHTML = "";
        data.forEach(cliente => {
            const li = document.createElement("li");
            li.id = `cliente-${cliente.id_cliente}`;
            li.innerHTML = `
                <div class="dados-texto">
                    <p><strong>Nome:</strong> ${escapeHtml(cliente.nome_cliente)}</p>
                    <p><strong>Sobrenome:</strong> ${escapeHtml(cliente.sobrenome_cliente)}</p>
                    <p><strong>Telefone:</strong> ${escapeHtml(cliente.telefone)}</p>
                    <p><strong>CPF:</strong> ${escapeHtml(cliente.cpf)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(cliente.email)}</p>
                </div>
                
                <div class="botoes-container">
                    <div class="botoes-superiores botoes-conta">
                        <button class="botao-primario btn-editar" onclick="editarCliente('${cliente.id_cliente}', '${escapeHtml(cliente.nome_cliente)}', '${escapeHtml(cliente.sobrenome_cliente)}', '${escapeHtml(cliente.telefone)}', '${escapeHtml(cliente.cpf)}', '${escapeHtml(cliente.email)}')">Editar</button>
                        <button class="botao-primario" onclick="deletarCliente('${cliente.id_cliente}')">Excluir</button>
                    </div>
                    <div class="botoes-inferiores">
                        <button class="botao-primario botao-logout" onclick="logout()">Logout</button>
                        <button class="botao-primario botao-voltar" onclick="window.location.href='index.html'">Voltar</button>
                    </div>
                </div>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        if (document.getElementById("listaClientes")) {
            alert("Falha ao carregar clientes.");
        }
    }
}

function emailValido(email) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // remove pontos e traço

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Validar 1º dígito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let dig1 = 11 - (soma % 11);
    if (dig1 >= 10) dig1 = 0;

    // Validar 2º dígito
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    let dig2 = 11 - (soma % 11);
    if (dig2 >= 10) dig2 = 0;

    // Verifica se os dígitos batem
    return cpf[9] == dig1 && cpf[10] == dig2;
}

async function validarDadosCliente(validarSenha = true) {
    const nome_cliente = document.getElementById("nome_cliente")?.value;
    const sobrenome_cliente = document.getElementById("sobrenome_cliente")?.value;
    const telefone = document.getElementById("telefone")?.value;
    const cpf = document.getElementById("cpf")?.value;
    const email = document.getElementById("email")?.value;
    const senha = document.getElementById("senha")?.value;

    // Verifica se estamos na página de cadastro
    if (
        nome_cliente === undefined ||
        sobrenome_cliente === undefined ||
        telefone === undefined ||
        cpf === undefined ||
        email === undefined ||
        (validarSenha && senha === undefined) // Só valida a existência da senha se for pra validar mesmo
    ) {
        alert("Algo deu errado ao capturar os campos. Tente recarregar a página.");
        return;
    }

    // Verificação de e-mail duplicado (só para criação, não para edição)
    if (!editingId) {
        const cliente = await getCliente();
        if (cliente.some(cliente => cliente.email === email)) {
            alert("E-mail já cadastrado.");
            return;
        }
    }

    // --- Validações ANTES da requisição ---
    if (
        !nome_cliente ||
        !sobrenome_cliente ||
        !telefone ||
        !cpf ||
        !email ||
        (validarSenha && !senha)
    ) {
        alert("Por favor, preencha todos os campos solicitados.");
        return;
    }

    if (nome_cliente.length < 3 || nome_cliente.length > 50) {
        alert("O nome de usuário deve ter entre 3 a 50 caracteres.");
        return;
    }

    if (sobrenome_cliente.length < 3 || sobrenome_cliente.length > 50) {
        alert("O sobrenome de usuário deve ter entre 3 a 50 caracteres.");
        return;
    }

    if (telefone.length < 17) {
        alert("Telefone inválido. O telefone deve ser feito no seguinte modelo: +99 (99) 99999-9999.");
        return;
    }

    if (!validarCPF(cpf)) {
        alert("CPF inválido. O CPF deve ser feito no seguinte modelo: 999.999.999-99.");
        return;
    }

    if (email.length < 8 || email.length > 100) {
        alert("E-mail inválido. O e-mail deve ter entre 8 e 100 caracteres.");
        return;
    }

    if (!emailValido(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    if (validarSenha && (senha.length < 8 || senha.length > 50 || !senha.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/))) {
        alert("Senha inválida. A senha deve ter 8 a 50 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
        return;
    }
    const resultado = {
        nome_cliente,
        sobrenome_cliente,
        telefone,
        cpf,
        email
    };

    if (validarSenha && senha) {
        resultado.senha = senha;
    } else if (!validarSenha && senha) {
        resultado.senha = senha; // só envia se foi digitada durante edição
    }

    return resultado;
}

async function criarCliente() {
    const dadosCliente = await validarDadosCliente(true);
    if (!dadosCliente) return;

    try {
        const response = await fetch(API_CLIENTE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosCliente)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Falha ao criar cliente");
        }

        alert("Cliente criado com sucesso!");
        alert("Por favor, efetue o login!");
        window.location.href = "Login.html";

    } catch (error) {
        console.error("Erro detalhado:", error);
        alert(error.message);
    }
}

async function deletarCliente(id) {
    if (!id) {
        console.error("ID não fornecido para exclusão.");
        return;
    }

    if (!confirm("Tem certeza que deseja excluir a conta?")) return;

    try {
        const res = await fetch(`${API_CLIENTE}/${id}`, {  // Corrigido: usando o parâmetro 'id'
            method: "DELETE"
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Falha ao excluir");
        }

        localStorage.removeItem('token')

        alert("Conta excluida com sucesso!");
        window.location.href = "index.html";
        await fetchCliente();  // Corrigido: chamando fetchCliente() em vez de fetchItems()
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert(`Não foi possível excluir: ${error.message}`);
    }
}

function editarCliente(id_cliente, nome_cliente, sobrenome_cliente, telefone, cpf, email) {
    console.log("Editando:", { id_cliente, nome_cliente, sobrenome_cliente, telefone, cpf, email }); // Debug

    const formEdicao = document.getElementById("form-edicao");
    if (formEdicao) {
        // Preenche os campos
        document.getElementById("nome_cliente").value = nome_cliente || '';
        document.getElementById("sobrenome_cliente").value = sobrenome_cliente || '';
        document.getElementById("telefone").value = telefone || '';
        document.getElementById("cpf").value = cpf || '';
        document.getElementById("email").value = email || '';

        const btnAtualizar = document.getElementById("btn-atualizar");

        // Limpa qualquer evento anterior
        btnAtualizar.onclick = null;

        // Adiciona novo listener
        btnAtualizar.onclick = function () {
            atualizarCliente(id_cliente);
        };

        // Alterna a visibilidade
        document.getElementById("listaClientes").style.display = "none";
        formEdicao.style.display = "block";
        editingId = id_cliente;
    }
}

async function atualizarCliente(id) {
    const dadosCliente = await validarDadosCliente(false);
    console.log("Dados para atualizar:", dadosCliente);
    if (!dadosCliente) return;

    try {
        const response = await fetch(`${API_CLIENTE}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosCliente)
        });

        if (!response.ok) throw new Error("Falha na atualização");

        const infos = await response.json();
        console.log("Resposta da API:", infos);

        if (response.ok) {
            // Atualiza o token APENAS se existir na resposta
            if (infos.token) {
                localStorage.setItem('token', JSON.stringify(infos.token));
            }
            alert("Dados atualizados com sucesso!");
        }

        cancelarEdicao();
        fetchCliente();
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        alert("Erro ao atualizar dados");
    }
}

async function validarDadosPet() {
    const nome_pet = document.getElementById("nome_pet")?.value;
    const especie = document.getElementById("especie")?.value;
    const raca = document.getElementById("raca")?.value;
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value;
    const peso = document.getElementById("peso")?.value;
    const tamanho = document.getElementById("tamanho")?.value;
    const castrado = document.querySelector('input[name="castrado"]:checked')?.value;

    // Checa existência de campos obrigatórios
    if (
        nome_pet === undefined ||
        especie === undefined ||
        sexo === undefined ||
        castrado === undefined
    ) {
        alert("Algo deu errado ao capturar os campos. Tente recarregar a página.");
        return;
    }

    // Validação dos campos obrigatórios
    if (!nome_pet || 
        !especie || 
        !sexo) {
        alert("Por favor, preencha os campos obrigatórios: Nome, Espécie e Sexo.");
        return;
    }

    if (nome_pet.length < 2 || nome_pet.length > 50) {
        alert("O nome do pet deve ter entre 2 e 50 caracteres.");
        return;
    }

    if (especie.length < 3 || especie.length > 50) {
        alert("A espécie deve ter entre 3 e 50 caracteres.");
        return;
    }

    if (raca && raca.length > 30) {
        alert("A raça do pet deve ter no máximo 30 caracteres.");
        return;
    }

    if (peso) {
        const pesoFloat = parseFloat(peso);
        if (isNaN(pesoFloat) || pesoFloat <= 0) {
            alert("O peso deve ser um número positivo.");
            return;
        }
    }

    if (tamanho && tamanho.length > 50) {
        alert("O tamanho deve ter no máximo 50 caracteres.");
        return;
    }

    // Cria objeto final
    const resultado = {
        nome_pet,
        especie,
        raca,
        sexo,
        peso: peso ? parseFloat(peso) : null,
        tamanho,
        castrado: castrado === "true"
    };

    return resultado;
}

async function criarPet(event) {
    event.preventDefault();

    const dadosPet = await validarDadosPet();
    if (!dadosPet) return;

    try {
        const token = JSON.parse(localStorage.getItem('token'));
        const id_cliente = getIdFromToken(token); // <- você pode extrair isso do token JWT, se estiver codificado com o `id`

        const dadosComCliente = {
            ...dadosPet,
            id_cliente
        };
        console.log("Enviando para o banco:", dadosComCliente);
        const res = await fetch(API_PET, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosComCliente)
        });

        if (!res.ok) throw new Error("Erro ao cadastrar o pet.");

        const pet = await res.json();
        if(pet.success) {
            alert("Pet cadastrado com sucesso!");
            localStorage.setItem('pet', JSON.stringify(pet));
            window.location.href = "Servico.html";
        }

    } catch (error) {
        console.error("Erro ao cadastrar pet:", error);
        alert("Erro ao cadastrar o pet.");
    }
}

//função para decodificar o token
function getIdFromToken(token) {
    try {
        const payloadBase64 = token.split('.')[1]; // pega só o payload (parte do meio do JWT)
        const payloadJson = atob(payloadBase64);   // decodifica de base64
        const payload = JSON.parse(payloadJson);   // converte pra objeto JS
        return payload.id; // <-- esse campo precisa existir no token gerado pelo backend
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
}

function cancelarEdicao() {
    document.getElementById("listaClientes").style.display = "block";
    document.getElementById("form-edicao").style.display = "none";
    editingId = null;
}

async function login() {
    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;

    if (!email || !senha) {
        return alert("Por favor, preencha todos os campos.");
    }

    try {
        const res = await fetch(`${API_CLIENTE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!res.ok) throw new Error(`Erro HTTP! status: ${res.status}`);

        const data = await res.json();

        if (data.success) {
            alert("Login bem-sucedido!");
            localStorage.setItem('token', JSON.stringify(data.token));
            // Armazena o usuário no localStorage
            window.location.href = "index.html";
        } else {
            alert(data.message || "E-mail ou senha incorretos.");
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Tente novamente.");
    }
}

function logout() {
    if (confirm('Deseja realmente sair da sua conta?')) {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
}

async function verificarLogin(event) {
    //Impede que o botão faça alguma ação inesperada antes de terminar de verificação
    event.preventDefault();

    // Verifica se há dados de usuário no localStorage
    const userData = localStorage.getItem('token');

    if (userData) {
        const destino = event.currentTarget.getAttribute("redirecionar-destino");
        if (destino) {
            window.location.href = destino;
        } else {
            console.warn("Destino não encontrado.")
        }
    } else {
        // Usuário não está logado - mostra alerta e redireciona para login
        alert("Para ver os dados de sua conta, você precisa efetuar o login!");
        window.location.href = 'Login.html';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const botoesProtegidos = document.querySelectorAll("[redirecionar-destino]");

    botoesProtegidos.forEach(botao => {
        botao.removeEventListener('click', verificarLogin); // preventiva
        botao.addEventListener('click', verificarLogin);
    });

    // --- Verificação de Página Específica ---
    const isCadastroPage = window.location.pathname.includes('Cadastro.html');
    const isAgendarPage = window.location.pathname.includes('Agendar.html');
    const isLoginPage = window.location.pathname.includes('Login.html');

    // Página de Cadastro: Carrega dados do cliente
    if (isCadastroPage) fetchCliente();
    if (isAgendarPage) fetchCliente();

    // Página de Login: Configura o botão de login
    if (isLoginPage) {
        const botaoLogin = document.getElementById('botaoLogin');
        if (botaoLogin) {
            botaoLogin.addEventListener('click', login);
        }
    }
});

fetchCliente()