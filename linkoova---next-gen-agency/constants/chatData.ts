export type Language = 'FR' | 'EN';

export const CHAT_FLOW_BILINGUAL: any = {
  FR: {
    start: { 
      text: "Bienvenue chez Linkoova. Analysons votre vision. (Audit Stratégique)", 
      options: [{ label: "Lancer l'audit", value: "start", nextStep: "q1" }] 
    },
    q1: { text: "Quel est le nom de votre entreprise ou projet ?", type: "input", nextStep: "q2" },
    q2: { text: "S'agit-il d'une création ou d'une refonte ?", options: [
        { label: "Nouveau Projet", value: "new", nextStep: "q3" },
        { label: "Refonte / Optimisation", value: "re", nextStep: "q3" }
    ]},
    q3: { text: "Type de support souhaité :", options: [
        { label: "Site Web / SaaS", value: "web", nextStep: "q4" },
        { label: "Application Mobile", value: "mobile", nextStep: "q4" },
        { label: "Autre / Hybride", value: "other", nextStep: "q3_other" }
    ]},
    q3_other: { text: "Précisez la nature de votre support :", type: "input", nextStep: "q4" },
    q4: { text: "Quel est votre public cible ?", options: [
        { label: "B2B", value: "b2b", nextStep: "q5" },
        { label: "B2C", value: "b2c", nextStep: "q5" },
        { label: "Autre", value: "other", nextStep: "q4_other" }
    ]},
    q4_other: { text: "Précisez votre audience :", type: "input", nextStep: "q5" },
    q5: { text: "Portée géographique :", options: [
        { label: "Locale", value: "loc", nextStep: "q5_p" },
        { label: "Internationale", value: "intl", nextStep: "q5_p" }
    ]},
    q5_p: { text: "Quelles zones visez-vous ?", type: "input", nextStep: "q6" },
    q6: { text: "Identité visuelle :", options: [
        { label: "Oui, existante", value: "y", nextStep: "q6_y" },
        { label: "Non, à créer", value: "n", nextStep: "q6_n" }
    ]},
    q6_y: { text: "Lien vers votre charte ou couleurs :", type: "input", nextStep: "q7" },
    q6_n: { text: "Une marque qui vous inspire visuellement ?", type: "input", nextStep: "q7" },
    q7: { text: "Émotion souhaitée (Luxe, Tech, Confiance...) ?", type: "input", nextStep: "q8" },
    q8: { text: "Fonctionnalité n°1 indispensable ?", type: "input", nextStep: "q9" },
    q9: { text: "Besoin d'intégrations (Paiement, CRM...) ?", options: [
        { label: "Oui", value: "y", nextStep: "q9_p" },
        { label: "Non", value: "n", nextStep: "q10" }
    ]},
    q9_p: { text: "Lesquels ? (Stripe, HubSpot...)", type: "input", nextStep: "q10" },
    q10: { text: "Maintenance & Hébergement gérés par nous ?", options: [
        { label: "Oui, clé en main", value: "y", nextStep: "q11" },
        { label: "Non, autonome", value: "n", nextStep: "q11" }
    ]},
    q11: { text: "Plus gros défi business actuel ?", type: "input", nextStep: "q12" },
    q12: { text: "Budget prévisionnel :", options: [
        { label: "5k - 15k €", value: "s", nextStep: "q13" },
        { label: "15k - 50k €", value: "m", nextStep: "q13" },
        { label: "Sur-mesure", value: "other", nextStep: "q12_other" }
    ]},
    q12_other: { text: "Précisez votre budget :", type: "input", nextStep: "q13" },
    q13: { text: "Délai souhaité :", options: [
        { label: "ASAP", value: "u", nextStep: "q14" },
        { label: "3-4 mois", value: "s", nextStep: "q14" },
        { label: "Autre", value: "other", nextStep: "q13_other" }
    ]},
    q13_other: { text: "Votre délai idéal ?", type: "input", nextStep: "q14" },
    q14: { text: "Comment nous avez-vous connu ?", type: "input", nextStep: "q15" },
    q15: { text: "Dernière étape. Votre email professionnel :", type: "input", nextStep: "loading" }
  },
  EN: {
    start: { 
      text: "Welcome to Linkoova. Let's analyze your vision. (Strategic Audit)", 
      options: [{ label: "Start Audit", value: "start", nextStep: "q1" }] 
    },
    q1: { text: "What is the name of your company or project?", type: "input", nextStep: "q2" },
    q2: { text: "Is this a new creation or a redesign?", options: [
        { label: "New Project", value: "new", nextStep: "q3" },
        { label: "Redesign / Optimization", value: "re", nextStep: "q3" }
    ]},
    q3: { text: "Desired platform type:", options: [
        { label: "Website / SaaS", value: "web", nextStep: "q4" },
        { label: "Mobile App", value: "mobile", nextStep: "q4" },
        { label: "Other / Hybrid", value: "other", nextStep: "q3_other" }
    ]},
    q3_other: { text: "Specify the nature of your platform:", type: "input", nextStep: "q4" },
    q4: { text: "Who is your target audience?", options: [
        { label: "B2B", value: "b2b", nextStep: "q5" },
        { label: "B2C", value: "b2c", nextStep: "q5" },
        { label: "Other", value: "other", nextStep: "q4_other" }
    ]},
    q4_other: { text: "Specify your audience:", type: "input", nextStep: "q5" },
    q5: { text: "Geographic scope:", options: [
        { label: "Local", value: "loc", nextStep: "q5_p" },
        { label: "International", value: "intl", nextStep: "q5_p" }
    ]},
    q5_p: { text: "Which areas are you targeting?", type: "input", nextStep: "q6" },
    q6: { text: "Visual Identity:", options: [
        { label: "Yes, existing", value: "y", nextStep: "q6_y" },
        { label: "No, to be created", value: "n", nextStep: "q6_n" }
    ]},
    q6_y: { text: "Link to your brand guidelines or colors:", type: "input", nextStep: "q7" },
    q6_n: { text: "A brand that inspires you visually?", type: "input", nextStep: "q7" },
    q7: { text: "Desired emotion (Luxury, Tech, Trust...)?", type: "input", nextStep: "q8" },
    q8: { text: "Number 1 essential feature?", type: "input", nextStep: "q9" },
    q9: { text: "Need for integrations (Payment, CRM...)?", options: [
        { label: "Yes", value: "y", nextStep: "q9_p" },
        { label: "No", value: "n", nextStep: "q10" }
    ]},
    q9_p: { text: "Which ones? (Stripe, HubSpot...)", type: "input", nextStep: "q10" },
    q10: { text: "Maintenance & Hosting managed by us?", options: [
        { label: "Yes, turnkey", value: "y", nextStep: "q11" },
        { label: "No, autonomous", value: "n", nextStep: "q11" }
    ]},
    q11: { text: "Biggest current business challenge?", type: "input", nextStep: "q12" },
    q12: { text: "Estimated budget:", options: [
        { label: "5k - 15k €", value: "s", nextStep: "q13" },
        { label: "15k - 50k €", value: "m", nextStep: "q13" },
        { label: "Custom", value: "other", nextStep: "q12_other" }
    ]},
    q12_other: { text: "Specify your budget:", type: "input", nextStep: "q13" },
    q13: { text: "Desired timeline:", options: [
        { label: "ASAP", value: "u", nextStep: "q14" },
        { label: "3-4 months", value: "s", nextStep: "q14" },
        { label: "Other", value: "other", nextStep: "q13_other" }
    ]},
    q13_other: { text: "Your ideal timeline?", type: "input", nextStep: "q14" },
    q14: { text: "How did you hear about us?", type: "input", nextStep: "q15" },
    q15: { text: "Last step. Your professional email:", type: "input", nextStep: "loading" }
  }
};
