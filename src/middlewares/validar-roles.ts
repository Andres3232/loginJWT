

export const esAdminRole = (req, res,next ) => {
    
    
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { Rol, username } = req.usuario;

    if( Rol !== 'admin' ){
        return res.status(401).json({
            msg: `${ username } no es administrador-No puede hacer esto`
        });
    }

    next()
}