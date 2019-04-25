const Revenue = require('../Models/Revenue');

module.exports = {
    async store(req, res) {
        try {
            const result = await Revenue.create(req.body);
            return res.json({ result });
        } catch(err) {
            return res.status(400).send({ err: 'Registration failed!' });
        }
    },

    async index(req, res) {
         const { name, categories, page = 1 } = req.query;
        try {
            if(categories){
                const result2 = await Revenue.paginate({ categories: req.query.categories }, { page, limit: 10 });
                return res.json({ result2 });
            } else if(name) {
                const result1 = await Revenue.paginate({ name }, { page, limit: 10 });
                return res.json({ result1 });
            } else {
                const result = await Revenue.paginate({}, { page, limit: 10 });
                return res.json({ result });
            }
        } catch(err) {
            return res.status(400).send({ err: 'Operation failed!'});
        }
    },

    async show(req, res) {
        try {
            const result = await Revenue.findById(req.params.id);
            return res.json({ result });
        } catch(err) {
            return res.status(400).send({ err: 'Operation failed! '});
        }
    },

    async destroy(req, res) {
        try {
            const consult = await Revenue.findById(req.params.id);
            await Revenue.findByIdAndDelete(consult);
            return res.json({});
        } catch(err) {
            return res.status(400).send({ err: 'Operation failed! '});
        }
    }

}