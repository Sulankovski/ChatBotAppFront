import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userDTO');
        navigate('/');
    };

    return (
        <button onClick={handleSignOut} className={"p-2 btn buttonColor"}>
            Sign Out
        </button>
    );
};

export default SignOut;
