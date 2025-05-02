actor EchoCanister {

  public query func responder(mensaje : Text) : async Text {
    "Qué lindo recuerdo: \"" # mensaje # "\". ¿Querés contarme más?"
  }

}
