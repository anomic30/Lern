import magic from "./magic";

const isLogged = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    console.log("User is logged in: ", isLoggedIn);
    return isLoggedIn;
}

export default isLogged;