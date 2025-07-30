"use client";

import { UserFormUpdate } from "@/components";
import { useParams } from "next/navigation";


export default function UserFormUpdatePage() {
  const params = useParams();
  const userId = params?.userId as string;

  if (!userId) return <div>Usuario no encontrado.</div>;

  return <UserFormUpdate userId={userId} />;
}
