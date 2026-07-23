declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

let isCleanerRunning = false;

export function cleanGoogleTranslateArtifacts() {
  if (typeof document === 'undefined') return;

  // Reset top positioning enforced by Google Translate on body & html
  if (document.body && document.body.style.top !== '0px') {
    document.body.style.top = '0px';
    document.body.style.marginTop = '0px';
    document.body.style.paddingTop = '0px';
  }
  if (document.documentElement && document.documentElement.style.top !== '0px') {
    document.documentElement.style.top = '0px';
    document.documentElement.style.marginTop = '0px';
  }

  // Force hide any injected banner frames or floating popups
  const elementsToHide = document.querySelectorAll(
    '.goog-te-banner-frame, iframe.skiptranslate, .VIpgJd-Z3111-O2233-Ja2420, #goog-gt-tt, .goog-te-balloon-frame, .goog-tooltip'
  );

  elementsToHide.forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (htmlEl.style.display !== 'none') {
      htmlEl.style.setProperty('display', 'none', 'important');
      htmlEl.style.setProperty('visibility', 'hidden', 'important');
      htmlEl.style.setProperty('height', '0px', 'important');
    }
  });
}

function startGoogleTranslateCleaner() {
  if (isCleanerRunning || typeof document === 'undefined') return;
  isCleanerRunning = true;

  // Run cleanup on DOM mutations
  const observer = new MutationObserver(() => {
    cleanGoogleTranslateArtifacts();
  });

  if (document.body) {
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      childList: true,
      subtree: false,
    });
  }

  if (document.documentElement) {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
  }

  // Periodic interval safeguard
  setInterval(() => {
    cleanGoogleTranslateArtifacts();
  }, 400);
}

export function initGoogleTranslate() {
  startGoogleTranslateCleaner();

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
  cleanGoogleTranslateArtifacts();

  if (langCode === 'it') {
    // Clear Google Translate cookies completely to restore native language
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
  } else {
    // Set google translate cookies for target language
    const targetVal = `/it/${langCode}`;
    document.cookie = `googtrans=${targetVal}; path=/;`;
    document.cookie = `googtrans=${targetVal}; path=/; domain=${window.location.hostname};`;
  }

  // Trigger Google Translate combo select element if mounted
  const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (combo) {
    combo.value = langCode === 'it' ? 'it' : langCode;
    combo.dispatchEvent(new Event('change'));
  } else {
    // Reload to apply cookie if combo isn't present
    setTimeout(() => {
      window.location.reload();
    }, 150);
  }

  setTimeout(() => {
    cleanGoogleTranslateArtifacts();
  }, 100);
}

