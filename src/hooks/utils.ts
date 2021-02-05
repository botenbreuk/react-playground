import { CurrentUser } from '../domain';

export function rollenCheck(rol: string, currentUser: CurrentUser) {
  return currentUser.rol === rol;
}
