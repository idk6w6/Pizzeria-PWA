'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../lib/supServer';

export async function IniciarSesion(_previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    return { error: 'Ingresa tu correo electrónico y contraseña.' };
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    return { error: 'Falta configurar la conexión con Supabase en el servidor.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    console.error('Error al iniciar sesión:', error.message);
    return { error: 'No se pudo iniciar sesión. Revisa tu correo y contraseña.' };
  }

  redirect('/inicio');
}

export async function RegistrarUsuario(_previousState, formData) {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  if (
    typeof username !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !username.trim() ||
    !email.trim() ||
    !password
  ) {
    return { error: 'Ingresa tu nombre de usuario, correo y contraseña.' };
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    return { error: 'Falta configurar la conexión con Supabase en el servidor.' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        display_name: username.trim(),
      },
    },
  });

  if (error) {
    console.error('Error al registrar usuario:', error.message);
    return { error: 'No se pudo crear la cuenta. Verifica los datos e inténtalo de nuevo.' };
  }

  if (data.session) {
    redirect('/inicio');
  }

  if (data.user) {
    redirect('/login');
  }

  throw new Error('Supabase no devolvió un usuario al completar el registro.');
}

export async function CerrarSesion() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error al cerrar sesión:', error.message);
    throw error;
  }

  redirect('/login');
}
