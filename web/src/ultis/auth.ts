import { api } from "../resource/api";

const fakeAuthProvider = {
  isAuthenticated: false,
  async signin(user: { usercode: string, password: string }, callback: (user: any) => void) {
    const [err, result] = await api.post('/collaborator/auth/login', user)
      .then(res => [null, res?.data?.token || null])
      .catch((err) => [err, null])
      
    callback({ err, result })
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { fakeAuthProvider };