import { User } from 'src/components/user'
import usersJson from 'src/mock/users.json'

export const getUsers = () => {
  return usersJson as User[]
}
