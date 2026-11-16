import { redirect } from "next/navigation";
import Login from "./componentes/login";
import { getCurrentUser } from "./lib/supServer";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/inicio");
  }

  return <Login />;
}
