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
        const list = document.getElementById("clienteList");
        
        // Se não estiver na página que tem a lista, simplesmente retorna
        if (!list) return;

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Renderiza a lista no DOM apenas se o elemento existir
        list.innerHTML = "";
        data.forEach(cliente => {
            const li = document.createElement("li");
            li.id = `cliente-${cliente.id}`;
            li.innerHTML = `
                <span>${escapeHtml(cliente.nome)} - ${escapeHtml(cliente.email)} - ${escapeHtml(cliente.senha)}</span>
                <button onclick="editCliente('${cliente.id}', '${escapeHtml(cliente.nome)}', '${escapeHtml(cliente.email)}', '${escapeHtml(cliente.senha)}')">Editar</button>
                <button onclick="deleteCliente('${cliente.id}')">Excluir</button>
            `;
            list.appendChild(li);
        });

        return data;
    } catch (error) {
        console.error("Erro ao buscar itens:", error);
        // Não mostra alerta se não for a página de cadastro
        if (document.getElementById("clienteList")) {
            alert("Falha ao carregar itens.");
        }
    }
}

function emailValido(email) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
}

async function criarEatualizarCliente() {
    const nome = document.getElementById("nome")?.value;
    const email = document.getElementById("email")?.value;
    const senha = document.getElementById("senha")?.value;

    // Verifica se estamos na página de cadastro
    if (nome === undefined || email === undefined || senha === undefined) return; {

        // Verificação de e-mail duplicado (só para criação, não para edição)
        if (!editingId) {
            const cliente = await getCliente();
            if (cliente.some(cliente => cliente.email === email)) {
                alert("E-mail já cadastrado.");
                return;
            }
        }

        // --- Validações ANTES da requisição ---
        if (!nome || !email || !senha) {
            return alert("Por favor, preencha todos os campos solicitados.");
        }

        if (nome.length < 3 || nome.length > 50) {
            alert("O nome de usuário deve ter entre 3 a 50 caracteres.");
            return;
        }

        if (email.length < 8 || email.length > 100) {
            alert("O e-mail deve ter entre 8 e 100 caracteres.");
            return;
        }

        if (!emailValido(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        if (senha.length < 8 || senha.length > 50 || !senha.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)) {
            alert("A senha deve ter 8 a 50 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
            return;
        }

        // --- Requisição à API ---
        try {
            if (editingId) {
                await fetch(`${API_URL}/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome, email, senha })
                });
            } else {
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome, email, senha })
                });
                alert("Conta criada com sucesso!");
                window.location.href = "index.html"
            }

            // Limpa campos após sucesso
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("senha").value = "";
            document.getElementById("addButton").innerText = "Adicionar";
            editingId = null;

            // Atualiza a lista
            await fetchCliente();
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            alert("Falha ao salvar. Tente novamente.");
        }
    }
}
async function deletarCliente(id) {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Falha ao excluir");
        await fetchCliente();
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Não foi possível excluir.");
    }
}

function editarCliente(id, nome, email, senha) {
    document.getElementById("nome").value = nome
    document.getElementById("email").value = email
    document.getElementById("senha").value = senha
    document.getElementById("addButton").innerText = "Atualizar"
    editingId = id
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