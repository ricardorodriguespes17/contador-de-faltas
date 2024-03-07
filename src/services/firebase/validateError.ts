const validateError = (errorCode: string) => {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "Dados de login incorretos, tente novamente"
    case "auth/invalid-password":
      return "Senha incorreta"
    case "auth/email-already-in-use":
      return "O nome de usuário informado já está em uso"
    default:
      return null
  }
}

export default validateError