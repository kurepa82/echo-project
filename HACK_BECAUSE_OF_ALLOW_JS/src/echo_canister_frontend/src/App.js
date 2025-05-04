import React, { useEffect, useState } from 'react';
import { createActor, canisterId } from '../../declarations/echo_canister_backend';
import { AuthClient } from "@dfinity/auth-client";
export default function App() {
    const [authClient, setAuthClient] = useState(null);
    const [actor, setActor] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [recuerdos, setRecuerdos] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        AuthClient.create().then(async (client) => {
            setAuthClient(client);
            if (await client.isAuthenticated()) {
                const identity = client.getIdentity();
                setActor(createActor(canisterId, { agentOptions: { identity } }));
                cargarRecuerdos(identity);
            }
        });
    }, []);
    const login = async () => {
        await authClient.login({
            identityProvider: "https://identity.ic0.app",
            onSuccess: async () => {
                const identity = authClient.getIdentity();
                setActor(createActor(canisterId, { agentOptions: { identity } }));
                cargarRecuerdos(identity);
            }
        });
    };
    const cargarRecuerdos = async () => {
        const lista = await actor.obtenerRecuerdos();
        setRecuerdos(lista);
    };
    const enviar = async () => {
        setLoading(true);
        const res = await actor.agregarRecuerdo(mensaje);
        setRespuesta(res);
        setMensaje('');
        cargarRecuerdos();
        setLoading(false);
    };
    if (!actor) {
        return (<div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>ECHO 🧠</h1>
        <p>Eco de una memoria eterna</p>
        <button onClick={login}>Iniciar sesión con Internet Identity</button>
      </div>);
    }
    return (<div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", background: "#FA6FE5", borderRadius: "10px" }}>
      <h1>ECHO 🧠</h1>
      <p>Contame un recuerdo que te gustaría que perdure con el tiempo.</p>
      <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows="4" placeholder="Tu recuerdo..." style={{ width: "100%", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}/>
      <button onClick={enviar} disabled={loading}>Guardar recuerdo</button>
      {respuesta && (<div style={{ marginTop: "1rem", background: "#fff", padding: "1rem", borderRadius: "10px" }}>
          <strong>Respuesta:</strong>
          <p>{respuesta}</p>
        </div>)}
      <h3>Mis recuerdos:</h3>
      <ul>
        {recuerdos.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>);
}
