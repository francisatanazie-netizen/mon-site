export type Language = 'FR' | 'EN';

export const CHAT_FLOW_BILINGUAL = {
  FR: {
    start: { text: "Bienvenue chez Linkoova. Prêt pour votre Audit Stratégique 360 ? (3 min)", options: [{ label: "Lancer l'audit", value: "start", nextStep: "q1" }] },
    q1: { text: "Quel est le nom de votre entreprise ?", type: "input", nextStep: "q2" },
    q2: { text: "Votre secteur d'activité ?", options: [
        { label: "E-commerce", value: "eco", nextStep: "q3" },
        { label: "SaaS / Tech", value: "tech", nextStep: "q3" },
        { label: "Autre", value: "other", nextStep: "q2_other" }
    ]},
    q2_other: { text: "Quel est votre secteur précisément ?", type: "input", nextStep: "q3" },
    q3: { text: "Quel est votre objectif principal ?", options: [
        { label: "Visibilité / SEO", value: "seo", nextStep: "q4" },
        { label: "Ventes / Leads", value: "sales", nextStep: "q4" }
    ]},
    q4: { text: "Avez-vous déjà un site web ?", options: [
        { label: "Oui", value: "yes", nextStep: "q5" },
        { label: "Non", value: "no", nextStep: "q5" }
    ]},
    q5: { text: "Où se situe votre public cible ?", options: [
        { label: "Local", value: "local", nextStep: "q5_city" },
        { label: "International", value: "intl", nextStep: "q6" }
    ]},
    q5_city: { text: "Dans quelle ville ou pays ?", type: "input", nextStep: "q6" },
    q6: { text: "Avez-vous une charte graphique ?", options: [{ label: "Oui", value: "y", nextStep: "q7" }, { label: "Non", value: "n", nextStep: "q7" }] },
    q7: { text: "Votre plus gros défi business ?", type: "input", nextStep: "q8" },
    q8: { text: "Besoin d'une App Mobile ?", options: [{ label: "Oui", value: "y", nextStep: "q9" }, { label: "Non", value: "n", nextStep: "q9" }] },
    q9: { text: "Échéance du projet ?", options: [{ label: "Urgent", value: "u", nextStep: "q10" }, { label: "1-3 mois", value: "m", nextStep: "q10" }] },
    q10: { text: "Budget prévisionnel ?", options: [{ label: "1k-5k", value: "s", nextStep: "q11" }, { label: "5k-15k", value: "m", nextStep: "q11" }, { label: "15k+", value: "l", nextStep: "q11" }] },
    q11: { text: "Maintenance incluse ?", options: [{ label: "Oui", value: "y", nextStep: "q12" }, { label: "Non", value: "n", nextStep: "q12" }] },
    q12: { text: "Nombre de pages estimé ?", type: "input", nextStep: "q13" },
    q13: { text: "Votre email pour l'audit final :", type: "input", nextStep: "loading" }
  },
  EN: {
    start: { text: "Welcome to Linkoova. Ready for your 360 Strategic Audit? (3 min)", options: [{ label: "Start Audit", value: "start", nextStep: "q1" }] },
    q1: { text: "What is your company name?", type: "input", nextStep: "q2" },
    q2: { text: "Your industry?", options: [
        { label: "E-commerce", value: "eco", nextStep: "q3" },
        { label: "SaaS / Tech", value: "tech", nextStep: "q3" },
        { label: "Other", value: "other", nextStep: "q2_other" }
    ]},
    q2_other: { text: "Please specify your industry:", type: "input", nextStep: "q3" },
    q3: { text: "What is your primary goal?", options: [
        { label: "Visibility / SEO", value: "seo", nextStep: "q4" },
        { label: "Sales / Leads", value: "sales", nextStep: "q4" }
    ]},
    q4: { text: "Do you already have a website?", options: [
        { label: "Yes", value: "yes", nextStep: "q5" },
        { label: "No", value: "no", nextStep: "q5" }
    ]},
    q5: { text: "Where is your target audience?", options: [
        { label: "Local", value: "local", nextStep: "q5_city" },
        { label: "International", value: "intl", nextStep: "q6" }
    ]},
    q5_city: { text: "In which city or country?", type: "input", nextStep: "q6" },
    q6: { text: "Do you have a brand guide?", options: [{ label: "Yes", value: "y", nextStep: "q7" }, { label: "No", value: "n", nextStep: "q7" }] },
    q7: { text: "Biggest business challenge?", type: "input", nextStep: "q8" },
    q8: { text: "Need a Mobile App?", options: [{ label: "Yes", value: "y", nextStep: "q9" }, { label: "No", value: "n", nextStep: "q9" }] },
    q9: { text: "Project timeline?", options: [{ label: "Urgent", value: "u", nextStep: "q10" }, { label: "1-3 months", value: "m", nextStep: "q10" }] },
    q10: { text: "Estimated budget?", options: [{ label: "$1k-5k", value: "s", nextStep: "q11" }, { label: "$5k-15k", value: "m", nextStep: "q11" }, { label: "$15k+", value: "l", nextStep: "q11" }] },
    q11: { text: "Include maintenance?", options: [{ label: "Yes", value: "y", nextStep: "q12" }, { label: "No", value: "n", nextStep: "q12" }] },
    q12: { text: "Approximate page count?", type: "input", nextStep: "q13" },
    q13: { text: "Your email for the final audit:", type: "input", nextStep: "loading" }
  }
};
