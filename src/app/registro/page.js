import { redirect } from 'next/navigation';
import Registro from '../componentes/registro';
import { getCurrentUser } from '../lib/supServer';

export default async function RegistroPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/producto');
  }

  return <Registro />;
}
