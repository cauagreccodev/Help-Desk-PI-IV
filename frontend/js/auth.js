/* ============================================
   HELP DESK PI IV — Lógica de Autenticação
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Referências DOM - Animação UI
    const signUpButton = document.getElementById('signUpGhost');
    const signInButton = document.getElementById('signInGhost');
    const authCard = document.getElementById('authCard');

    // Referências DOM - Formulários
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');

    // API URL BASE
    const API_URL = 'http://localhost:8000/api';

    // ── Transição de Painéis ──
    signUpButton.addEventListener('click', () => {
        authCard.classList.add("right-panel-active");
        loginError.style.display = 'none';
    });

    signInButton.addEventListener('click', () => {
        authCard.classList.remove("right-panel-active");
        registerError.style.display = 'none';
    });

    // ── Handler Login ──
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const btnLogin = document.getElementById('btnLogin');

        btnLogin.disabled = true;
        btnLogin.textContent = 'Entrando...';
        loginError.style.display = 'none';

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Sucesso: Salvar token e user no localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirecionar para Dashboard
                window.location.href = 'index.html';
            } else {
                loginError.textContent = data.error || 'Erro ao realizar login.';
                loginError.style.display = 'block';
            }
        } catch (error) {
            console.error('Login error:', error);
            loginError.textContent = 'Erro de conexão com o servidor.';
            loginError.style.display = 'block';
        } finally {
            btnLogin.disabled = false;
            btnLogin.textContent = 'Entrar';
        }
    });

    // ── Handler Registro ──
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const jobTitle = document.getElementById('regJobTitle').value;
        const department = document.getElementById('regDepartment').value;
        const password = document.getElementById('regPassword').value;
        const btnRegister = document.getElementById('btnRegister');

        btnRegister.disabled = true;
        btnRegister.textContent = 'Cadastrando...';
        registerError.style.display = 'none';

        // Por padrão, novos usuários pelo painel são 'usuario' (Client)
        const role = 'usuario';

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, jobTitle, department, password, role })
            });

            const data = await response.json();

            if (response.ok) {
                // Sucesso no registro
                alert('Conta criada com sucesso! Você já pode fazer login.');
                registerForm.reset();
                authCard.classList.remove("right-panel-active");
            } else {
                registerError.textContent = data.error || 'Erro ao criar conta.';
                registerError.style.display = 'block';
            }
        } catch (error) {
            console.error('Register error:', error);
            registerError.textContent = 'Erro de conexão com o servidor.';
            registerError.style.display = 'block';
        } finally {
            btnRegister.disabled = false;
            btnRegister.textContent = 'Cadastrar';
        }
    });
});
