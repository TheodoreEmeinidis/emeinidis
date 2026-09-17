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

document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
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
    heroTitle: '40 χρόνια<br><span>εμπειρίας</span>',
    heroIntro: 'Κατασκευές και ανακαινίσεις με συνέπεια, τεχνική γνώση και προσοχή στη λεπτομέρεια.',
    heroButton: 'Δείτε τα έργα μας',
    proofAria: 'Από το 1986',
    proofPrefix: 'ΑΠΟ ΤΟ',
    aboutLabel: 'ΠΟΙΟΙ ΕΙΜΑΣΤΕ',
    aboutHeading: 'Η εμπειρία συναντά<br><i>τη σύγχρονη ματιά.</i>',
    aboutBodyOne: 'Η Eminidis Projects έχει χτιστεί πάνω στην τεχνική γνώση, την αξιοπιστία και την προσοχή στη λεπτομέρεια. Με περισσότερα από 40 χρόνια εμπειρίας στην κατασκευή και την ανακαίνιση, δημιουργούμε έργα με καθαρή σκέψη, σωστά υλικά και συνέπεια.',
    aboutBodyTwo: 'Κάθε έργο είναι διαφορετικό. Η προσέγγισή μας όμως παραμένει ίδια: ακούμε, σχεδιάζουμε, οργανώνουμε και παραδίδουμε έναν χώρο που σας εκφράζει.',
    servicesLabel: 'ΟΙ ΥΠΗΡΕΣΙΕΣ ΜΑΣ',
    serviceOneTitle: 'Νέα κατασκευή',
    serviceOneBody: 'Κατοικίες που συνδυάζουν σύγχρονη αισθητική, λειτουργικό σχεδιασμό και ποιότητα κατασκευής.',
    serviceTwoTitle: 'Ανακαινίσεις',
    serviceTwoBody: 'Ανακαινίσεις με έμφαση στη λειτουργικότητα, την αισθητική και την ποιότητα.',
    serviceThreeTitle: 'Μελέτη & επίβλεψη',
    serviceThreeBody: 'Οργάνωση, τεχνική γνώση και συνέπεια σε κάθε στάδιο.',
    projectsLabel: 'ΕΠΙΛΕΓΜΕΝΑ ΕΡΓΑ',
    projectsEyebrow: 'ΜΕΡΙΚΟΙ ΑΠΟ ΤΟΥΣ ΧΩΡΟΥΣ ΜΑΣ',
    projectsHeading: 'Έργα που<br><i>μιλούν μόνα τους.</i>',
    projectTypeOne: 'ΚΑΤΟΙΚΙΑ',
    projectTypeTwo: 'ΑΝΑΚΑΙΝΙΣΗ',
    projectTypeThree: 'ΕΠΑΓΓΕΛΜΑΤΙΚΟΣ ΧΩΡΟΣ',
    projectsButton: 'Όλα τα έργα',
    processLabel: 'Η ΔΙΑΔΙΚΑΣΙΑ',
    processHeading: 'Μια καλή συνεργασία<br>ξεκινά με <i>καλή ακρόαση.</i>',
    processOneTitle: 'Ακούμε',
    processOneBody: 'Καθορίζουμε τις απαιτήσεις, τις προτεραιότητες και το οικονομικό πλαίσιο του έργου.',
    processTwoTitle: 'Σχεδιάζουμε',
    processTwoBody: 'Μετατρέπουμε την ιδέα σε ένα συγκεκριμένο, εφαρμόσιμο πλάνο.',
    processThreeTitle: 'Υλοποιούμε',
    processThreeBody: 'Αναλαμβάνουμε κάθε λεπτομέρεια μέχρι να παραδώσουμε το κλειδί.',
    contactButton: 'Επικοινωνήστε μαζί μας',
    projectsPageLabel: 'ΕΡΓΑ',
    projectsPageEyebrow: 'ΚΤΙΡΙΑ / ΛΕΠΤΟΜΕΡΕΙΕΣ / ΠΟΡΕΙΑ',
    projectsPageHeading: 'Τα έργα<br><i>μέσα από εικόνες.</i>',
    projectsPageIntro: 'Κάθε κτίριο παρουσιάζεται σαν μικρή ιστορία: μια βασική φωτογραφία, συμπληρωματικές εικόνες και τα στοιχεία που βοηθούν τον επισκέπτη να το καταλάβει γρήγορα.',
    projectsOneHeading: 'Άνω Ηλιούπολη',
    projectsOneIntro: 'Η παρουσίαση ξεκινά με καθαρή εικόνα του κτιρίου και συνεχίζει με κοντινές λήψεις και στάδια κατασκευής.',
    factType: 'Τύπος',
    factStage: 'Στάδιο',
    factLocation: 'Τοποθεσία',
    factProjectScale: 'Κλίμακα έργου',
    factHomes: 'Κατοικίες',
    factFloors: 'Ορόφοι',
    factApartments: 'Διαμερίσματα',
    factArea: 'Περιοχή',
    factStatus: 'Κατάσταση',
    factApproach: 'Προσέγγιση',
    projectsOneType: 'Πολυκατοικία',
    projectsOneStage: 'Μελλοντικό',
    projectsOneLocation: 'Θεσσαλονίκη',
    projectsOneHomes: 'Διαμερίσματα και μεζονέτες',
    projectsOneFloors: '4 Όροφοι<br>4 Διαμερίσματα',
    projectsOneApartments: '4',
    projectsOneSummaryLabel: 'Σύνοψη',
    projectsOneSummary: '4 Όροφοι<br>4 Διαμερίσματα',
    projectsPalaiokastroHeading: 'Παλαιόκαστρο',
    projectsPalaiokastroStage: 'Ολοκληρωμένο',
    projectsPalaiokastroLocation: 'Θεσσαλονίκη',
    projectsPalaiokastroType: 'Συγκρότημα',
    projectsPalaiokastroScale: '46',
    projectsPalaiokastroFourteenHeading: 'Παλαιόκαστρο',
    projectsPalaiokastroFourteenStage: 'Ολοκληρωμένο',
    projectsPalaiokastroFourteenLocation: 'Θεσσαλονίκη',
    projectsPalaiokastroFourteenType: 'Συγκρότημα',
    projectsPalaiokastroFourteenScale: '14',
    projectsMeteoraHeading: 'Μετέωρα',
    projectsMeteoraStage: 'Ολοκληρωμένο',
    projectsMeteoraLocation: 'Θεσσαλονίκη',
    projectsMeteoraType: 'Συγκρότημα',
    projectsMeteoraScale: '43',
    projectsOraiokastroHeading: 'Ωραιόκαστρο',
    projectsOraiokastroStage: 'Ολοκληρωμένο',
    projectsOraiokastroLocation: 'Θεσσαλονίκη',
    projectsOraiokastroType: 'Μονοκατοικία',
    projectsOraiokastroScale: '3 Όροφοι',
    projectsNeapoliHeading: 'Νεάπολη',
    projectsNeapoliStage: 'Ολοκληρωμένο',
    projectsNeapoliLocation: 'Θεσσαλονίκη',
    projectsNeapoliType: 'Πολυκατοικία',
    projectsNeapoliScale: '5 Όροφοι<br>5 Διαμερίσματα',
    projectsAgiosPavlosHeading: 'Άγιος Παύλος',
    projectsAgiosPavlosStage: 'Ολοκληρωμένο',
    projectsAgiosPavlosLocation: 'Θεσσαλονίκη',
    projectsAgiosPavlosType: 'Πολυκατοικία',
    projectsAgiosPavlosScale: '4 Όροφοι<br>8 Διαμερίσματα',
    projectsMeteoraApartmentHeading: 'Μετέωρα',
    projectsMeteoraApartmentStage: 'Ολοκληρωμένο',
    projectsMeteoraApartmentLocation: 'Θεσσαλονίκη',
    projectsMeteoraApartmentType: 'Πολυκατοικία',
    projectsMeteoraApartmentScale: '4 Όροφοι<br>8 Διαμερίσματα',
    projectsMeteoraCompactHeading: 'Μετέωρα',
    projectsMeteoraCompactStage: 'Ολοκληρωμένο',
    projectsMeteoraCompactLocation: 'Θεσσαλονίκη',
    projectsMeteoraCompactType: 'Πολυκατοικία',
    projectsMeteoraCompactScale: '4 Όροφοι<br>4 Διαμερίσματα',
    projectsMeteoraTenHeading: 'Μετέωρα',
    projectsMeteoraTenStage: 'Ολοκληρωμένο',
    projectsMeteoraTenLocation: 'Θεσσαλονίκη',
    projectsMeteoraTenType: 'Πολυκατοικία',
    projectsMeteoraTenScale: '5 Όροφοι<br>10 Διαμερίσματα',
    projectsAnoIlioupoliElevenHeading: 'Άνω Ηλιούπολη',
    projectsAnoIlioupoliElevenStage: 'Ολοκληρωμένο',
    projectsAnoIlioupoliElevenLocation: 'Θεσσαλονίκη',
    projectsAnoIlioupoliElevenType: 'Πολυκατοικία',
    projectsAnoIlioupoliElevenScale: '5 Όροφοι<br>5 Διαμερίσματα',
    projectsMeteoraTwelveHeading: 'Μετέωρα',
    projectsMeteoraTwelveStage: 'Ολοκληρωμένο',
    projectsMeteoraTwelveLocation: 'Θεσσαλονίκη',
    projectsMeteoraTwelveType: 'Πολυκατοικία',
    projectsMeteoraTwelveScale: '4 Όροφοι<br>4 Διαμερίσματα',
    projectsMeteoraThirteenHeading: 'Μετέωρα',
    projectsMeteoraThirteenStage: 'Ολοκληρωμένο',
    projectsMeteoraThirteenLocation: 'Θεσσαλονίκη',
    projectsMeteoraThirteenType: 'Πολυκατοικία',
    projectsMeteoraThirteenScale: '6 Όροφοι<br>11 Διαμερίσματα',
    projectsMeteoraFourteenHeading: 'Μετέωρα',
    projectsMeteoraFourteenStage: 'Ολοκληρωμένο',
    projectsMeteoraFourteenLocation: 'Θεσσαλονίκη',
    projectsMeteoraFourteenType: 'Πολυκατοικία',
    projectsMeteoraFourteenScale: '6 Όροφοι<br>11 Διαμερίσματα',
    projectsSykiesFifteenHeading: 'Συκιές',
    projectsSykiesFifteenStage: 'Ολοκληρωμένο',
    projectsSykiesFifteenLocation: 'Θεσσαλονίκη',
    projectsSykiesFifteenType: 'Πολυκατοικία',
    projectsSykiesFifteenScale: '4 Όροφοι<br>7 Διαμερίσματα',
    projectCard02Heading: 'Παλαιόκαστρο',
    projectCard02Stage: 'Ολοκληρωμένο',
    projectCard02Location: 'Θεσσαλονίκη',
    projectCard02Type: 'Συγκρότημα',
    projectCard02Scale: '10 Μεζονέτες<br>39 Διαμερίσματα',
    projectCard03Heading: 'Παλαιόκαστρο',
    projectCard03Stage: 'Ολοκληρωμένο',
    projectCard03Location: 'Θεσσαλονίκη',
    projectCard03Type: 'Συγκρότημα',
    projectCard03Scale: '5 Μεζονέτες<br>9 Διαμερίσματα',
    projectCard04Heading: 'Μετέωρα',
    projectCard04Stage: 'Ολοκληρωμένο',
    projectCard04Location: 'Θεσσαλονίκη',
    projectCard04Type: 'Συγκρότημα',
    projectCard04Scale: '54 Διαμερίσματα',
    projectCard05Heading: 'Ωραιόκαστρο',
    projectCard05Stage: 'Ολοκληρωμένο',
    projectCard05Location: 'Θεσσαλονίκη',
    projectCard05Type: 'Μονοκατοικία',
    projectCard05Scale: '3 Όροφοι',
    projectCard06Heading: 'Εύοσμος',
    projectCard06Stage: 'Ολοκληρωμένο',
    projectCard06Location: 'Θεσσαλονίκη',
    projectCard06Type: 'Μονοκατοικία',
    projectCard06Scale: '4 Όροφοι<br>4 Διαμερίσματα',
    projectCard07Heading: 'Νεάπολη',
    projectCard07Stage: 'Ολοκληρωμένο',
    projectCard07Location: 'Θεσσαλονίκη',
    projectCard07Type: 'Πολυκατοικία',
    projectCard07Scale: '5 Όροφοι<br>5 Διαμερίσματα',
    projectCard08Heading: 'Άγιος Παύλος',
    projectCard08Stage: 'Ολοκληρωμένο',
    projectCard08Location: 'Θεσσαλονίκη',
    projectCard08Type: 'Πολυκατοικία',
    projectCard08Scale: '4 Όροφοι<br>8 Διαμερίσματα',
    projectCard09Heading: 'Νεάπολη',
    projectCard09Stage: 'Ολοκληρωμένο',
    projectCard09Location: 'Θεσσαλονίκη',
    projectCard09Type: 'Πολυκατοικία',
    projectCard09Scale: '4 Όροφοι<br>8 Διαμερίσματα',
    projectCard10Heading: 'Μετέωρα',
    projectCard10Stage: 'Ολοκληρωμένο',
    projectCard10Location: 'Θεσσαλονίκη',
    projectCard10Type: 'Πολυκατοικία',
    projectCard10Scale: '4 Όροφοι<br>4 Διαμερίσματα',
    projectCard11Heading: 'Μετέωρα',
    projectCard11Stage: 'Ολοκληρωμένο',
    projectCard11Location: 'Θεσσαλονίκη',
    projectCard11Type: 'Πολυκατοικία',
    projectCard11Scale: '5 Όροφοι<br>10 Διαμερίσματα',
    projectCard12Heading: 'Άνω Ηλιούπολη',
    projectCard12Stage: 'Ολοκληρωμένο',
    projectCard12Location: 'Θεσσαλονίκη',
    projectCard12Type: 'Πολυκατοικία',
    projectCard12Scale: '5 Όροφοι<br>5 Διαμερίσματα',
    projectCard13Heading: 'Μετέωρα',
    projectCard13Stage: 'Ολοκληρωμένο',
    projectCard13Location: 'Θεσσαλονίκη',
    projectCard13Type: 'Πολυκατοικία',
    projectCard13Scale: '4 Όροφοι<br>4 Διαμερίσματα',
    projectCard14Heading: 'Μετέωρα',
    projectCard14Stage: 'Ολοκληρωμένο',
    projectCard14Location: 'Θεσσαλονίκη',
    projectCard14Type: 'Πολυκατοικία',
    projectCard14Scale: '6 Όροφοι<br>11 Διαμερίσματα',
    projectCard15Heading: 'Μετέωρα',
    projectCard15Stage: 'Ολοκληρωμένο',
    projectCard15Location: 'Θεσσαλονίκη',
    projectCard15Type: 'Πολυκατοικία',
    projectCard15Scale: '6 Όροφοι<br>11 Διαμερίσματα',
    projectCard16Heading: 'Συκιές',
    projectCard16Stage: 'Ολοκληρωμένο',
    projectCard16Location: 'Θεσσαλονίκη',
    projectCard16Type: 'Πολυκατοικία',
    projectCard16Scale: '4 Όροφοι<br>7 Διαμερίσματα',
    projectsTwoEyebrow: 'ΟΛΟΚΛΗΡΩΜΕΝΟ',
    projectsTwoHeading: 'Πολυκατοικία<br><i>με χαρακτήρα.</i>',
    projectsTwoIntro: 'Για τα ολοκληρωμένα κτίρια, η σελίδα δίνει βάρος στην πρόσοψη, τη γωνία του κτιρίου και το αστικό περιβάλλον.',
    projectsTwoType: 'Οικιστικό κτίριο',
    projectsTwoArea: 'Θεσσαλονίκη',
    projectsTwoStatus: 'Ολοκληρωμένο',
    projectsThreeEyebrow: 'ΚΑΤΟΙΚΙΑ',
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
    renovationsLeadHeading: 'Ολική<br class="renovation-mobile-break"> ανακαίνιση<br><i>πολυκατοικίας.</i>',
    renovationsStagesHeading: 'Στάδια εργασιών',
    renovationsPhaseOneTitle: 'Αποτύπωση',
    renovationsPhaseOneBody: 'Καταγράφουμε την υπάρχουσα κατάσταση, τις ανάγκες και τους περιορισμούς του χώρου.',
    renovationsPhaseTwoTitle: 'Οργάνωση',
    renovationsPhaseTwoBody: 'Συντονίζουμε συνεργεία, υλικά και χρονοδιάγραμμα ώστε το έργο να προχωρά με σειρά.',
    renovationsPhaseThreeTitle: 'Παράδοση',
    renovationsPhaseThreeBody: 'Ολοκληρώνουμε τις λεπτομέρειες με στόχο έναν χώρο λειτουργικό, καθαρό και ανθεκτικό.',
    renovationsDetailsEyebrow: 'ΛΕΠΤΟΜΕΡΕΙΕΣ',
    renovationsDetailsHeading: 'Σημεία εργασίας.',
    renovationsDetailsIntro: 'Η παλιά σελίδα είχε gallery λογική. Εδώ τη μεταφέρουμε σε πιο ήρεμη, επιμελημένη παρουσίαση.',
    renovationsCardOneLabel: 'ΕΡΓΟΤΑΞΙΟ',
    renovationsCardOneTitle: 'Εξωτερικές εργασίες',
    renovationsCardTwoLabel: 'ΥΠΟΔΟΜΕΣ',
    renovationsCardTwoTitle: 'Τεχνικές υποδομές',
    renovationsCardThreeLabel: 'ΕΣΩΤΕΡΙΚΟ',
    renovationsCardThreeTitle: 'Εσωτερική προετοιμασία',
    renovationsCtaHeading: 'Έχετε χώρο<br>για ανακαίνιση;',
    renovationsCtaButton: 'Ας μιλήσουμε',
    contactPageLabel: 'ΕΠΙΚΟΙΝΩΝΙΑ',
    contactPageTitle: 'Επικοινωνία',
    contactAddressLabel: 'Διεύθυνση',
    contactPhoneLabel: 'Τηλέφωνο',
    contactEmailLabel: 'Email',
    contactNameLabel: 'Ονοματεπώνυμο *',
    contactFormEmailLabel: 'Email *',
    contactFormPhoneLabel: 'Τηλέφωνο',
    contactMessageLabel: 'Το μήνυμά σας *',
    contactSubmitButton: 'Αποστολή μηνύματος',
    formRequiredMissing: 'Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία με αστερίσκο.',
    formEmailInvalid: 'Παρακαλώ συμπληρώστε μια έγκυρη διεύθυνση email.',
    formSending: 'Αποστολή...',
    formErrorDefault: 'Το μήνυμα δεν στάλθηκε.',
    formSuccess: 'Το μήνυμά σας καταχωρήθηκε. Θα επικοινωνήσουμε σύντομα.',
    formNetworkError: 'Υπήρξε πρόβλημα με την αποστολή.',
    footerContactAria: 'Στοιχεία επικοινωνίας',
    footerPhoneLabel: 'Τηλ. Επικοινωνίας',
    footerEmailLabel: 'Email',
    footerRights: '© 2026 All rights reserved.',
    footerTop: 'ΠΙΣΩ ΣΤΗΝ ΑΡΧΗ',
    imageLightboxClose: 'Κλείσιμο εικόνας',
    imageLightboxPrevious: 'Προηγούμενη εικόνα',
    imageLightboxNext: 'Επόμενη εικόνα',
    imageLightboxGoTo: 'Μετάβαση στην εικόνα'
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
    heroTitle: '40 years<br><span>of experience</span>',
    heroIntro: 'Construction and renovations with consistency, technical knowledge, and care for every detail.',
    heroButton: 'View our projects',
    proofAria: 'Established in 1986',
    proofPrefix: 'EST.',
    aboutLabel: 'WHO WE ARE',
    aboutHeading: 'Experience meets<br><i>a modern point of view.</i>',
    aboutBodyOne: 'Eminidis Projects is built on technical knowledge, reliability, and attention to detail. With more than 40 years of experience in construction and renovation, we create work with clear thinking, proper materials, and consistency.',
    aboutBodyTwo: 'Every project is different. Our approach stays the same: we listen, design, organize, and deliver a space that reflects you.',
    servicesLabel: 'OUR SERVICES',
    serviceOneTitle: 'New construction',
    serviceOneBody: 'Homes that combine modern aesthetics, functional design, and construction quality.',
    serviceTwoTitle: 'Renovations',
    serviceTwoBody: 'Renovations with emphasis on functionality, aesthetics, and quality.',
    serviceThreeTitle: 'Design & supervision',
    serviceThreeBody: 'Organization, technical knowledge, and consistency at every stage.',
    projectsLabel: 'SELECTED WORK',
    projectsEyebrow: 'A FEW OF OUR SPACES',
    projectsHeading: 'Work that<br><i>speaks for itself.</i>',
    projectTypeOne: 'RESIDENTIAL',
    projectTypeTwo: 'RENOVATION',
    projectTypeThree: 'COMMERCIAL',
    projectsButton: 'All projects',
    processLabel: 'THE PROCESS',
    processHeading: 'A good collaboration<br>starts with <i>good listening.</i>',
    processOneTitle: 'We listen',
    processOneBody: 'We define the requirements, priorities, and financial framework of the project.',
    processTwoTitle: 'We design',
    processTwoBody: 'We turn the idea into a specific, practical plan.',
    processThreeTitle: 'We build',
    processThreeBody: 'We take care of every detail until the keys are delivered.',
    contactButton: 'Contact us',
    projectsPageLabel: 'PROJECTS',
    projectsPageEyebrow: 'BUILDINGS / DETAILS / PROGRESS',
    projectsPageHeading: 'Projects<br><i>through images.</i>',
    projectsPageIntro: 'Each building is presented as a small story: one main photograph, supporting images, and the details that help visitors understand it quickly.',
    projectsOneHeading: 'Ano Ilioupoli',
    projectsOneIntro: 'The presentation begins with a clear view of the building and continues with close-up images and construction stages.',
    factType: 'Type',
    factStage: 'Stage',
    factLocation: 'Location',
    factProjectScale: 'Project scale',
    factHomes: 'Residences',
    factFloors: 'Floors',
    factApartments: 'Apartments',
    factArea: 'Area',
    factStatus: 'Status',
    factApproach: 'Approach',
    projectsOneType: 'Apartment building',
    projectsOneStage: 'Future',
    projectsOneLocation: 'Thessaloniki',
    projectsOneHomes: 'Apartments and maisonettes',
    projectsOneFloors: '4 Floors<br>4 Apartments',
    projectsOneApartments: '4',
    projectsOneSummaryLabel: 'Summary',
    projectsOneSummary: '4 Floors<br>4 Apartments',
    projectsPalaiokastroHeading: 'Palaiokastro',
    projectsPalaiokastroStage: 'Completed',
    projectsPalaiokastroLocation: 'Thessaloniki',
    projectsPalaiokastroType: 'Residential complex',
    projectsPalaiokastroScale: '46',
    projectsPalaiokastroFourteenHeading: 'Palaiokastro',
    projectsPalaiokastroFourteenStage: 'Completed',
    projectsPalaiokastroFourteenLocation: 'Thessaloniki',
    projectsPalaiokastroFourteenType: 'Residential complex',
    projectsPalaiokastroFourteenScale: '14',
    projectsMeteoraHeading: 'Meteora',
    projectsMeteoraStage: 'Completed',
    projectsMeteoraLocation: 'Thessaloniki',
    projectsMeteoraType: 'Residential complex',
    projectsMeteoraScale: '43',
    projectsOraiokastroHeading: 'Oraiokastro',
    projectsOraiokastroStage: 'Completed',
    projectsOraiokastroLocation: 'Thessaloniki',
    projectsOraiokastroType: 'Detached house',
    projectsOraiokastroScale: '3 Floors',
    projectsNeapoliHeading: 'Neapoli',
    projectsNeapoliStage: 'Completed',
    projectsNeapoliLocation: 'Thessaloniki',
    projectsNeapoliType: 'Apartment building',
    projectsNeapoliScale: '5 Floors<br>5 Apartments',
    projectsAgiosPavlosHeading: 'Agios Pavlos',
    projectsAgiosPavlosStage: 'Completed',
    projectsAgiosPavlosLocation: 'Thessaloniki',
    projectsAgiosPavlosType: 'Apartment building',
    projectsAgiosPavlosScale: '4 Floors<br>8 Apartments',
    projectsMeteoraApartmentHeading: 'Meteora',
    projectsMeteoraApartmentStage: 'Completed',
    projectsMeteoraApartmentLocation: 'Thessaloniki',
    projectsMeteoraApartmentType: 'Apartment building',
    projectsMeteoraApartmentScale: '4 Floors<br>8 Apartments',
    projectsMeteoraCompactHeading: 'Meteora',
    projectsMeteoraCompactStage: 'Completed',
    projectsMeteoraCompactLocation: 'Thessaloniki',
    projectsMeteoraCompactType: 'Apartment building',
    projectsMeteoraCompactScale: '4 Floors<br>4 Apartments',
    projectsMeteoraTenHeading: 'Meteora',
    projectsMeteoraTenStage: 'Completed',
    projectsMeteoraTenLocation: 'Thessaloniki',
    projectsMeteoraTenType: 'Apartment building',
    projectsMeteoraTenScale: '5 Floors<br>10 Apartments',
    projectsAnoIlioupoliElevenHeading: 'Ano Ilioupoli',
    projectsAnoIlioupoliElevenStage: 'Completed',
    projectsAnoIlioupoliElevenLocation: 'Thessaloniki',
    projectsAnoIlioupoliElevenType: 'Apartment building',
    projectsAnoIlioupoliElevenScale: '5 Floors<br>5 Apartments',
    projectsMeteoraTwelveHeading: 'Meteora',
    projectsMeteoraTwelveStage: 'Completed',
    projectsMeteoraTwelveLocation: 'Thessaloniki',
    projectsMeteoraTwelveType: 'Apartment building',
    projectsMeteoraTwelveScale: '4 Floors<br>4 Apartments',
    projectsMeteoraThirteenHeading: 'Meteora',
    projectsMeteoraThirteenStage: 'Completed',
    projectsMeteoraThirteenLocation: 'Thessaloniki',
    projectsMeteoraThirteenType: 'Apartment building',
    projectsMeteoraThirteenScale: '6 Floors<br>11 Apartments',
    projectsMeteoraFourteenHeading: 'Meteora',
    projectsMeteoraFourteenStage: 'Completed',
    projectsMeteoraFourteenLocation: 'Thessaloniki',
    projectsMeteoraFourteenType: 'Apartment building',
    projectsMeteoraFourteenScale: '6 Floors<br>11 Apartments',
    projectsSykiesFifteenHeading: 'Sykies',
    projectsSykiesFifteenStage: 'Completed',
    projectsSykiesFifteenLocation: 'Thessaloniki',
    projectsSykiesFifteenType: 'Apartment building',
    projectsSykiesFifteenScale: '4 Floors<br>7 Apartments',
    projectCard02Heading: 'Palaiokastro',
    projectCard02Stage: 'Completed',
    projectCard02Location: 'Thessaloniki',
    projectCard02Type: 'Residential complex',
    projectCard02Scale: '10 Maisonettes<br>39 Apartments',
    projectCard03Heading: 'Palaiokastro',
    projectCard03Stage: 'Completed',
    projectCard03Location: 'Thessaloniki',
    projectCard03Type: 'Residential complex',
    projectCard03Scale: '5 Maisonettes<br>9 Apartments',
    projectCard04Heading: 'Meteora',
    projectCard04Stage: 'Completed',
    projectCard04Location: 'Thessaloniki',
    projectCard04Type: 'Residential complex',
    projectCard04Scale: '54 Apartments',
    projectCard05Heading: 'Oraiokastro',
    projectCard05Stage: 'Completed',
    projectCard05Location: 'Thessaloniki',
    projectCard05Type: 'Detached house',
    projectCard05Scale: '3 Floors',
    projectCard06Heading: 'Evosmos',
    projectCard06Stage: 'Completed',
    projectCard06Location: 'Thessaloniki',
    projectCard06Type: 'Detached house',
    projectCard06Scale: '4 Floors<br>4 Apartments',
    projectCard07Heading: 'Neapoli',
    projectCard07Stage: 'Completed',
    projectCard07Location: 'Thessaloniki',
    projectCard07Type: 'Apartment building',
    projectCard07Scale: '5 Floors<br>5 Apartments',
    projectCard08Heading: 'Agios Pavlos',
    projectCard08Stage: 'Completed',
    projectCard08Location: 'Thessaloniki',
    projectCard08Type: 'Apartment building',
    projectCard08Scale: '4 Floors<br>8 Apartments',
    projectCard09Heading: 'Neapoli',
    projectCard09Stage: 'Completed',
    projectCard09Location: 'Thessaloniki',
    projectCard09Type: 'Apartment building',
    projectCard09Scale: '4 Floors<br>8 Apartments',
    projectCard10Heading: 'Meteora',
    projectCard10Stage: 'Completed',
    projectCard10Location: 'Thessaloniki',
    projectCard10Type: 'Apartment building',
    projectCard10Scale: '4 Floors<br>4 Apartments',
    projectCard11Heading: 'Meteora',
    projectCard11Stage: 'Completed',
    projectCard11Location: 'Thessaloniki',
    projectCard11Type: 'Apartment building',
    projectCard11Scale: '5 Floors<br>10 Apartments',
    projectCard12Heading: 'Ano Ilioupoli',
    projectCard12Stage: 'Completed',
    projectCard12Location: 'Thessaloniki',
    projectCard12Type: 'Apartment building',
    projectCard12Scale: '5 Floors<br>5 Apartments',
    projectCard13Heading: 'Meteora',
    projectCard13Stage: 'Completed',
    projectCard13Location: 'Thessaloniki',
    projectCard13Type: 'Apartment building',
    projectCard13Scale: '4 Floors<br>4 Apartments',
    projectCard14Heading: 'Meteora',
    projectCard14Stage: 'Completed',
    projectCard14Location: 'Thessaloniki',
    projectCard14Type: 'Apartment building',
    projectCard14Scale: '6 Floors<br>11 Apartments',
    projectCard15Heading: 'Meteora',
    projectCard15Stage: 'Completed',
    projectCard15Location: 'Thessaloniki',
    projectCard15Type: 'Apartment building',
    projectCard15Scale: '6 Floors<br>11 Apartments',
    projectCard16Heading: 'Sykies',
    projectCard16Stage: 'Completed',
    projectCard16Location: 'Thessaloniki',
    projectCard16Type: 'Apartment building',
    projectCard16Scale: '4 Floors<br>7 Apartments',
    projectsTwoEyebrow: 'COMPLETED',
    projectsTwoHeading: 'Apartment building<br><i>with character.</i>',
    projectsTwoIntro: 'For completed buildings, the page focuses on the facade, the corner of the building, and the surrounding urban context.',
    projectsTwoType: 'Residential building',
    projectsTwoArea: 'Thessaloniki',
    projectsTwoStatus: 'Completed',
    projectsThreeEyebrow: 'RESIDENTIAL',
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
    renovationsLeadHeading: 'Complete<br class="renovation-mobile-break"> apartment building<br><i>renovation.</i>',
    renovationsStagesHeading: 'Stages of work',
    renovationsPhaseOneTitle: 'Survey',
    renovationsPhaseOneBody: 'We record the existing condition, needs, and limitations of the space.',
    renovationsPhaseTwoTitle: 'Organization',
    renovationsPhaseTwoBody: 'We coordinate crews, materials, and timelines so the project moves forward in order.',
    renovationsPhaseThreeTitle: 'Delivery',
    renovationsPhaseThreeBody: 'We complete the details with the goal of a functional, clean, and durable space.',
    renovationsDetailsEyebrow: 'DETAILS',
    renovationsDetailsHeading: 'Work points.',
    renovationsDetailsIntro: 'The previous page used a gallery logic. Here, we translate it into a calmer, more curated presentation.',
    renovationsCardOneLabel: 'SITE WORK',
    renovationsCardOneTitle: 'Exterior works',
    renovationsCardTwoLabel: 'SYSTEMS',
    renovationsCardTwoTitle: 'Technical infrastructure',
    renovationsCardThreeLabel: 'INTERIOR',
    renovationsCardThreeTitle: 'Interior preparation',
    renovationsCtaHeading: 'Do you have a space<br>for renovation?',
    renovationsCtaButton: 'Let’s talk',
    contactPageLabel: 'CONTACT',
    contactPageTitle: 'Contact',
    contactAddressLabel: 'Address',
    contactPhoneLabel: 'Phone',
    contactEmailLabel: 'Email',
    contactNameLabel: 'Full name *',
    contactFormEmailLabel: 'Email *',
    contactFormPhoneLabel: 'Phone',
    contactMessageLabel: 'Your message *',
    contactSubmitButton: 'Send message',
    formRequiredMissing: 'Please fill in all mandatory fields marked with an asterisk.',
    formEmailInvalid: 'Please enter a valid email address.',
    formSending: 'Sending...',
    formErrorDefault: 'The message was not sent.',
    formSuccess: 'Your message has been recorded. We will contact you soon.',
    formNetworkError: 'There was a problem sending the message.',
    footerContactAria: 'Contact details',
    footerPhoneLabel: 'Phone',
    footerEmailLabel: 'Email',
    footerRights: '© 2026 All rights reserved.',
    footerTop: 'BACK TO TOP',
    imageLightboxClose: 'Close image',
    imageLightboxPrevious: 'Previous image',
    imageLightboxNext: 'Next image',
    imageLightboxGoTo: 'Go to image'
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

const imageLightboxLinks = Array.from(document.querySelectorAll('.image-open-link'));

if (imageLightboxLinks.length) {
  let activeImageTrigger = null;
  let activeImageGroup = [];
  let activeImageIndex = 0;
  let imageLightboxTouchStartX = 0;
  let imageLightboxTouchStartY = 0;
  let imageLightboxTouchMoved = false;
  let imageLightboxTransitionTimer = 0;
  let imageLightboxTransitionId = 0;
  const preloadedImagePromises = new Map();
  const imageLightbox = document.createElement('div');

  imageLightbox.className = 'image-lightbox';
  imageLightbox.setAttribute('aria-hidden', 'true');
  imageLightbox.setAttribute('role', 'dialog');
  imageLightbox.setAttribute('aria-modal', 'true');
  imageLightbox.innerHTML = `
    <div class="image-lightbox-frame">
      <img src="" alt="" data-image-lightbox-image>
    </div>
    <button class="image-lightbox-arrow image-lightbox-arrow-prev" type="button" data-image-lightbox-previous><span aria-hidden="true"></span></button>
    <button class="image-lightbox-arrow image-lightbox-arrow-next" type="button" data-image-lightbox-next><span aria-hidden="true"></span></button>
    <div class="image-lightbox-dots" data-image-lightbox-dots hidden></div>
    <button class="image-lightbox-close" type="button" data-image-lightbox-close><span aria-hidden="true"></span></button>
  `;

  document.body.append(imageLightbox);

  const imageLightboxImage = imageLightbox.querySelector('[data-image-lightbox-image]');
  const imageLightboxClose = imageLightbox.querySelector('[data-image-lightbox-close]');
  const imageLightboxPrevious = imageLightbox.querySelector('[data-image-lightbox-previous]');
  const imageLightboxNext = imageLightbox.querySelector('[data-image-lightbox-next]');
  const imageLightboxDots = imageLightbox.querySelector('[data-image-lightbox-dots]');
  const imageLightboxFrame = imageLightbox.querySelector('.image-lightbox-frame');

  function getImageGroup(trigger) {
    const groupName = trigger.dataset.lightboxGroup;

    if (!groupName) {
      return [trigger];
    }

    return imageLightboxLinks.filter((link) => link.dataset.lightboxGroup === groupName);
  }

  function updateImageLightboxControls() {
    const dictionary = getCurrentDictionary();
    const hasMultipleImages = activeImageGroup.length > 1;

    imageLightboxClose.setAttribute('aria-label', dictionary.imageLightboxClose);
    imageLightboxPrevious.setAttribute('aria-label', dictionary.imageLightboxPrevious);
    imageLightboxNext.setAttribute('aria-label', dictionary.imageLightboxNext);
    imageLightboxPrevious.hidden = !hasMultipleImages;
    imageLightboxNext.hidden = !hasMultipleImages;
    imageLightboxDots.hidden = !hasMultipleImages;
    imageLightboxDots.replaceChildren();

    if (!hasMultipleImages) {
      return;
    }

    activeImageGroup.forEach((_, index) => {
      const dot = document.createElement('button');
      const isActive = index === activeImageIndex;

      dot.className = `image-lightbox-dot${isActive ? ' is-active' : ''}`;
      dot.type = 'button';
      dot.setAttribute('aria-label', `${dictionary.imageLightboxGoTo} ${index + 1}`);

      if (isActive) {
        dot.setAttribute('aria-current', 'true');
      }

      dot.addEventListener('click', () => {
        const direction = index === activeImageIndex ? 0 : index > activeImageIndex ? 1 : -1;
        showImageLightboxItem(index, direction);
      });
      imageLightboxDots.append(dot);
    });
  }

  function clearImageLightboxTransition() {
    window.clearTimeout(imageLightboxTransitionTimer);
    imageLightboxTransitionTimer = 0;
    imageLightboxFrame.querySelectorAll('.image-lightbox-transition-image').forEach((image) => image.remove());
    imageLightboxImage.classList.remove(
      'image-lightbox-base-hidden',
      'image-lightbox-slide-in-left',
      'image-lightbox-slide-in-right',
      'image-lightbox-slide-out-left',
      'image-lightbox-slide-out-right'
    );
  }

  function preloadImageLightboxLink(link) {
    const href = link?.getAttribute('href');

    if (!href) {
      return Promise.resolve(false);
    }

    if (preloadedImagePromises.has(href)) {
      return preloadedImagePromises.get(href);
    }

    const preloadImage = new Image();
    const preloadPromise = new Promise((resolve) => {
      preloadImage.onload = () => {
        if (preloadImage.decode) {
          preloadImage.decode().then(() => resolve(true)).catch(() => resolve(true));
        } else {
          resolve(true);
        }
      };

      preloadImage.onerror = () => resolve(false);
    });

    preloadImage.decoding = 'async';
    preloadImage.src = href;
    preloadedImagePromises.set(href, preloadPromise);

    return preloadPromise;
  }

  function preloadNearbyLightboxImages() {
    if (activeImageGroup.length < 2) {
      return;
    }

    const previousIndex = (activeImageIndex - 1 + activeImageGroup.length) % activeImageGroup.length;
    const nextIndex = (activeImageIndex + 1) % activeImageGroup.length;

    preloadImageLightboxLink(activeImageGroup[previousIndex]);
    preloadImageLightboxLink(activeImageGroup[nextIndex]);
  }

  function showImageLightboxItem(index, direction = 0) {
    if (!activeImageGroup.length) {
      return false;
    }

    const nextImageIndex = (index + activeImageGroup.length) % activeImageGroup.length;

    const link = activeImageGroup[nextImageIndex];
    const image = link.querySelector('img');
    const href = link.getAttribute('href');

    if (!href || !image) {
      return false;
    }

    const hasCurrentImage = Boolean(imageLightboxImage.getAttribute('src'));
    const shouldAnimate = direction !== 0 && hasCurrentImage && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const nextImageAlt = image.alt || '';

    clearImageLightboxTransition();
    imageLightboxTransitionId += 1;

    const transitionId = imageLightboxTransitionId;
    const currentImageSrc = imageLightboxImage.currentSrc || imageLightboxImage.src;
    const currentImageAlt = imageLightboxImage.alt || '';

    activeImageTrigger = link;
    activeImageIndex = nextImageIndex;
    updateImageLightboxControls();
    preloadNearbyLightboxImages();

    if (!shouldAnimate) {
      imageLightboxImage.src = href;
      imageLightboxImage.alt = nextImageAlt;
      preloadImageLightboxLink(link);

      return true;
    }

    const slideInClass = direction > 0 ? 'image-lightbox-slide-in-right' : 'image-lightbox-slide-in-left';
    const slideOutClass = direction > 0 ? 'image-lightbox-slide-out-left' : 'image-lightbox-slide-out-right';

    preloadImageLightboxLink(link).then(() => {
      if (transitionId !== imageLightboxTransitionId || !imageLightbox.classList.contains('is-open')) {
        return;
      }

      clearImageLightboxTransition();

      const outgoingImage = document.createElement('img');
      const incomingImage = document.createElement('img');

      outgoingImage.src = currentImageSrc;
      outgoingImage.alt = currentImageAlt;
      outgoingImage.className = `image-lightbox-transition-image ${slideOutClass}`;

      incomingImage.src = href;
      incomingImage.alt = nextImageAlt;
      incomingImage.className = `image-lightbox-transition-image ${slideInClass}`;

      imageLightboxImage.classList.add('image-lightbox-base-hidden');
      imageLightboxFrame.append(outgoingImage, incomingImage);

      const finishTransition = () => {
        if (transitionId !== imageLightboxTransitionId) {
          return;
        }

        imageLightboxImage.src = href;
        imageLightboxImage.alt = nextImageAlt;
        clearImageLightboxTransition();
      };

      incomingImage.addEventListener('animationend', finishTransition, { once: true });
      imageLightboxTransitionTimer = window.setTimeout(finishTransition, 360);
    });


    return true;
  }

  function closeImageLightbox() {
    imageLightbox.classList.remove('is-open');
    imageLightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    imageLightboxTransitionId += 1;
    imageLightboxImage.removeAttribute('src');
    clearImageLightboxTransition();
    activeImageTrigger?.focus();
    activeImageTrigger = null;
    activeImageGroup = [];
    activeImageIndex = 0;
    imageLightboxTouchMoved = false;
    imageLightboxDots.hidden = true;
    imageLightboxDots.replaceChildren();
  }

  function openImageLightbox(trigger) {
    activeImageGroup = getImageGroup(trigger);
    activeImageIndex = Math.max(activeImageGroup.indexOf(trigger), 0);

    if (!showImageLightboxItem(activeImageIndex)) {
      return;
    }

    imageLightbox.classList.add('is-open');
    imageLightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    imageLightboxTouchMoved = false;
    imageLightboxClose.focus();
  }

  function moveImageLightbox(direction) {
    if (activeImageGroup.length < 2) {
      return;
    }

    showImageLightboxItem(activeImageIndex + direction, direction);
  }

  imageLightboxLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openImageLightbox(link);
    });
  });

  imageLightbox.addEventListener('click', (event) => {
    if (imageLightboxTouchMoved) {
      imageLightboxTouchMoved = false;
      return;
    }

    if (event.target === imageLightbox || event.target === imageLightboxFrame) {
      closeImageLightbox();
    }
  });

  imageLightboxClose.addEventListener('click', closeImageLightbox);
  imageLightboxPrevious.addEventListener('click', () => moveImageLightbox(-1));
  imageLightboxNext.addEventListener('click', () => moveImageLightbox(1));

  imageLightboxFrame.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) {
      return;
    }

    imageLightboxTouchMoved = false;
    imageLightboxTouchStartX = event.touches[0].clientX;
    imageLightboxTouchStartY = event.touches[0].clientY;
  }, { passive: true });

  imageLightboxFrame.addEventListener('touchend', (event) => {
    if (activeImageGroup.length < 2 || !event.changedTouches.length) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - imageLightboxTouchStartX;
    const deltaY = touch.clientY - imageLightboxTouchStartY;
    const isHorizontalSwipe = Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (!isHorizontalSwipe) {
      return;
    }

    event.preventDefault();
    imageLightboxTouchMoved = true;
    moveImageLightbox(deltaX < 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener('keydown', (event) => {
    if (!imageLightbox.classList.contains('is-open')) {
      return;
    }

    if (event.key === 'Escape') {
      closeImageLightbox();
    } else if (event.key === 'ArrowLeft') {
      moveImageLightbox(-1);
    } else if (event.key === 'ArrowRight') {
      moveImageLightbox(1);
    }
  });
}

const revealItems = document.querySelectorAll('.service-item, .project-feature, .project-card, .work-card, .building-story, .gallery-wall figure, .archive-item, .phase-list > div, .contact-method, .process-steps > div');
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
  const requiredFields = Array.from(contactForm.querySelectorAll('[required]'));
  const missingField = requiredFields.find((field) => !String(field.value || '').trim());
  const invalidEmail = contactForm.querySelector('input[type="email"]:invalid');
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  const dictionary = getCurrentDictionary();

  formStatus.className = 'form-status';

  if (missingField) {
    formStatus.textContent = dictionary.formRequiredMissing;
    formStatus.classList.add('is-error', 'is-visible');
    missingField.focus();
    return;
  }

  if (invalidEmail) {
    formStatus.textContent = dictionary.formEmailInvalid;
    formStatus.classList.add('is-error', 'is-visible');
    invalidEmail.focus();
    return;
  }

  formStatus.textContent = dictionary.formSending;
  formStatus.classList.add('is-visible');
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
