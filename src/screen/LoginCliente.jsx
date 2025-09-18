

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginCliente.css'; 

function LoginCliente() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');

    
    if (email && password) {
      console.log('Login de cliente bem-sucedido!');
      
      navigate('/'); 
    } else {
      setError('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <span className="logo">EletroTech</span>
        <h2>Bem-vindo de volta!</h2>
        <p>Acesse sua conta para continuar.</p>
      </header>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="seuemail@exemplo.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Sua senha" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

        <div className="form-options">
          <Link to="/esqueci-minha-senha">Esqueceu a senha?</Link>
        </div>

        <button type="submit" className="login-button">Entrar</button>
      </form>

      <footer className="form-footer">
        <p>Não tem uma conta? <Link to="/cadastro">Crie agora</Link></p>
      </footer>
    </div>
  );
}

export default LoginCliente;