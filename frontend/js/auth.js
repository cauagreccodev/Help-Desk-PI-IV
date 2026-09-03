/* ============================================
   HELP DESK PI IV — Lógica de Autenticação
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Referências DOM
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const btnLogin = document.getElementById('btnLogin');

    // API URL BASE
    const API_URL = 'http://localhost:8000/api';

    // ── Handler Login ──
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

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
                loginError.textContent = data.error || 'Erro ao realizar login. Verifique suas credenciais.';
                loginError.style.display = 'block';
            }
        } catch (error) {
            console.error('Login error:', error);
            loginError.textContent = 'Erro de conexão com o servidor. Tente novamente mais tarde.';
            loginError.style.display = 'block';
        } finally {
            btnLogin.disabled = false;
            btnLogin.textContent = 'Entrar no HelpDesk';
        }
    });
});
