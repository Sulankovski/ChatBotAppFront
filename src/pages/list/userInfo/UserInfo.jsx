import "./UserInfo.css";
import SignOut from "../../signOut/SignOut";

const userDTO = JSON.parse(localStorage.getItem('userDTO'));

const UserInfo = () => {
    return (
        <div className="userInfoContainer">
            <h4 className="userInfo me-2">{userDTO.name}</h4>
            <SignOut />
        </div>
    );
}

export default UserInfo;
