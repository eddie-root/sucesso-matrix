import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    const { adminToken } = req.cookies;

    if (!adminToken) {
        return res.json({ success: false, message: 'Não Autorizado' });
    }

    try {
        const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);
        if (tokenDecode.email === process.env.ADMIN_EMAIL) {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'Não Autorizado' });
        }
        
    } catch (error) {
        res.status(401).json({ success: false, message: 'Inválido Token' });
    }
};

export default authAdmin;

