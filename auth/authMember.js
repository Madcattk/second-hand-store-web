import { getFromLocalStorage } from "@lib/localStorage";

export const signIn = () => {
    const auth = getFromLocalStorage('auth')

    if(auth?.Member_Id){
        return true;
    }else{
        return false;
    }
};