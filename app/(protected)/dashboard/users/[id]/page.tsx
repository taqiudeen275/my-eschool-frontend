import UserForm from "../components/UserForm";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id, 10);

  return (
    <div>
      <h1>Edit User</h1>
      <UserForm userId={userId} />
    </div>
  );
}