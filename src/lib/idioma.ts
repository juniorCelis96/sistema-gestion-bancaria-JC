export type Idioma = 'es' | 'en';

export const IDIOMAS: { code: Idioma; label: string; short: string; flag: string }[] = [
  { code: 'es', label: 'Español', short: 'ES', flag: '/img/bandera_espana.png' },
  { code: 'en', label: 'Inglés', short: 'EN', flag: '/img/bandera_ingles.png' },
];

const COOKIE = 'googtrans';

export function leerIdioma(): Idioma {
  if (typeof document === 'undefined') return 'es';
  return new RegExp(`(?:^|;\\s*)${COOKIE}=/es/en`).test(document.cookie) ? 'en' : 'es';
}

export function cambiarIdioma(idioma: Idioma) {
  if (idioma === leerIdioma()) return;
  const host = window.location.hostname;
  const expira = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  // Google Translate may write the cookie on the bare host or on the parent domain
  document.cookie = `${COOKIE}=; ${expira}`;
  document.cookie = `${COOKIE}=; ${expira}; domain=${host}`;
  document.cookie = `${COOKIE}=; ${expira}; domain=.${host}`;
  if (idioma === 'en') {
    document.cookie = `${COOKIE}=/es/en; path=/; max-age=31536000`;
  }
  window.location.reload();
}
