import { useNavigate } from "react-router-dom";
import Login from './Login';

export default function StartUpRedirect() {
    const navigate = useNavigate();

    navigate('/projects')
    return (
        <Login />
    )
}




