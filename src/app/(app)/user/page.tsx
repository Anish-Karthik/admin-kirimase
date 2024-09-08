import UserList from "@/components/user/UserList";
import NewUserModal from "@/components/user/UserModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function User() {
  await checkAuth();
  const { user } = await api.user.getUsers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User</h1>
        <NewUserModal />
      </div>
      <UserList user={user} />
    </main>
  );
}
