import magic from './magic'; // Assuming you have imported the 'magic' library
import Cookies from 'js-cookie';
import Axios from 'axios';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

export const checkAuth = async (setAuth, setUser, logout) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const authData = await magic.user.getInfo();
    const newToken = await magic.user.getIdToken({lifespan: 24 * 60 * 60});
    Cookies.set('token', newToken);
    setAuth(authData);

    try {
        const userResp = await Axios.get(APP_SERVER + "/api/user/data", {
            headers: {
                Authorization: "Bearer " + newToken
            }
        });
        console.log(userResp.data.userData)
        setUser(userResp.data.userData);
    } catch (error) {
        alert("Something went wrong!")
        console.log(error);
    }
  } else {
    logout();
  }
};