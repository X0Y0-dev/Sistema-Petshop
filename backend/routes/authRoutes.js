const API_CLIENTE = "http://localhost:3000/api/cliente"

function escapeHtml(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function getCliente() {
    const res = await fetch(API_CLIENTE);
    if (!res.ok) throw new Error("Falha ao buscar dados");
    return await res.json();
}

export async function fetchCliente() {
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

export function emailValido(email) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
}

export function validarCPF(cpf) {
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

export async function validarDadosCliente(validarSenha = true) {
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