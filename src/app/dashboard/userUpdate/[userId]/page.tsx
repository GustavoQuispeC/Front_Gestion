import { UserFormUpdate } from "@/components";

type Props = {
  params: {
    userId: string;
  };
};

const UserFormUpdatePage = ({ params }: Props) => {
  const userId = params.userId;

  if (!userId) {
    return <div>Usuario no encontrado.</div>;
  }

  return (
    <div>
      <UserFormUpdate userId={userId} />
    </div>
  );
};

export default UserFormUpdatePage;
