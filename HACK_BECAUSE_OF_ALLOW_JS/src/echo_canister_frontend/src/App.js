"use client"

import { useEffect, useState } from "react"
import { Brain, Heart, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
// Mock implementations for preview
const mockAuthClient = {
  create: () =>
    Promise.resolve({
      login: async (options) => {
        // Simulate login success
        setTimeout(() => options.onSuccess(), 1000)
      },
      isAuthenticated: () => Promise.resolve(false),
      getIdentity: () => ({ getPrincipal: () => "mock-principal" }),
    }),
}

const mockActor = {
  obtenerRecuerdos: async () => {
    // Mock data for preview
    return [
      "El día que nació mi primer nieto, sus pequeñas manos se aferraron a mi dedo y supe que el amor puede multiplicarse infinitamente.",
      "Recuerdo las tardes de domingo cuando abuela nos contaba historias mientras preparaba su famoso pastel de manzana.",
      "La primera vez que papá me enseñó a andar en bicicleta en el parque. Su voz diciéndome 'no tengas miedo, yo te sostengo' aún resuena en mi corazón.",
    ]
  },
  agregarRecuerdo: async (mensaje) => {
    return `Tu hermoso recuerdo ha sido guardado con amor. Cada palabra es un tesoro que perdurará para siempre.`
  },
}

const createActor = () => mockActor
const AuthClient = { create: mockAuthClient.create }

export default function App() {
  const [authClient, setAuthClient] = useState(null)
  const [actor, setActor] = useState(null)
  const [mensaje, setMensaje] = useState("")
  const [respuesta, setRespuesta] = useState("")
  const [recuerdos, setRecuerdos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client)
      if (await client.isAuthenticated()) {
        const identity = client.getIdentity()
        setActor(createActor())
        cargarRecuerdos(identity)
      }
    })
  }, [])

  const login = async () => {
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity()
        setActor(createActor())
        cargarRecuerdos(identity)
      },
    })
  }

  const cargarRecuerdos = async () => {
    const lista = await actor.obtenerRecuerdos()
    setRecuerdos(lista)
  }

  const enviar = async () => {
    setLoading(true)
    const res = await actor.agregarRecuerdo(mensaje)
    setRespuesta(res)
    setMensaje("")
    cargarRecuerdos()
    setLoading(false)
  }

  // Página de login
  if (!actor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-violet-100 to-purple-300 flex flex-col items-center justify-center p-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800">ECHO</h1>
            <Brain className="w-16 h-16 text-purple-600" />
          </div>
          <p className="text-xl text-purple-700 italic font-medium">Preservando voces que nunca queremos olvidar</p>
        </div>

        {/* Login Card */}
        <Card className="w-full max-w-md bg-white/90 shadow-xl border-purple-200">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bienvenido a ECHO</h2>
              <p className="text-purple-600 mb-6">Un lugar seguro para tus memorias más preciadas</p>
            </div>

            <Button
              onClick={login}
              className="w-full h-14 bg-purple-700 hover:bg-purple-800 text-white text-lg font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Iniciar sesión con Internet Identity
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Dashboard principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-violet-100 to-purple-300 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">ECHO</h1>
            <Brain className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-lg text-purple-700">Cada recuerdo es un tesoro que merece ser preservado</p>
        </div>

        {/* Formulario para nuevo recuerdo */}
        <Card className="mb-8 bg-white/90 shadow-xl border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Plus className="w-5 h-5" />
              Comparte un nuevo recuerdo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-purple-600">Cuéntanos un recuerdo que te gustaría que perdure con el tiempo.</p>

            <Textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe aquí tu recuerdo más preciado..."
              className="min-h-[120px] border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl"
            />

            <Button
              onClick={enviar}
              disabled={loading || !mensaje.trim()}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded-xl h-12"
            >
              {loading ? "Guardando tu recuerdo..." : "Guardar recuerdo"}
            </Button>

            {respuesta && (
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <p className="text-purple-800 font-medium">Respuesta:</p>
                  <p className="text-purple-700">{respuesta}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Lista de recuerdos */}
        <Card className="bg-white/90 shadow-xl border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Clock className="w-5 h-5" />
              Tus recuerdos guardados ({recuerdos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recuerdos.length === 0 ? (
              <p className="text-purple-600 text-center py-8 italic">
                Aún no has guardado ningún recuerdo. ¡Comparte tu primera memoria!
              </p>
            ) : (
              <div className="space-y-4">
                {recuerdos.map((recuerdo, index) => (
                  <Card key={index} className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4">
                      <p className="text-purple-800 leading-relaxed">{recuerdo}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
