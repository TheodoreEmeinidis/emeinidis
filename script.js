const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const languagePage = document.querySelector('[data-language-page]');
const languageMenu = document.querySelector('[data-language-menu]');
const languageToggle = document.querySelector('[data-language-toggle]');
const languageCurrent = document.querySelector('[data-language-current]');
const languageOption = document.querySelector('[data-language-option]');

const translations = {
  el: {
    documentTitle: 'Eminidis Projects — Κατασκευές & ανακαινίσεις',
    metaDescription: 'Eminidis Projects — κατασκευές, ανακαινίσεις και χώροι με χαρακτήρα στη Θεσσαλονίκη.',
    homeDocumentTitle: 'Eminidis Projects — Κατασκευές & ανακαινίσεις',
    homeMetaDescription: 'Eminidis Projects — κατασκευές, ανακαινίσεις και χώροι με χαρακτήρα στη Θεσσαλονίκη.',
    projectsDocumentTitle: 'Έργα | Eminidis Projects',
    projectsMetaDescription: 'Παρουσίαση έργων της Eminidis Projects με φωτογραφίες κτιρίων, κατασκευών και ολοκληρωμένων κατοικιών στη Θεσσαλονίκη.',
    renovationsDocumentTitle: 'Ανακαινίσεις | Eminidis Projects',
    renovationsMetaDescription: 'Ανακαινίσεις κατοικιών και επαγγελματικών χώρων από την Eminidis Projects στη Θεσσαλονίκη.',
    contactDocumentTitle: 'Επικοινωνία | Eminidis Projects',
    contactMetaDescription: 'Επικοινωνήστε με την Eminidis Projects για κατασκευές και ανακαινίσεις στη Θεσσαλονίκη.',
    currentLanguageLabel: 'ΕΛ',
    languageOptionLabel: 'EN',
    languageOptionCode: 'en',
    languageToggleLabel: 'Επιλογή γλώσσας. Τρέχουσα γλώσσα: Ελληνικά',
    menuToggle: 'ΜΕΝΟΥ',
    navHome: 'Αρχική',
    navProjects: 'Έργα',
    navRenovations: 'Ανακαινίσεις',
    navContact: 'Επικοινωνία',
    heroAria: '40 χρόνια εμπειρίας',
    heroEyebrow: 'ΚΑΤΑΣΚΕΥΕΣ / ΑΝΑΚΑΙΝΙΣΕΙΣ / ΕΜΠΕΙΡΙΑ',
    heroTitle: '40 χρόνια<br><span>εμπειρίας</span>',
    heroIntro: 'Κατοικίες, πολυκατοικίες και ανακαινίσεις που χτίστηκαν με συνέπεια, τεχνική γνώση και προσοχή στη λεπτομέρεια.',
    heroButton: 'Δείτε τα έργα μας',
    proofAria: 'Από το 1984',
    proofPrefix: 'ΑΠΟ ΤΟ',
    proofPlace: 'ΘΕΣΣΑΛΟΝΙΚΗ',
    aboutLabel: 'ΠΟΙΟΙ ΕΙΜΑΣΤΕ',
    aboutHeading: 'Η εμπειρία συναντά<br><i>τη σύγχρονη ματιά.</i>',
    aboutBodyOne: 'Η Eminidis Projects είναι μια ομάδα ανθρώπων που αγαπά να κάνει τα πράγματα σωστά. Με περισσότερα από 40 χρόνια εμπειρίας στην κατασκευή και την ανακαίνιση, δημιουργούμε έργα με καθαρή σκέψη, σωστά υλικά και συνέπεια.',
    aboutBodyTwo: 'Κάθε έργο είναι διαφορετικό. Η προσέγγισή μας όμως παραμένει ίδια: ακούμε, σχεδιάζουμε, οργανώνουμε και παραδίδουμε έναν χώρο που σας εκφράζει.',
    servicesLabel: 'ΤΙ ΑΝΑΛΑΜΒΑΝΟΥΜΕ',
    servicesEyebrow: 'ΥΠΗΡΕΣΙΕΣ',
    servicesHeading: 'Από το έδαφος<br>μέχρι το <i>τελικό φως.</i>',
    serviceOneTitle: 'Νέα κατασκευή',
    serviceOneBody: 'Κατοικίες σχεδιασμένες γύρω από τον τρόπο που θέλετε να ζείτε, με έμφαση στη λειτουργικότητα και την ποιότητα.',
    serviceTwoTitle: 'Ανακαινίσεις',
    serviceTwoBody: 'Μεταμορφώνουμε υπάρχοντες χώρους, κρατώντας ό,τι αξίζει και επανασχεδιάζοντας ό,τι χρειάζεται.',
    serviceThreeTitle: 'Μελέτη & επίβλεψη',
    serviceThreeBody: 'Συντονισμός, τεχνική γνώση και καθαρό πλάνο για να προχωρά κάθε στάδιο χωρίς εκπλήξεις.',
    projectsLabel: 'ΕΠΙΛΕΓΜΕΝΑ ΕΡΓΑ',
    projectsEyebrow: 'ΜΕΡΙΚΟΙ ΑΠΟ ΤΟΥΣ ΧΩΡΟΥΣ ΜΑΣ',
    projectsHeading: 'Έργα που<br><i>μιλούν μόνα τους.</i>',
    projectTypeOne: '01 / ΚΑΤΟΙΚΙΑ',
    projectTypeTwo: '02 / ΑΝΑΚΑΙΝΙΣΗ',
    projectTypeThree: '03 / ΕΠΑΓΓΕΛΜΑΤΙΚΟΣ ΧΩΡΟΣ',
    projectsButton: 'Όλα τα έργα',
    processLabel: 'Η ΔΙΑΔΙΚΑΣΙΑ',
    processEyebrow: 'ΑΠΛΑ, ΚΑΘΑΡΑ, ΠΡΟΣΩΠΙΚΑ',
    processHeading: 'Μια καλή συνεργασία<br>ξεκινά με <i>καλή ακρόαση.</i>',
    processOneTitle: 'Ακούμε',
    processOneBody: 'Καταλαβαίνουμε τις ανάγκες, τις επιθυμίες και τον προϋπολογισμό σας.',
    processTwoTitle: 'Σχεδιάζουμε',
    processTwoBody: 'Μετατρέπουμε την ιδέα σε ένα συγκεκριμένο, εφαρμόσιμο πλάνο.',
    processThreeTitle: 'Υλοποιούμε',
    processThreeBody: 'Αναλαμβάνουμε κάθε λεπτομέρεια μέχρι να παραδώσουμε το κλειδί.',
    contactEyebrow: 'ΑΣ ΜΙΛΗΣΟΥΜΕ',
    contactHeading: 'Έχετε ένα έργο<br>στο μυαλό σας;',
    contactButton: 'Επικοινωνήστε μαζί μας',
    projectsPageLabel: 'ΕΡΓΑ',
    projectsPageEyebrow: 'ΚΤΙΡΙΑ / ΛΕΠΤΟΜΕΡΕΙΕΣ / ΠΟΡΕΙΑ',
    projectsPageHeading: 'Τα έργα<br><i>μέσα από εικόνες.</i>',
    projectsPageIntro: 'Κάθε κτίριο παρουσιάζεται σαν μικρή ιστορία: μια βασική φωτογραφία, συμπληρωματικές εικόνες και τα στοιχεία που βοηθούν τον επισκέπτη να το καταλάβει γρήγορα.',
    projectsOneEyebrow: 'ΕΡΓΟ 01 / ΣΕ ΕΞΕΛΙΞΗ',
    projectsOneHeading: 'Σταυρούπολη<br><i>Θεσσαλονίκη.</i>',
    projectsOneIntro: 'Η παρουσίαση ξεκινά με καθαρή εικόνα του κτιρίου και συνεχίζει με κοντινές λήψεις και στάδια κατασκευής.',
    factType: 'Τύπος',
    factStage: 'Στάδιο',
    factHomes: 'Κατοικίες',
    factArea: 'Περιοχή',
    factStatus: 'Κατάσταση',
    factApproach: 'Προσέγγιση',
    projectsOneType: 'Πολυκατοικία',
    projectsOneStage: 'Σε εξέλιξη',
    projectsOneHomes: 'Διαμερίσματα και μεζονέτες',
    projectsTwoEyebrow: 'ΕΡΓΟ 02 / ΟΛΟΚΛΗΡΩΜΕΝΟ',
    projectsTwoHeading: 'Πολυκατοικία<br><i>με χαρακτήρα.</i>',
    projectsTwoIntro: 'Για τα ολοκληρωμένα κτίρια, η σελίδα δίνει βάρος στην πρόσοψη, τη γωνία του κτιρίου και το αστικό περιβάλλον.',
    projectsTwoType: 'Οικιστικό κτίριο',
    projectsTwoArea: 'Θεσσαλονίκη',
    projectsTwoStatus: 'Ολοκληρωμένο',
    projectsThreeEyebrow: 'ΕΡΓΟ 03 / ΚΑΤΟΙΚΙΑ',
    projectsThreeHeading: 'Κατοικία<br><i>σε εξέλιξη.</i>',
    projectsThreeIntro: 'Οι φωτογραφίες κατασκευής δείχνουν την τεχνική πλευρά της δουλειάς και χτίζουν εμπιστοσύνη πριν φτάσουμε στο τελικό αποτέλεσμα.',
    projectsThreeType: 'Κατοικία',
    projectsThreeStage: 'Κατασκευή',
    projectsThreeApproach: 'Μελέτη, επίβλεψη, υλοποίηση',
    projectsArchiveEyebrow: 'ΑΡΧΕΙΟ ΕΡΓΩΝ',
    projectsArchiveHeading: 'Περισσότερες <i>εικόνες έργων.</i>',
    projectsArchiveIntro: 'Αυτό μπορεί αργότερα να γίνει δυναμικό gallery από τη βάση δεδομένων, με κάθε κτίριο να έχει τη δική του ομάδα φωτογραφιών.',
    projectsCtaHeading: 'Θέλετε να δούμε<br>το δικό σας έργο;',
    projectsCtaButton: 'Επικοινωνία',
    renovationsPageLabel: 'ΑΝΑΚΑΙΝΙΣΕΙΣ',
    renovationsPageEyebrow: 'ΑΠΟ ΤΟ ΠΑΛΙΟ ΣΤΟ ΝΕΟ',
    renovationsPageHeading: 'Ανακαινίσεις με<br><i>υπογραφή ποιότητας.</i>',
    renovationsPageIntro: 'Η ξεχωριστή ενότητα των ανακαινίσεων δίνει χώρο στη διαδικασία, στις λεπτομέρειες και στην εικόνα πριν την τελική παράδοση.',
    renovationsLeadEyebrow: 'ΑΠΟ ΤΟ ΠΑΛΙΟ ΣΤΟ ΝΕΟ',
    renovationsLeadHeading: 'Ολική ανακαίνιση<br><i>κτιρίου.</i>',
    renovationsLeadIntro: 'Μεταμορφώνουμε υπάρχοντες χώρους με καθαρό τεχνικό πλάνο, σωστή σειρά εργασιών και σεβασμό στη χρήση του κάθε κτιρίου.',
    renovationsPhaseOneTitle: 'Αποτύπωση',
    renovationsPhaseOneBody: 'Καταγράφουμε την υπάρχουσα κατάσταση, τις ανάγκες και τους περιορισμούς του χώρου.',
    renovationsPhaseTwoTitle: 'Οργάνωση',
    renovationsPhaseTwoBody: 'Συντονίζουμε συνεργεία, υλικά και χρονοδιάγραμμα ώστε το έργο να προχωρά με σειρά.',
    renovationsPhaseThreeTitle: 'Παράδοση',
    renovationsPhaseThreeBody: 'Ολοκληρώνουμε τις λεπτομέρειες με στόχο έναν χώρο λειτουργικό, καθαρό και ανθεκτικό.',
    renovationsDetailsEyebrow: 'ΛΕΠΤΟΜΕΡΕΙΕΣ',
    renovationsDetailsHeading: 'Σημεία εργασίας.',
    renovationsDetailsIntro: 'Η παλιά σελίδα είχε gallery λογική. Εδώ τη μεταφέρουμε σε πιο ήρεμη, επιμελημένη παρουσίαση.',
    renovationsCardOneLabel: '01 / ΕΡΓΟΤΑΞΙΟ',
    renovationsCardOneTitle: 'Εξωτερικές εργασίες',
    renovationsCardTwoLabel: '02 / ΥΠΟΔΟΜΕΣ',
    renovationsCardTwoTitle: 'Τεχνικές υποδομές',
    renovationsCardThreeLabel: '03 / ΕΣΩΤΕΡΙΚΟ',
    renovationsCardThreeTitle: 'Εσωτερική προετοιμασία',
    renovationsCtaHeading: 'Έχετε χώρο<br>για ανακαίνιση;',
    renovationsCtaButton: 'Ας μιλήσουμε',
    contactPageLabel: 'ΕΠΙΚΟΙΝΩΝΙΑ',
    contactPageEyebrow: 'ΑΣ ΜΙΛΗΣΟΥΜΕ',
    contactPageHeading: 'Επικοινωνήστε<br><i>μαζί μας.</i>',
    contactPageIntro: 'Το πρώτο βήμα είναι μια καθαρή συζήτηση για τον χώρο, τις ανάγκες και το χρονοδιάγραμμα.',
    contactAddressLabel: 'Διεύθυνση',
    contactPhoneLabel: 'Τηλέφωνο',
    contactEmailLabel: 'Email',
    contactNameLabel: 'Ονοματεπώνυμο',
    contactFormEmailLabel: 'Email',
    contactFormPhoneLabel: 'Τηλέφωνο',
    contactMessageLabel: 'Το μήνυμά σας',
    contactSubmitButton: 'Αποστολή μηνύματος',
    formSending: 'Αποστολή...',
    formErrorDefault: 'Το μήνυμα δεν στάλθηκε.',
    formSuccess: 'Το μήνυμά σας καταχωρήθηκε. Θα επικοινωνήσουμε σύντομα.',
    formNetworkError: 'Υπήρξε πρόβλημα με την αποστολή.',
    footerNote: 'ΜΕ ΣΚΕΨΗ ΚΑΙ ΣΥΝΕΠΕΙΑ.',
    footerTop: 'ΠΙΣΩ ΣΤΗΝ ΑΡΧΗ'
  },
  en: {
    documentTitle: 'Eminidis Projects — Construction & renovation',
    metaDescription: 'Eminidis Projects — construction, renovation, and distinctive spaces in Thessaloniki.',
    homeDocumentTitle: 'Eminidis Projects — Construction & renovation',
    homeMetaDescription: 'Eminidis Projects — construction, renovation, and distinctive spaces in Thessaloniki.',
    projectsDocumentTitle: 'Projects | Eminidis Projects',
    projectsMetaDescription: 'Project presentation by Eminidis Projects with building, construction, and completed residence photography in Thessaloniki.',
    renovationsDocumentTitle: 'Renovations | Eminidis Projects',
    renovationsMetaDescription: 'Home and commercial renovations by Eminidis Projects in Thessaloniki.',
    contactDocumentTitle: 'Contact | Eminidis Projects',
    contactMetaDescription: 'Contact Eminidis Projects for construction and renovation work in Thessaloniki.',
    currentLanguageLabel: 'EN',
    languageOptionLabel: 'ΕΛ',
    languageOptionCode: 'el',
    languageToggleLabel: 'Choose language. Current language: English',
    menuToggle: 'MENU',
    navHome: 'Home',
    navProjects: 'Projects',
    navRenovations: 'Renovations',
    navContact: 'Contact',
    heroAria: '40 years of experience',
    heroEyebrow: 'CONSTRUCTION / RENOVATION / EXPERIENCE',
    heroTitle: '40 years<br><span>of experience</span>',
    heroIntro: 'Homes, apartment buildings, and renovations built with consistency, technical knowledge, and care for every detail.',
    heroButton: 'View our projects',
    proofAria: 'Established in 1984',
    proofPrefix: 'EST.',
    proofPlace: 'THESSALONIKI',
    aboutLabel: 'WHO WE ARE',
    aboutHeading: 'Experience meets<br><i>a modern point of view.</i>',
    aboutBodyOne: 'Eminidis Projects is a team of people who care about doing things properly. With more than 40 years of experience in construction and renovation, we create work with clear thinking, proper materials, and consistency.',
    aboutBodyTwo: 'Every project is different. Our approach stays the same: we listen, design, organize, and deliver a space that reflects you.',
    servicesLabel: 'WHAT WE DO',
    servicesEyebrow: 'SERVICES',
    servicesHeading: 'From the ground<br>to the <i>final light.</i>',
    serviceOneTitle: 'New construction',
    serviceOneBody: 'Homes designed around the way you want to live, with attention to function, quality, and long-term value.',
    serviceTwoTitle: 'Renovations',
    serviceTwoBody: 'We transform existing spaces by keeping what matters and redesigning what needs to change.',
    serviceThreeTitle: 'Design & supervision',
    serviceThreeBody: 'Coordination, technical knowledge, and a clear plan so every stage moves forward without surprises.',
    projectsLabel: 'SELECTED WORK',
    projectsEyebrow: 'A FEW OF OUR SPACES',
    projectsHeading: 'Work that<br><i>speaks for itself.</i>',
    projectTypeOne: '01 / RESIDENTIAL',
    projectTypeTwo: '02 / RENOVATION',
    projectTypeThree: '03 / COMMERCIAL',
    projectsButton: 'All projects',
    processLabel: 'THE PROCESS',
    processEyebrow: 'SIMPLE, CLEAR, PERSONAL',
    processHeading: 'A good collaboration<br>starts with <i>good listening.</i>',
    processOneTitle: 'We listen',
    processOneBody: 'We understand your needs, wishes, and budget.',
    processTwoTitle: 'We design',
    processTwoBody: 'We turn the idea into a specific, practical plan.',
    processThreeTitle: 'We build',
    processThreeBody: 'We take care of every detail until the keys are delivered.',
    contactEyebrow: 'START A CONVERSATION',
    contactHeading: 'Have a project<br>in mind?',
    contactButton: 'Contact us',
    projectsPageLabel: 'PROJECTS',
    projectsPageEyebrow: 'BUILDINGS / DETAILS / PROGRESS',
    projectsPageHeading: 'Projects<br><i>through images.</i>',
    projectsPageIntro: 'Each building is presented as a small story: one main photograph, supporting images, and the details that help visitors understand it quickly.',
    projectsOneEyebrow: 'PROJECT 01 / IN PROGRESS',
    projectsOneHeading: 'Stavroupoli<br><i>Thessaloniki.</i>',
    projectsOneIntro: 'The presentation begins with a clear view of the building and continues with close-up images and construction stages.',
    factType: 'Type',
    factStage: 'Stage',
    factHomes: 'Residences',
    factArea: 'Area',
    factStatus: 'Status',
    factApproach: 'Approach',
    projectsOneType: 'Apartment building',
    projectsOneStage: 'In progress',
    projectsOneHomes: 'Apartments and maisonettes',
    projectsTwoEyebrow: 'PROJECT 02 / COMPLETED',
    projectsTwoHeading: 'Apartment building<br><i>with character.</i>',
    projectsTwoIntro: 'For completed buildings, the page focuses on the facade, the corner of the building, and the surrounding urban context.',
    projectsTwoType: 'Residential building',
    projectsTwoArea: 'Thessaloniki',
    projectsTwoStatus: 'Completed',
    projectsThreeEyebrow: 'PROJECT 03 / RESIDENTIAL',
    projectsThreeHeading: 'Residence<br><i>in progress.</i>',
    projectsThreeIntro: 'Construction photographs show the technical side of the work and build trust before the final result is reached.',
    projectsThreeType: 'Residence',
    projectsThreeStage: 'Construction',
    projectsThreeApproach: 'Design, supervision, delivery',
    projectsArchiveEyebrow: 'PROJECT ARCHIVE',
    projectsArchiveHeading: 'More <i>project images.</i>',
    projectsArchiveIntro: 'Later, this can become a dynamic gallery from the database, with each building having its own group of photographs.',
    projectsCtaHeading: 'Would you like to discuss<br>your own project?',
    projectsCtaButton: 'Contact',
    renovationsPageLabel: 'RENOVATIONS',
    renovationsPageEyebrow: 'FROM OLD TO NEW',
    renovationsPageHeading: 'Renovations with<br><i>a quality signature.</i>',
    renovationsPageIntro: 'The renovations section gives space to the process, the details, and the image before final delivery.',
    renovationsLeadEyebrow: 'FROM OLD TO NEW',
    renovationsLeadHeading: 'Full building<br><i>renovation.</i>',
    renovationsLeadIntro: 'We transform existing spaces with a clear technical plan, the right sequence of work, and respect for each building’s use.',
    renovationsPhaseOneTitle: 'Survey',
    renovationsPhaseOneBody: 'We record the existing condition, needs, and limitations of the space.',
    renovationsPhaseTwoTitle: 'Organization',
    renovationsPhaseTwoBody: 'We coordinate crews, materials, and timelines so the project moves forward in order.',
    renovationsPhaseThreeTitle: 'Delivery',
    renovationsPhaseThreeBody: 'We complete the details with the goal of a functional, clean, and durable space.',
    renovationsDetailsEyebrow: 'DETAILS',
    renovationsDetailsHeading: 'Work points.',
    renovationsDetailsIntro: 'The previous page used a gallery logic. Here, we translate it into a calmer, more curated presentation.',
    renovationsCardOneLabel: '01 / SITE WORK',
    renovationsCardOneTitle: 'Exterior works',
    renovationsCardTwoLabel: '02 / SYSTEMS',
    renovationsCardTwoTitle: 'Technical infrastructure',
    renovationsCardThreeLabel: '03 / INTERIOR',
    renovationsCardThreeTitle: 'Interior preparation',
    renovationsCtaHeading: 'Do you have a space<br>for renovation?',
    renovationsCtaButton: 'Let’s talk',
    contactPageLabel: 'CONTACT',
    contactPageEyebrow: 'START A CONVERSATION',
    contactPageHeading: 'Contact<br><i>our team.</i>',
    contactPageIntro: 'The first step is a clear conversation about the space, the needs, and the timeline.',
    contactAddressLabel: 'Address',
    contactPhoneLabel: 'Phone',
    contactEmailLabel: 'Email',
    contactNameLabel: 'Full name',
    contactFormEmailLabel: 'Email',
    contactFormPhoneLabel: 'Phone',
    contactMessageLabel: 'Your message',
    contactSubmitButton: 'Send message',
    formSending: 'Sending...',
    formErrorDefault: 'The message was not sent.',
    formSuccess: 'Your message has been recorded. We will contact you soon.',
    formNetworkError: 'There was a problem sending the message.',
    footerNote: 'BUILT WITH INTENTION.',
    footerTop: 'BACK TO TOP'
  }
};

function getSavedLanguage() {
  try {
    return localStorage.getItem('emeinidisLanguage');
  } catch {
    return null;
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem('emeinidisLanguage', language);
  } catch {
    // Browsers can block storage in private contexts; the toggle still works for the session.
  }
}

function applyLanguage(language) {
  const nextLanguage = translations[language] ? language : 'el';
  const dictionary = translations[nextLanguage];
  const metaDescription = document.querySelector('meta[name="description"]');
  const pageKey = document.body?.dataset.page || 'home';
  const title = dictionary[`${pageKey}DocumentTitle`] || dictionary.documentTitle;
  const description = dictionary[`${pageKey}MetaDescription`] || dictionary.metaDescription;

  document.documentElement.lang = nextLanguage;
  document.title = title;
  metaDescription?.setAttribute('content', description);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.innerHTML = dictionary[key];
    }
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (dictionary[key]) {
      element.setAttribute('aria-label', dictionary[key]);
    }
  });

  if (languageToggle) {
    languageToggle.setAttribute('aria-label', dictionary.languageToggleLabel);
  }

  if (languageCurrent) {
    languageCurrent.textContent = dictionary.currentLanguageLabel;
  }

  if (languageOption) {
    languageOption.textContent = dictionary.languageOptionLabel;
    languageOption.dataset.languageOption = dictionary.languageOptionCode;
  }

  saveLanguage(nextLanguage);
}

function getCurrentDictionary() {
  const language = document.documentElement.lang === 'en' ? 'en' : 'el';
  return translations[language] || translations.el;
}

function setLanguageMenuOpen(isOpen) {
  languageMenu?.classList.toggle('is-open', isOpen);
  languageToggle?.setAttribute('aria-expanded', String(isOpen));
}

if (languageMenu && languageToggle && languageOption) {
  const savedLanguage = getSavedLanguage();
  applyLanguage(savedLanguage === 'en' ? 'en' : 'el');

  languageToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    setLanguageMenuOpen(!languageMenu.classList.contains('is-open'));
  });

  languageOption.addEventListener('click', (event) => {
    event.stopPropagation();
    applyLanguage(languageOption.dataset.languageOption);
    setLanguageMenuOpen(false);
    languageToggle.focus();
  });

  document.addEventListener('click', (event) => {
    if (!languageMenu.contains(event.target)) {
      setLanguageMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setLanguageMenuOpen(false);
      languageToggle.focus();
    }
  });
}

const revealItems = document.querySelectorAll('.service-item, .project-card, .work-card, .building-story, .gallery-wall figure, .archive-item, .phase-list > div, .contact-method, .process-steps > div');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add('reveal');
  observer.observe(item);
});

const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  const dictionary = getCurrentDictionary();

  formStatus.textContent = dictionary.formSending;
  formStatus.className = 'form-status';
  submitButton.disabled = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || dictionary.formErrorDefault);
    }

    contactForm.reset();
    formStatus.textContent = dictionary.formSuccess;
    formStatus.classList.add('is-success');
  } catch (error) {
    formStatus.textContent = error.message || dictionary.formNetworkError;
    formStatus.classList.add('is-error');
  } finally {
    submitButton.disabled = false;
  }
});
