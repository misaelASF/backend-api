const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../Config/auth.json');

function generateToken(params = {}){
   return jwt.sign(params, authConfig.secret, {
    expiresIn: 259200
});
}

module.exports = {
    async store(req, res) {
        try {
            const { username, email, password } = req.body;

            if(await User.findOne({ email }))
            return res.status(400).send({ err: 'Email already exists!' });

            const hash = await bcrypt.hashSync(password, 10);
            const result = await User.create({
                username,
                email,
                password: hash
            });

            result.password = undefined;
            return res.send({ 
                result,
                token: generateToken({ id: result.id }),
             });

        } catch(err) {
            return res.status(400).send({ err: 'Registration failed!' });
        }
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if(!user) return res.status(400).send({ err: 'User not found!'});
        
        if(!await bcrypt.compareSync(password, user.password))
        return res.status(400).send({ err: 'Invalid password!'});

        user.password = undefined;


        res.send({ 
            user, 
            token: generateToken({ id: user.id }) 
        });
    }
};