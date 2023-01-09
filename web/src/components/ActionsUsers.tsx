import { ButtonGroup, Icon } from '@chakra-ui/react'
import { UserCircleMinus } from 'phosphor-react'
import { IUser } from '../pages/Crud';
import * as Dialog from '@radix-ui/react-dialog';
import { EditUser } from './EditUser';
import { RemoveUser } from './RemoveUser';



interface IEditUser {
    row: IUser;
    editUser: (event: React.FormEvent<HTMLFormElement>, id: string) => void;
    removeUser: (event: React.FormEvent<HTMLFormElement>, id: string) => void;
    

}
export const ActionsUsers = ({ row, editUser, removeUser }: IEditUser) => {
  
    return (

        <ButtonGroup justifyContent="space-around" w="100%">

            <RemoveUser user={row} handleSubmit={removeUser} />

            <EditUser user={row} handleSubmit={editUser} />
        </ButtonGroup>

    )
}
