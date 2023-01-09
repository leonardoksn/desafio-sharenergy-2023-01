import { Router } from 'express'
import { getHttpCat } from '../controler/getHttpCat';
import { loginCollaborator } from '../controler/loginCollaborator';
import { postCollaborator } from '../controler/postColaborator';
import { checkAdmin } from '../middleware/checkAdmin';
import { validateRole } from '../middleware/validateRole';

const catRoute = Router()

catRoute.get('/:status',getHttpCat )


export { catRoute };