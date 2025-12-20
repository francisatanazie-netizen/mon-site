export type Language = 'FR' | 'EN';

export const CHAT_FLOW_BILINGUAL = {
  FR: {
    start: { text: "Bienvenue. Définissons l'architecture de votre futur succès. (Audit 360°)", options: [{ label: "Démarrer l'audit", value: "start", nextStep: "q1" }] },
    
    // --- PILIER 1 : IDENTITÉ ---
    q1: { text: "Quel est le nom de votre entreprise ou projet ?", type: "input", nextStep: "q2" },
    q2: { text: "S'agit-il d'une création ou d'une refonte ?", options: [
        { label: "Nouveau Projet", value: "new", nextStep: "q3" },
        { label: "Refonte / Optimisation", value: "re", nextStep: "q3" }
    ]},
    q3: { text: "Nature du projet :", options: [
        { label: "Site Web / SaaS", value: "web", nextStep: "q4" },
        { label: "Application Mobile", value: "mobile", nextStep: "q4" },
        { label: "Autre / Hybride", value: "other", nextStep: "q3_other" }
    ]},
    q3_other: { text: "Décrivez la nature spécifique de votre support :", type: "input", nextStep: "q4" },

    // --- PILIER 2 : MARCHÉ & CIBLE ---
    q4: { text: "Quel est votre public cible principal ?", options: [
        { label: "B2B", value: "b2b", nextStep: "q5" },
        { label: "B2C", value: "b2c", nextStep: "q5" },
        { label: "Autre", value: "other", nextStep: "q4_other" }
    ]},
    q4_other: { text: "Précisez votre audience :", type: "input", nextStep: "q5" },
    q5: { text: "Portée géographique du projet :", options: [
        { label: "Locale", value: "loc", nextStep: "q5_p" },
        { label: "Internationale", value: "intl", nextStep: "q5_p" }
    ]},
    q5_p: { text: "Précisez les zones ou pays visés :", type: "input", nextStep: "q6" },

    // --- PILIER 3 : DESIGN & IMAGE ---
    q6: { text: "Avez-vous une identité visuelle établie ?", options: [
        { label: "Oui, complète", value: "y", nextStep: "q6_y" },
        { label: "Non, à concevoir", value: "n", nextStep: "q6_n" }
    ]},
    q6_y: { text: "Partagez vos couleurs ou un lien vers vos assets :", type: "input", nextStep: "q7" },
    q6_n: { text: "Citez une marque dont l'esthétique vous inspire :", type: "input", nextStep: "q7" },
    q7: { text: "Quelle émotion l'interface doit-elle dégager ? (Luxe, Innovation, Confiance...)", type: "input", nextStep: "q8" },

    // --- PILIER 4 : TECHNIQUE & FONCTIONNALITÉS ---
    q8: { text: "Quelle est la fonctionnalité n°1 indispensable ?", type: "input", nextStep: "q9" },
    q9: { text: "Intégrations tierces (CRM, Paiement, API) ?", options: [
        { label: "Oui", value: "y", nextStep: "q9_p" },
        { label: "Non / Pas encore", value: "n", nextStep: "q10" }
    ]},
    q9_p: { text: "Lesquels ? (Ex: Stripe, Salesforce...)", type: "input", nextStep: "q10" },
    q10: { text: "Besoin d'accompagnement pour la maintenance ?", options: [
        { label: "Oui, gestion totale", value: "y", nextStep: "q11" },
        { label: "Non, autonome", value: "n", nextStep: "q11" }
    ]},

    // --- PILIER 5 : BUSINESS & CONVERSION ---
    q11: { text: "Quel défi business majeur devons-nous résoudre ?", type: "input", nextStep: "q12" },
    q12: { text: "Budget prévisionnel (Investissement) :", options: [
        { label: "5k - 15k €", value: "s", nextStep: "q13" },
        { label: "15k - 50k €", value: "m", nextStep: "q13" },
        { label: "Sur mesure", value: "other", nextStep: "q12_other" }
    ]},
    q12_other: { text: "Précisez votre enveloppe budgétaire :", type: "input", nextStep: "q13" },
    q13: { text: "Échéance souhaitée pour le lancement :", options: [
        { label: "Urgent", value: "u", nextStep: "q14" },
        { label: "3-4 mois", value: "s", nextStep: "q14" },
        { label: "Autre", value: "other", nextStep: "q13_other" }
    ]},
    q13_other: { text: "Précisez votre délai idéal :", type: "input", nextStep: "q14" },
    q14: { text: "Comment avez-vous connu Linkoova ?", type: "input", nextStep: "q15" },
    q15: { text: "Dernière étape. Votre email pour recevoir l'audit :", type: "input", nextStep: "loading" }
  },
  EN: {
    // Structure identique à traduire...
  }
};
