import transactionSchema from "../schemas/transactionSchema.js";

export function validateFormat(req, res, next){
    const body = req.body;
    const {error} = transactionSchema.validate(body,  {abortEarly: false});
    if(error) return res.status(422).send(error.details.map(detail => detail.message));

    next();
}