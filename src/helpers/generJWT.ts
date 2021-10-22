import jwt from 'jsonwebtoken'

export const generarJWT = ( id = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { id };

        jwt.sign( payload, '123', {
            expiresIn: '4h'
        },( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo gener el token' );
            } else {
                resolve( token );
            }

        })

    })



}

