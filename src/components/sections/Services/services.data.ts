/**
 * Services Data
 * Service definitions with colors and content
 */

import { Store, BarChart3, Palette, LucideIcon } from 'lucide-react';
import { colors, hexToRgba } from './Services.styles';

// Type for color accent objects (teal, cyan, blue, etc.)
type ColorAccent = {
  readonly 50: string;
  readonly 100: string;
  readonly 200: string;
  readonly 300: string;
  readonly 400: string;
  readonly 500: string;
  readonly 600: string;
  readonly 700: string;
  readonly 800: string;
  readonly 900: string;
};

export interface Service {
  id: number;
  icon: LucideIcon;
  accroche: string;
  tagline: string;
  resume: string;
  features: string[];
  colorAccent: ColorAccent;
  glowColor: string;
  redirectUrl?: string;
}

export const services: Service[] = [
  {
    id: 1,
    icon: Palette,
    accroche: 'Site Vitrine',
    tagline: 'Une présentation sur mesure, adaptée à la densité de votre contenu.',
    resume: 'Le site vitrine est le pilier de votre identité numérique. Nous adaptons sa structure selon vos objectifs : l\'option "One-Page" idéale pour un impact immédiat, ou l\'option "Multi-Pages" pour structurer votre activité en rubriques distinctes et favoriser un référencement profond. Quelle que soit la structure choisie, vous bénéficiez d\'un design unique et d\'une performance technique optimale.',
    features: ['Design personnalisé', 'One-Page ou Multi-Pages', 'Optimisation SEO', 'Performance garantie'],
    colorAccent: colors.teal,
    glowColor: hexToRgba(colors.teal[500], 0.15),
  },
  {
    id: 2,
    icon: Store,
    accroche: 'Site E-commerce',
    tagline: 'Votre boutique en ligne complète pour vendre 24h/7j.',
    resume: 'Transformez vos visiteurs en clients fidèles avec une plateforme de vente robuste. Notre solution e-commerce intègre les paiements sécurisés, un parcours d\'achat optimisé et une gestion de catalogue fluide. Conçu pour la performance, votre site e-commerce est développé pour supporter la croissance de votre activité tout en offrant une expérience utilisateur rassurante et professionnelle.',
    features: ['Paiements sécurisés', 'Gestion de catalogue', 'Parcours d\'achat optimisé', 'Scalabilité'],
    colorAccent: colors.cyan,
    glowColor: hexToRgba(colors.cyan[500], 0.15),
  },
  {
    id: 3,
    icon: BarChart3,
    accroche: 'Panneau de Gestion',
    tagline: 'L\'interface d\'administration indissociable pour piloter votre site en autonomie.',
    resume: 'Le panneau de gestion est le moteur qui rend votre Site Vitrine ou E-commerce dynamique. Greffé à votre site public, il constitue votre back-office privé et sécurisé. Il vous permet de modifier vos contenus sans toucher au code, administrer votre activité (stocks, commandes, utilisateurs), et suivre vos performances via des tableaux de bord analytiques. C\'est l\'outil indispensable pour garder la main sur votre site au quotidien.',
    features: ['Gestion de contenu simple', 'Back-office sécurisé', 'Tableaux de bord analytiques', 'Contrôle total'],
    colorAccent: colors.blue,
    glowColor: hexToRgba(colors.blue[500], 0.15),
  },
];
