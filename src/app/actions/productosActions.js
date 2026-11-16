"use server";

import { createClient } from "../lib/supServer";

class Producto {
    constructor(id, nombre, descripcion, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen
    }
}

export async function getProductos() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("productos")
    .select("id, nombre, descripcion, precio, imagen");

  if (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }

  const products = data.map((item) => ({
    ...new Producto(item.id, item.nombre, item.descripcion, item.precio, item.imagen)
  }));

  console.log(products);
  return products
}
