import magic from "../utils/magic.cjs";

const authMiddleware = async (req, res, next) => {
    try {
        const didToken = req.headers.authorization.substring(7);
        await magic.token.validate(didToken);
        req.magicId = await magic.token.getIssuer(didToken);
        console.log("User logged in");
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

export default authMiddleware;