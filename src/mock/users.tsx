import { User } from '../components/user'
import usersJson from './users.json'

export const getUsers = () => {
  return usersJson as User[]
}
