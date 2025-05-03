import Text "mo:base/Text";
import Array "mo:base/Array";

actor RecuerdoActor {
  // Estado estable para guardar recuerdos
  stable var recuerdos : [Text] = [];

  // Usuario y contraseña (sin ñ)
  let usuarioAdmin : Text = "admin";
  let contrasenaAdmin : Text = "admin";

  // Función privada para validar credenciales
  private func esAdmin(user: Text, pass: Text) : Bool {
    return user == usuarioAdmin and pass == contrasenaAdmin;
  };

  // Función pública de login
  public func login(user: Text, pass: Text) : async Bool {
    return esAdmin(user, pass);
  };

  // Función pública para agregar un recuerdo
  public func agregarRecuerdo(recuerdo: Text) : async Text {
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

  // Función pública para obtener los recuerdos
  public query func obtenerRecuerdos() : async [Text] {
    return recuerdos;
  };
}
