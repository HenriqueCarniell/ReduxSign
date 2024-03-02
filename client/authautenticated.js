let ensureAuthenticated = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.json({msg: "Token inválido"});
    }

    const [, token] = authHeader.split(" ")

    try {
       const {sub: idusuario} = jwt.verify(token, authConfig.jwt.secret)
    
       req.user = {
        id: Number(idusuario)
       }

       return next();
    } catch {
        return res.json({error: "Logue para acessar essa rota"});
    }
}

module.exports = ensureAuthenticated