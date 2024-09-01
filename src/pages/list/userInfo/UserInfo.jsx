import "./UserInfo.css"

const userDTO = JSON.parse(localStorage.getItem('userDTO'));
const UserInfo = () => {
    console.log(userDTO)
    return (
        <div className={"p-1 ms-1 pt-2 mt-1"}>
            <h4 className={"userInfo"}>{userDTO.name + " " + userDTO.lastName}</h4>
        </div>
    )
}

export default UserInfo