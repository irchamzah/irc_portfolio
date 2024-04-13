import { fetchCommunities } from "@/lib/actions/community.actions";
import UserCard from "../cards/UserCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUsers } from "@/lib/actions/user.actions";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const suggestedUsers = await fetchUsers({ userId: user.id, pageSize: 4 });

  const suggestedCommunities = await fetchCommunities({ pageSize: 4 });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        <div className="mt-7 flex flex-col gap-9 w-[350px]">
          {suggestedCommunities.communities.length > 0 ? (
            <>
              {suggestedCommunities.communities.map((community) => (
                <UserCard
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p>No communities yet</p>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <div className="mt-7 flex flex-col gap-9 w-[350px]">
          {suggestedUsers.users.length > 0 ? (
            <>
              {suggestedUsers.users.map((user) => (
                <UserCard
                  id={user.id}
                  name={user.name}
                  username={user.username}
                  imgUrl={user.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p>No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
