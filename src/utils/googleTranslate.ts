declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export function initGoogleTranslate() {
  if (document.getElementById('google-translate-script')) return;

  window.googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'it',
          autoDisplay: false,
          includedLanguages: 'it,fr,en,es,de,ar',
        },
        'google_translate_element'
      );
    }
  };

  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.type = 'text/javascript';
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

export function setGoogleTranslateLang(langCode: string) {
  // Set google translate cookies for path / and domain
  const targetVal = `/it/${langCode}`;
  document.cookie = `googtrans=${targetVal}; path=/;`;
  document.cookie = `googtrans=${targetVal}; path=/; domain=${window.location.hostname};`;

  // Trigger Google Translate combo select element if mounted
  const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
  } else {
    // If combo isn't ready yet or needed, reload to apply cookie
    setTimeout(() => {
      window.location.reload();
    }, 150);
  }
}
