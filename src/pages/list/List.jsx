import "./list.css"

import ListChatRoom from "./listChatRooms/ListChatRoom"
import UserInfo from "./userInfo/UserInfo"

const List = () => {
  return (
      <div className='list bg-secondary'>
          <UserInfo/>
          <ListChatRoom/>
      </div>
  )
}

export default List