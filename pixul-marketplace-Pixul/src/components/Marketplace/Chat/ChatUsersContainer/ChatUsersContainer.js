import React from "react";
import { ChatUser } from '../ChatUser/ChatUser'

export const ChatUsersContainer = ({users_info}) => {
  return (
    <div className="pt-4">
      <div className="overflow-hidden w-full px-4">
        <div className="flex items-center gap-2 w-fullbox-content overflow-x-scroll">
          {
            users_info.map(({ id, profilePicture, user_id }) => (
              <ChatUser key={user_id} image={profilePicture} user_id={user_id}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}
