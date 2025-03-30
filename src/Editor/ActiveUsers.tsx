/**
 * External dependencies
 */
import { Fragment } from "react";

/**
 * Internal dependencies
 */
import { ActiveUserProfile } from "./userProfile";

type ActiveUsersProps = {
  users: ActiveUserProfile[];
};

export const ActiveUsers = ({ users }: ActiveUsersProps) => {
  const maxUsers = 5;
  // get the first 5 users
  const filteredUsers = users.slice(0, maxUsers);
  return (
    <div className="flex -space-x-2">
      {filteredUsers.map(({ name, color, userId }, idx) => {
        if (!name) {
          return null;
        }
        const firstLetter = name[0].toUpperCase();
        return (
          <Fragment key={userId}>
            <span
              className="flex select-none rounded-full w-10 h-10 justify-center items-center text-white border-2 border-white relative hover:z-10"
              style={{
                backgroundColor: color,
                zIndex: filteredUsers.length - idx,
              }}
              title={name}
            >
              {firstLetter}
            </span>
          </Fragment>
        );
      })}

      {users.length > maxUsers && (
        <span className="flex select-none rounded-full w-10 h-10 justify-center items-center text-white border-2 border-white relative hover:z-10 bg-fuchsia-700">
          +{users.length - maxUsers}
        </span>
      )}
    </div>
  );
};
