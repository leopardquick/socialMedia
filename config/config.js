const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: 'mongodb+srv://admin-n:Kuntakinte@cluster0.fbqm9.mongodb.net/mernSocial'
}
export default config



