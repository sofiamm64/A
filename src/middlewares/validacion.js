export const validacionS = (Schema) => (req,res,next) => {
    try {
        Schema.parse(req.body);
        next();
    } catch (error){
        return res.status(400).json({error: error.errors.map(error => error.message)});
    }
}