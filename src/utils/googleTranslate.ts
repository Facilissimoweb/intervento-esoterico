declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export function cleanGoogleTranslateArtifacts() {
  if (typeof document === 'undefined') return;

  // Enforce top positioning so Google Translate doesn't push down the header
  if (document.body) {
    document.body.style.top = '0px';
    document.body.style.marginTop = '0px';
    document.body.style.paddingTop = '0px';
  }
  if (document.documentElement) {
    document.documentElement.style.top = '0px';
    document.documentElement.style.marginTop = '0px';
  }
}

export function initGoogleTranslate() {
  if (typeof window === 'undefined') return;

  // Define global callback for Google Translate initialization
  window.googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'it',
          includedLanguages: 'it,fr,en,es,de,ar',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    }
  };

  // Inject script if not already added
  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }

  cleanGoogleTranslateArtifacts();
}

export function setGoogleTranslateLang(langCode: string) {
  if (typeof document === 'undefined') return;

  const target = langCode.toLowerCase();
  const cookieVal = `/it/${target}`;

  // Set Google Translate cookie
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  if (typeof window !== 'undefined') {
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=.${window.location.hostname};`;
  }

  // Trigger translation via Google Translate combo box if present
  const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (combo) {
    combo.value = target;
    combo.dispatchEvent(new Event('change'));
  } else {
    // If combo is not loaded yet, re-init or reload
    if (window.google && window.google.translate) {
      try {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'it', autoDisplay: false },
          'google_translate_element'
        );
      } catch (e) {
        // ignore
      }
    }
  }

  cleanGoogleTranslateArtifacts();
}




