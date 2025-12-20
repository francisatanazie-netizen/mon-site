export type Language = 'FR' | 'EN';

export const CHAT_FLOW_BILINGUAL = {
  FR: {
    start: {
      text: "Bienvenue chez Linkoova. Prêt pour votre Audit Stratégique 360 ? (3 min)",
      options: [{ label: "Lancer l'audit", value: "start", nextStep: "q1" }]
    },
    q1: { text: "Quel est le nom de votre entreprise ?", type: "input", nextStep: "q2" },
    q2: { 
      text: "Votre secteur d'activité ?", 
      options: [
        { label: "E-commerce", value: "eco", nextStep: "q3" },
        { label: "Services / B2B", value: "b2b", nextStep: "q3" },
        { label: "SaaS / Tech", value: "tech", nextStep: "q3" },
        { label: "Autre", value: "other", nextStep: "q3" }
      ] 
    },
    q3: { text: "Quel est votre objectif principal ?", options: [
        { label: "Visibilité / SEO", value: "seo", nextStep: "q4" },
        { label: "Conversion / Ventes", value: "sales", nextStep: "q4" },
        { label: "Identité de Marque", value: "brand", nextStep: "q4" }
    ]},
    q4: { text: "Avez-vous déjà un site web ?", options: [
        { label: "Oui, à optimiser", value: "yes", nextStep: "q5" },
        { label: "Non, création complète", value: "no", nextStep: "q5" }
    ]},
    q5: { text: "Quel est votre public cible ?", options: [
        { label: "Local", value: "local", nextStep: "q6" },
        { label: "National", value: "national", nextStep: "q6" },
        { label: "International", value: "international", nextStep: "q6" }
    ]},
    q6: { text: "Disposez-vous d'une charte graphique ?", type: "select", options: [
        { label: "Oui", value: "yes", nextStep: "q7" },
        { label: "Non, à créer", value: "no", nextStep: "q7" }
    ]},
    q7: { text: "Quel est le plus gros défi de votre business actuellement ?", type: "input", nextStep: "q8" },
    q8: { text: "Souhaitez-vous une application mobile ?", options: [
        { label: "Oui", value: "yes", nextStep: "q9" },
        { label: "Peut-être plus tard", value: "maybe", nextStep: "q9" },
        { label: "Non", value: "no", nextStep: "q9" }
    ]},
    q9: { text: "Quelle est votre échéance ?", options: [
        { label: "Urgent (< 1 mois)", value: "asap", nextStep: "q10" },
        { label: "1 à 3 mois", value: "1-3m", nextStep: "q10" },
        { label: "Juste en veille", value: "later", nextStep: "q10" }
    ]},
    q10: { text: "Quel budget prévisionnel allouez-vous ?", options: [
        { label: "1k€ - 5k€", value: "small", nextStep: "q11" },
        { label: "5k€ - 15k€", value: "medium", nextStep: "q11" },
        { label: "15k€ +", value: "large", nextStep: "q11" }
    ]},
    q11: { text: "Voulez-vous une maintenance incluse ?", options: [
        { label: "Oui, sérénité totale", value: "yes", nextStep: "q12" },
        { label: "Non, autonomie", value: "no", nextStep: "q12" }
    ]},
    q12: { text: "Combien de pages environ (pour le web) ?", type: "input", nextStep: "q13" },
    q13: { text: "Dernière étape ! Votre adresse email pour recevoir l'audit :", type: "input", nextStep: "loading" },
    finish: { text: "Analyse terminée. Nos experts reviennent vers vous sous 24h avec votre roadmap." }
  },
  EN: {
    start: {
      text: "Welcome to Linkoova. Ready for your 360 Strategic Audit? (3 min)",
      options: [{ label: "Start Audit", value: "start", nextStep: "q1" }]
    },
    q1: { text: "What is your company name?", type: "input", nextStep: "q2" },
    q2: { text: "Your industry?", options: [
        { label: "E-commerce", value: "eco", nextStep: "q3" },
        { label: "B2B Services", value: "b2b", nextStep: "q3" },
        { label: "SaaS / Tech", value: "tech", nextStep: "q3" },
        { label: "Other", value: "other", nextStep: "q3" }
    ]},
    q3: { text: "What is your primary goal?", options: [
        { label: "Visibility / SEO", value: "seo", nextStep: "q4" },
        { label: "Conversion / Sales", value: "sales", nextStep: "q4" },
        { label: "Brand Identity", value: "brand", nextStep: "q4" }
    ]},
    q4: { text: "Do you already have a website?", options: [
        { label: "Yes, to optimize", value: "yes", nextStep: "q5" },
        { label: "No, full creation", value: "no", nextStep: "q5" }
    ]},
    q5: { text: "Who is your target audience?", options: [
        { label: "Local", value: "local", nextStep: "q6" },
        { label: "National", value: "national", nextStep: "q6" },
        { label: "International", value: "international", nextStep: "q6" }
    ]},
    q6: { text: "Do you have a brand style guide?", options: [
        { label: "Yes", value: "yes", nextStep: "q7" },
        { label: "No, needs creation", value: "no", nextStep: "q7" }
    ]},
    q7: { text: "What is your biggest business challenge right now?", type: "input", nextStep: "q8" },
    q8: { text: "Are you interested in a mobile app?", options: [
        { label: "Yes", value: "yes", nextStep: "q9" },
        { label: "Maybe later", value: "maybe", nextStep: "q9" },
        { label: "No", value: "no", nextStep: "q9" }
    ]},
    q9: { text: "What is your timeline?", options: [
        { label: "Urgent (< 1 month)", value: "asap", nextStep: "q10" },
        { label: "1 to 3 months", value: "1-3m", nextStep: "q10" },
        { label: "Just exploring", value: "later", nextStep: "q10" }
    ]},
    q10: { text: "What is your estimated budget?", options: [
        { label: "$1k - $5k", value: "small", nextStep: "q11" },
        { label: "$5k - $15k", value: "medium", nextStep: "q11" },
        { label: "$15k +", value: "large", nextStep: "q11" }
    ]},
    q11: { text: "Would you like maintenance included?", options: [
        { label: "Yes, full peace of mind", value: "yes", nextStep: "q12" },
        { label: "No, autonomy", value: "no", nextStep: "q12" }
    ]},
    q12: { text: "Approximately how many pages (for web)?", type: "input", nextStep: "q13" },
    q13: { text: "Last step! Your email address to receive the audit:", type: "input", nextStep: "loading" },
    finish: { text: "Analysis complete. Our experts will get back to you within 24h with your roadmap." }
  }
};
