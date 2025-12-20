export type Language = 'FR' | 'EN';

export const CHAT_FLOW_BILINGUAL = {
  FR: {
    start: {
      text: "Bienvenue. Prêt pour votre Audit Stratégique 360 ? (3 min)",
      options: [{ label: "Lancer l'audit", value: "start", nextStep: "q1" }]
    },
    q1: { text: "Quel est le nom de votre entreprise ?", type: "input", nextStep: "q2" },
    q2: { 
      text: "Votre secteur d'activité ?", 
      options: [
        { label: "E-commerce", value: "eco", nextStep: "q3" },
        { label: "SaaS / Tech", value: "tech", nextStep: "q3" },
        { label: "Autre (Précisez)", value: "other", nextStep: "q2_preciser" }
      ] 
    },
    q2_preciser: { text: "Quel est votre secteur d'activité précisément ?", type: "input", nextStep: "q3" },
    q3: { text: "Quel est votre objectif principal ?", options: [
        { label: "Visibilité / SEO", value: "seo", nextStep: "q4" },
        { label: "Conversion / Ventes", value: "sales", nextStep: "q4" }
    ]},
    q4: { text: "Avez-vous déjà un site web ?", options: [
        { label: "Oui", value: "yes", nextStep: "q5" },
        { label: "Non", value: "no", nextStep: "q5" }
    ]},
    q5: { text: "Où se situe votre public cible ?", options: [
        { label: "Local", value: "local", nextStep: "q5_ville" },
        { label: "International", value: "international", nextStep: "q6" }
    ]},
    q5_ville: { text: "Dans quelle ville ou pays vous situez-vous ?", type: "input", nextStep: "q6" },
    // ... suite des questions jusqu'à q13 ...
    q13: { text: "Dernière étape ! Votre adresse email :", type: "input", nextStep: "loading" }
  },
  EN: {
    start: {
      text: "Welcome. Ready for your 360 Strategic Audit? (3 min)",
      options: [{ label: "Start Audit", value: "start", nextStep: "q1" }]
    },
    q1: { text: "What is your company name?", type: "input", nextStep: "q2" },
    q2: { text: "Your industry?", options: [
        { label: "E-commerce", value: "eco", nextStep: "q3" },
        { label: "SaaS / Tech", value: "tech", nextStep: "q3" },
        { label: "Other (Specify)", value: "other", nextStep: "q2_specify" }
    ]},
    q2_specify: { text: "Please specify your industry:", type: "input", nextStep: "q3" },
    q3: { text: "What is your primary goal?", options: [
        { label: "Visibility / SEO", value: "seo", nextStep: "q4" },
        { label: "Conversion / Sales", value: "sales", nextStep: "q4" }
    ]},
    q4: { text: "Do you already have a website?", options: [
        { label: "Yes", value: "yes", nextStep: "q5" },
        { label: "No", value: "no", nextStep: "q5" }
    ]},
    q5: { text: "Where is your target audience located?", options: [
        { label: "Local", value: "local", nextStep: "q5_city" },
        { label: "International", value: "international", nextStep: "q6" }
    ]},
    q5_city: { text: "Which city or country are you targeting?", type: "input", nextStep: "q6" },
    // ... suite ...
    q13: { text: "Last step! Your email address:", type: "input", nextStep: "loading" }
  }
};
