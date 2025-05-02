import Array "mo:base/Array";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";

actor EchoCanister {

  var recuerdos : [Text] = [];

  let frases : [Text] = [
    "Qué lindo recuerdo: ",
    "Gracias por compartir eso. Me alegra que recuerdes: ",
    "Recordar es volver a vivir: ",
    "Eso suena importante: ",
    "Qué momento especial: "
  ];

  public func responder(mensaje : Text) : async Text {
    recuerdos := Array.append<Text>(recuerdos, [mensaje]);

    let hashNat32 : Nat32 = Text.hash(mensaje);
    let hashNat : Nat = Nat32.toNat(hashNat32);
    let index : Nat = hashNat % frases.size();

    let respuesta = frases[index] # "\"" # mensaje # "\". ¿Querés contarme más?";
    return respuesta;
  };

  public query func listarRecuerdos() : async [Text] {
    recuerdos
  }

}
