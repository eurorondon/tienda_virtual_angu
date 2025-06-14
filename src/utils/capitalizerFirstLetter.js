export function capitalizeFirstLetter(str) {
  // Verifica si la cadena no está vacía
  if (str.length === 0) {
    return str; // Retorna la cadena original si está vacía
  }

  // Convierte la primera letra a mayúscula y concatena el resto de la cadena
  return str.charAt(0).toUpperCase() + str.slice(1);
}
