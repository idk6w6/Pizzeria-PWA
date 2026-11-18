    import { createServerClient } from "@supabase/ssr";
    import { cookies } from "next/headers";
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    
    export const createClient = async() => {
        const cookieStore = await cookies ();
    return createServerClient(
        supabaseUrl,
        supabaseKey,
        {
        cookies: {
            getAll() {
            return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
            try {
                cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {

            }
            },
        },
        },
    );
    };

export async function getCurrentUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        if (error.name === "AuthSessionMissingError") {
            return null;
        }

        if (
            error.code === "refresh_token_not_found" ||
            error.message?.includes("Refresh Token")
        ) {
            return null;
        }

        console.error("Error al obtener la sesión:", error.message);
        throw error;
    }

    return user;
}