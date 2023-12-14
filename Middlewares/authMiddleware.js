
module.exports = {
    APIauth: async (req, res, next) => {
        try {   
            const authheader = req.headers.authorization;
            console.log(req.headers);
         
            if (!authheader) {
                let err = new Error('You are not authenticated!');
                res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
                return next(err)
            }
         
            const auth = new Buffer.from(authheader.split(' ')[1],
                'base64').toString().split(':');
            const user = auth[0];
            const pass = auth[1];
         
            if (user == process.env.API_USER && pass == process.env.API_PASS) {
                console.log("User is Authorised");
                // If Authorized user
                next();
            } else {
                let err = new Error('You are not authenticated!');
                res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
                return next(err);
            }
        } catch (error) {
          console.log(error);
        }
      }
}