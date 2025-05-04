import Text "mo:base/Text";
import Array "mo:base/Array";

actor EchoCanister {
  // Recuerdos guardados
  stable var recuerdos: [Text] = [];

  // Credenciales fijas
  let usuarioAdmin: Text = "admin";
  let contraseniaAdmin: Text = "admin";

  // Login básico
  public func login(user: Text, pass: Text): async Bool {
    return user == usuarioAdmin and pass == contraseniaAdmin;
  };

  // Guardar recuerdo y devolver respuesta empática
  public func agregarRecuerdo(recuerdo: Text): async Text {
    recuerdos := Array.append(recuerdos, [recuerdo]);

    let respuestas = [
      "Gracias por confiarme eso. Estoy acá para escucharte.",
      "Tu recuerdo importa. Gracias por compartirlo.",
      "Qué momento tan especial. Estoy contigo.",
      "Eso suena significativo. Guardémoslo juntos.",
      "Me emociona que compartas eso conmigo."
    ];

    let idx = (Text.size(recuerdo) + Array.size(recuerdos)) % Array.size(respuestas);
    return respuestas[idx];
  };

  // Obtener recuerdos
  public query func obtenerRecuerdos(): async [Text] {
    return recuerdos;
  };
}
