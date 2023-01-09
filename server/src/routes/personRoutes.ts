import { Router } from 'express'
import { postPerson } from '../controler/postPerson';
import { getPeople } from '../controler/getPeople';
import { getPerson } from '../controler/getPerson';
import { patchPerson } from '../controler/patchPerson';
import { deletePerson } from '../controler/deletePerson';
import { validateRole } from '../middleware/validateRole';

const personRoutes = Router()

personRoutes.post('/', validateRole, postPerson)
personRoutes.get('/', validateRole, getPeople)
personRoutes.get('/:id', validateRole, getPerson)
personRoutes.patch('/:id', validateRole, patchPerson)
personRoutes.delete('/:id', validateRole, deletePerson)

export { personRoutes };