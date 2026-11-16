import Login from '../componentes/login';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../lib/supServer';

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/producto');
  }

  return <Login />;
}
