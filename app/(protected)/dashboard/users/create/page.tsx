// app/(protected)/users/create/page.tsx

import UserForm from "../components/UserForm";

export default function CreateUserPage() {
  return (
    <div>
      <h1>Create User</h1>
      <UserForm />
    </div>
  );
}