const API_URL = "http://localhost:3000/api/cliente"
let editingId = null


// Função auxiliar para evitar XSS
function escapeHtml(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function getCliente() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Falha ao buscar dados");
    return await res.json();
}

async function fetchCliente() {
    try {
        const list = document.getElementById("listaClientes");
        if (!list) return;

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        list.innerHTML = "";
        data.forEach(cliente => {
            const li = document.createElement("li");
            li.id = `cliente-${cliente.id_cliente}`;
            li.innerHTML = `
                <div>
                    <li>Nome:${escapeHtml(cliente.nome_cliente)}</li> 
                    <li>Sobrenome: ${escapeHtml(cliente.sobrenome_cliente)}</li>
                    <li>Tel: ${escapeHtml(cliente.telefone)}</span>
                    <li>CPF: ${escapeHtml(cliente.cpf)}</span>
                    <li>Email: ${escapeHtml(cliente.email)}</li>
                    <li>Senha: ${escapeHtml(cliente.senha)}</li>
                </div>
                <div>
                    <button class="botao-primario conteudo" onclick="editarCliente('${cliente.id_cliente}', '${escapeHtml(cliente.nome_cliente)}', '${escapeHtml(cliente.sobrenome_cliente)}', '${escapeHtml(cliente.telefone)}', '${escapeHtml(cliente.cpf)}', '${escapeHtml(cliente.email)}', '${escapeHtml(cliente.senha)}')">Editar</button>
                    <button class="botao-primario conteudo" onclick="deletarCliente('${cliente.id_cliente}')">Excluir</button>
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

async function criarEatualizarCliente() {
    const nome_cliente = document.getElementById("nome_cliente")?.value;
    const sobrenome_cliente = document.getElementById("sobrenome_cliente")?.value;
    const telefone = document.getElementById("telefone")?.value;
    const cpf = document.getElementById("cpf")?.value;
    const email = document.getElementById("email")?.value;
    const senha = document.getElementById("senha")?.value;

    // Verifica se estamos na página de cadastro
    if (nome_cliente === undefined || sobrenome_cliente === undefined || telefone === undefined || cpf === undefined || email === undefined || senha === undefined) return;

    // Verificação de e-mail duplicado (só para criação, não para edição)
    if (!editingId) {
        const cliente = await getCliente();
        if (cliente.some(cliente => cliente.email === email)) {
            alert("E-mail já cadastrado.");
            return;
        }
    }

    // --- Validações ANTES da requisição ---
    if (!nome_cliente || !sobrenome_cliente || !telefone || !cpf || !email || !senha) {
        return alert("Por favor, preencha todos os campos solicitados.");
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

    if (senha.length < 8 || senha.length > 50 || !senha.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)) {
        alert("Senha inválida. A senha deve ter 8 a 50 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
        return;
    }

    // --- Requisição à API ---
    try {
        let url = API_URL;
        let method = "POST";

        // Se estiver editando, muda a URL e o método
        if (editingId) {
            url = `${API_URL}/${editingId}`;
            method = "PUT";
        }

        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome_cliente,
                sobrenome_cliente,
                telefone,
                cpf,
                email,
                senha
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Falha ao ${editingId ? 'atualizar' : 'criar'} cliente`);
        }

        alert(`Cliente ${editingId ? 'atualizado' : 'criado'} com sucesso!`);

        // Limpa o formulário e o editingId após sucesso
        if (!editingId) {
            window.location.href = "index.html";
        } else {
            document.getElementById("nome_cliente").value = "";
            document.getElementById("sobrenome_cliente").value = "";
            document.getElementById("telefone").value = "";
            document.getElementById("cpf").value = "";
            document.getElementById("email").value = "";
            document.getElementById("senha").value = "";
            document.getElementById("addButton").innerText = "Adicionar";
            editingId = null;
            await fetchCliente();
        }
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
        const res = await fetch(`${API_URL}/${id}`, {  // Corrigido: usando o parâmetro 'id'
            method: "DELETE"
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Falha ao excluir");
        }
        alert("Conta excluida com sucesso!");
        await fetchCliente();  // Corrigido: chamando fetchCliente() em vez de fetchItems()
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert(`Não foi possível excluir: ${error.message}`);
    }
}

function editarCliente(id_cliente, nome_cliente, sobrenome_cliente, telefone, cpf, email, senha) {
    document.getElementById("nome_cliente").value = nome_cliente
    document.getElementById("sobrenome_cliente").value = sobrenome_cliente
    document.getElementById("telefone").value = telefone
    document.getElementById("cpf").value = cpf
    document.getElementById("email").value = email
    document.getElementById("senha").value = senha
    document.getElementById("addButton").innerText = "Atualizar"
    editingId = id_cliente
}

async function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        return alert("Por favor, preencha todos os campos.");
    }

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!res.ok) {
            throw new Error(`Erro HTTP! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
            alert("Login bem-sucedido!");
            window.location.href = "index.html";
            // Armazena o usuário no localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            alert(data.message || "E-mail ou senha incorretos.");
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Tente novamente.");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Verifica em qual página estamos
    const isCadastroPage = window.location.pathname.includes('Cadastro.html');
    const isLoginPage = window.location.pathname.includes('Login.html');

    // Executa fetchCliente apenas na página de cadastro
    if (isCadastroPage) {
        fetchCliente();
    }

    // Configura o botão de login se estiver na página de login
    if (isLoginPage) {
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', login);
        }
    }
});

fetchCliente()