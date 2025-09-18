// src/screen/adminlogin.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Adminlogin.css'; 

function Adminlogin() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const navigate = useNavigate();

  
  const handleLogin = (event) => {
    
    event.preventDefault(); 
    setError(''); 

   
    if (email && password) {
      console.log('Login bem-sucedido! Redirecionando...');
      
     
      navigate('/admin'); 
    } else {
      
      setError('Por favor, preencha o e-mail e a senha.');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="branding-panel">
        <div className="logo">EletroTech</div>
        <h1>Painel Administrativo</h1>
        <p>Gerenciamento de produtos, estoque e pedidos da sua loja.</p>
      </div>
      <div className="form-panel">
        <div className="form-content">
          <h2>Bem-vindo, colaborador</h2>
          <p>Faça login para acessar o dashboard.</p>
          
          {}
          {}
          <form className="admin-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="admin-email">Email Corporativo</label>
              <input 
                type="email" 
                id="admin-email" 
                name="admin-email" 
                placeholder="colaborador@eletrotech.com" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label htmlFor="admin-password">Senha</label>
              <input 
                type="password" 
                id="admin-password" 
                name="admin-password" 
                placeholder="Sua senha de acesso" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            
            {}
            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

            <div className="form-options">
              <div className="checkbox-group">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Lembrar de mim</label>
              </div>
              <Link to="/esqueci-minha-senha">Esqueceu a senha?</Link>
            </div>

            <button type="submit" className="login-button">Acessar Painel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;