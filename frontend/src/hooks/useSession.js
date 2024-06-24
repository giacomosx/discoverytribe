import {jwtDecode} from "jwt-decode";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const useAuth = () => {
    const [params] = useSearchParams()
    const tokenParams = params.get('token') ? params.get('token') : null;
    if (!tokenParams) {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        return token
    } else {
        localStorage.setItem('token', tokenParams)
        return tokenParams
    }
}

export const useSession = () => {
    const session = useAuth()
    const decodedSession = session ? jwtDecode(session) : null
    const navigate = useNavigate();

    const currentDate = new Date();

    let expiredSession = currentDate > new Date(decodedSession?.exp * 1000)

    useEffect(() => {
        if (expiredSession) {
            navigate("/login");
        }
    }, [session, navigate]);


    return {
        decodedSession,
        expiredSession
    }
}