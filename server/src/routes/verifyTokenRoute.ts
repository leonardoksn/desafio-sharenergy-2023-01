import { Router } from 'express'
import { getHttpCat } from '../controler/getHttpCat';
import { loginCollaborator } from '../controler/loginCollaborator';
import { postCollaborator } from '../controler/postColaborator';
import { verifyToken } from '../controler/verifytoken';
import { checkAdmin } from '../middleware/checkAdmin';
import { validateRole } from '../middleware/validateRole';

const tokenRoute = Router()

tokenRoute.post('/auth/token', verifyToken)


export { tokenRoute };