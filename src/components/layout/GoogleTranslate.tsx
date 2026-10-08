'use client';

import { useEffect } from 'react';
import { leerIdioma } from '@/lib/idioma';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate: { TranslateElement: new (options: object, elementId: string) => unknown } };
  }
}

// Google Translate swaps text nodes for <font> wrappers, which makes React throw
// when it later removes or reorders those nodes. Ignore operations on detached children.
function protegerReact() {
  const proto = Node.prototype as Node & { __gtPatched?: boolean };
  if (proto.__gtPatched) return;
  proto.__gtPatched = true;

  const removeChild = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child) as T;
  };

  const insertBefore = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insertBefore.call(this, node, ref) as T;
  };
}

/** Loads Google Translate only when English is selected; Spanish (default) loads nothing. */
export default function GoogleTranslate() {
  useEffect(() => {
    if (leerIdioma() !== 'en') return;
    protegerReact();

    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: 'es', includedLanguages: 'en,es', autoDisplay: false },
        'google_translate_element'
      );
    };

    if (!document.getElementById('google-translate-script')) {
      const s = document.createElement('script');
      s.id = 'google-translate-script';
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return <div id="google_translate_element" className="hidden" aria-hidden />;
}
