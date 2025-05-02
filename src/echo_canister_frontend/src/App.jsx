import React, { useState } from 'react';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../../declarations/echo_canister_backend'; // Ruta corregida

// 🔐 Canister ID en red ICP directamente
const canisterId = "divnu-2yaaa-aaaaj-az72q-cai";

export default function App() {
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    setLoading(true);
    setRespuesta('');

    try {
      // 🌐 Importante: especificamos el host de ICP mainnet
      const agent = new HttpAgent({ host: "https://icp-api.io" });

      const backend = Actor.createActor(idlFactory, {
        agent,
        canisterId,
      });

      const resp = await backend.responder(mensaje);
      setRespuesta(resp);
    } catch (error) {
      console.error('Error al contactar al canister:', error);
      setRespuesta('Hubo un error al contactar al canister.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <h1>ECHO 🧠</h1>
      <p>Ingresá tu mensaje para que la IA lo procese y lo almacenemos como un recuerdo.</p>
      <textarea
        rows="4"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="¿Qué recordás hoy?"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={enviar} disabled={loading}>
        {loading ? 'Guardando recuerdo...' : 'Guardar recuerdo'}
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
