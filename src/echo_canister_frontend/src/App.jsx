// Archivo: App.jsx - Frontend React para ECHO conectado a backend Node.js con ChatGPT

import React, { useState } from 'react';

export default function App() {
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    setLoading(true);
    setRespuesta('');
    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje }),
      });

      const data = await res.json();
      setRespuesta(data.respuesta);
    } catch (error) {
      console.error('Error al contactar al backend:', error);
      setRespuesta('Hubo un error al contactar al servidor.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <h1>ECHO 🧠</h1>
      <p>Ingresá tu mensaje para que la IA lo procese.</p>
      <textarea
        rows="4"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="¿Qué recordás hoy?"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={enviar} disabled={loading}>
        {loading ? 'Procesando...' : 'Enviar mensaje'}
      </button>

      {respuesta && (
        <div style={{ marginTop: '2rem', background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
          <strong>Respuesta:</strong>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
}
