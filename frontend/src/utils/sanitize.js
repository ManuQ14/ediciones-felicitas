// Caracteres prohibidos en inputs de texto
const FORBIDDEN = /[<>{}|\\^`]/g;

/**
 * Limpia un valor de input eliminando caracteres peligrosos en tiempo real.
 * Se aplica en onChange de cada campo controlado.
 */
export const sanitize = (value) =>
  typeof value === 'string' ? value.replace(FORBIDDEN, '') : value;

/**
 * Handler genérico para forms con estado { [name]: value }.
 * Sanitiza automáticamente todos los campos de texto.
 */
export const makeSanitizedHandler = (setter) => (e) => {
  const { name, type, value, checked } = e.target;
  setter((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : sanitize(value),
  }));
};
