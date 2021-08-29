export default () => {
  return {
    jwt: {
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN) || 3600,
      secret: process.env.JWT_SECRET || 'secret',
    }
  }
}