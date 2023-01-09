import { Router } from 'express'
import { loginCollaborator } from '../controler/loginCollaborator';
import { postCollaborator } from '../controler/postColaborator';
import { checkAdmin } from '../middleware/checkAdmin';
import { validateRole } from '../middleware/validateRole';

const collaboratorRoutes = Router()

collaboratorRoutes.post('/', validateRole, checkAdmin,postCollaborator)
collaboratorRoutes.post('/auth/login', loginCollaborator)


export { collaboratorRoutes };