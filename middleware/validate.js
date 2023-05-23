const validator = require('../helpers/validate');
const validateTeam = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "location": "required|string",
        "sport": "required|string",
        "record": "required|string",
        "conference": "required|string",
        "seed": "required|string",
        "mascot": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const validatePlayer = async (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "position": "required|string",
        "team": "required|string",
        "birthday": "required|string",
        "height": "required|string",
        "weight": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    validateTeam, validatePlayer
};