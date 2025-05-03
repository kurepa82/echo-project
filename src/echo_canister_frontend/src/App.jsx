import React, { useState } from 'react';
import { echo_canister_backend } from "../../declarations/echo_canister_backend";

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);

  const respuestasEmpaticas = [
    "Gracias por confiarme eso. Estoy acá para escucharte.",
    "Tu recuerdo importa. Gracias por compartirlo.",
    "Qué momento tan especial. Estoy contigo.",
    "Eso suena significativo. Guardémoslo juntos.",
    "Me emociona que compartas eso conmigo.",
  ];

  const handleLogin = async () => {
    try {
      const ok = await echo_canister_backend.login(username, password);
      if (ok) {
        setIsAuthenticated(true);
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (err) {
      console.error("Error en login:", err);
      alert("Hubo un error intentando ingresar.");
    }
  };

  const enviar = async () => {
    if (!mensaje.trim()) return;
    setLoading(true);
    setRespuesta('');
    try {
      await echo_canister_backend.agregarRecuerdo(mensaje);
      const aleatoria = respuestasEmpaticas[Math.floor(Math.random() * respuestasEmpaticas.length)];
      setRespuesta(aleatoria);
      setMensaje('');
    } catch (err) {
      console.error("Error al guardar el recuerdo:", err);
      setRespuesta("Hubo un error al contactar al servidor.");
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: 420, margin: 'auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>ECHO 🧠</h1>
        <p style={{ fontStyle: 'italic', color: '#555' }}>Eco de una memoria eterna</p>
        <input
          type="text"
          placeholder="Usuario (sugerido: admin)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '0.6rem', margin: '1rem 0', borderRadius: '6px' }}
        />
        <input
          type="password"
          placeholder="Contraseña (sugerida: admin)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem', borderRadius: '6px' }}
        />
        <button onClick={handleLogin} style={{ padding: '0.6rem 1.2rem', borderRadius: '6px', background: '#444', color: 'white' }}>
          Ingresar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: 'auto' }}>
      <h1>ECHO 🧠</h1>
      <p>Contame un recuerdo que te gustaría que perdure con el tiempo.<br />Puede ser algo que te haga revivir un momento significativo de tu vida.</p>
      <textarea
        rows="5"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Por ejemplo: El aroma del pan recién horneado en la cocina de mi abuela..."
        style={{ width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button onClick={enviar} disabled={loading} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: '#222', color: '#fff' }}>
        {loading ? 'Guardando...' : 'Guardar recuerdo'}
      </button>

      {respuesta && (
        <div style={{ marginTop: '2rem', background: '#f1f1f1', padding: '1.2rem', borderRadius: '10px' }}>
          <strong>Respuesta:</strong>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
}
