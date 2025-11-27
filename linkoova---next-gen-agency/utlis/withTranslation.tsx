import React, { ComponentType } from 'react';
// ⚠️ VÉRIFIEZ LE CHEMIN RELATIF VERS TranslationContext.ts
import { useTranslationContext, TranslationContextType } from '../TranslationContext';

// 1. Définir les props que nous allons injecter
export type WithTranslationProps = {
    t: TranslationContextType['t'];
    i18n: TranslationContextType['i18n'];
};

// 2. Le Higher-Order Component (HOC)
// P est le type des props originales du composant (ex: { onNavigate: (page) => void })
// L'union avec Partial<WithTranslationProps> permet de s'assurer que si 't' est déjà là, 
// les types se combinent bien, bien que 't' soit toujours injecté par le HOC.
export function withTranslation<P>(WrappedComponent: ComponentType<P & WithTranslationProps>) {
    
    // Le composant d'enveloppement (Wrapper) qui utilise le hook
    const ComponentWithTranslation = (props: Omit<P, keyof WithTranslationProps>) => {
        // ✅ C'est le SEUL endroit où nous appelons le hook useTranslationContext()
        const { t, i18n } = useTranslationContext();
        
        // 🚀 On injecte t et i18n dans les props du composant original
        // On fusionne les props originales (ex: onNavigate) avec les props de traduction (t, i18n)
        return (
            <WrappedComponent 
                {...(props as P)} 
                t={t} 
                i18n={i18n} 
            />
        );
    };

    // Nom pour faciliter le débogage dans les outils React DevTools
    ComponentWithTranslation.displayName = `withTranslation(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    // Le HOC retourne le composant enveloppé.
    return ComponentWithTranslation as ComponentType<P>;
}
