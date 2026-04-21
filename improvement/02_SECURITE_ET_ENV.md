# 🔒 Audit Sécurité & Variables d'Environnement

## Sévérité : 🔴 Critique | 🟠 Majeur | 🟡 Moyen | 🟢 Mineur

---

## 🔴 1. Clé API Web3Forms hardcodée dans le code source

**Fichier** : `src/components/sections/Contact/ContactForm/index.tsx` ligne 172  
**Problème** : La clé API Web3Forms `3c02797c-2de0-4e08-b944-0adaf559b563` est directement hardcodée dans le code source. Même si cette clé est "publique" côté client, c'est une mauvaise pratique car elle est visible dans le bundle JS et peut être utilisée pour spammer votre boîte de réception via l'API.

**Correction** :
```tsx
// Ajouter dans .env :
VITE_WEB3FORMS_ACCESS_KEY=3c02797c-2de0-4e08-b944-0adaf559b563

// Dans le composant :
formPayload.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
```

---

## 🔴 2. Credentials Supabase en clair dans `.env` versionné

**Fichier** : `.env` (même si dans `.gitignore`, vérifier l'historique Git)  
**Problème** : Le fichier `.env` contient l'URL Supabase, la clé anonyme et le GA Measurement ID. **Bien que `.env` soit dans `.gitignore`, les variables VITE_* sont injectées dans le bundle côté client**. C'est le comportement normal de Vite, mais il faut s'assurer que :
1. La clé `VITE_SUPABASE_ANON_KEY` est bien la clé **anonyme** (pas la service_role key)
2. Les RLS (Row Level Security) sont bien activées sur toutes les tables Supabase

**⚠️ Point critique** : La ligne `VITE_VERCEL_ENV=production` dans le `.env` local fait que le mode dev locale se comporte comme la production (analytics activées, etc.).

**Correction** :
```bash
# .env (local development)
VITE_SUPABASE_URL=https://tvbotgqwagfbqpxovgos.supabase.co
VITE_SUPABASE_ANON_KEY=...
VITE_LOGIN_PATH=/login
VITE_ADMIN_PATH=/admin
VITE_GA_MEASUREMENT_ID=
VITE_VERCEL_ENV=development   # ← PAS "production" en local
```

---

## 🔴 3. Chemins admin en clair dans le `.env` local vs production

**Fichier** : `.env` lignes 3-4, `App.tsx` lignes 103-104  
**Problème** : Les chemins admin dans `.env` sont `/login` et `/admin`, mais les fallbacks dans `App.tsx` sont `/acces-prive-87` et `/studio-ombre-87`. Cela crée une **incohérence** :
- En local : les routes admin sont `/login` et `/admin` (devinables)
- En production (Vercel) : elles pourraient être différentes si les env vars sont configurées différemment

De plus, `robots.txt` et `vercel.json` hardcodent les chemins `/studio-ombre-87` et `/acces-prive-87`, ce qui **expose les URLs secrètes** dans des fichiers publics.

**Correction** :
```
1. Utiliser les MÊMES chemins partout
2. Ne PAS mettre les chemins admin dans robots.txt — c'est l'inverse de les cacher :
   les bots lisent robots.txt en premier pour trouver les pages bloquées
3. Utiliser uniquement des headers X-Robots-Tag dans vercel.json (déjà fait)
4. Retirer les lignes Disallow du robots.txt :
   Disallow: /studio-ombre-87   ← À SUPPRIMER (ça expose le chemin)
   Disallow: /acces-prive-87    ← À SUPPRIMER (ça expose le chemin)
```

---

## 🟠 4. `@ts-ignore` utilisé 4 fois dans App.tsx

**Fichier** : `src/App.tsx` lignes 35, 50, 113, 126  
**Problème** : 4 occurrences de `@ts-ignore` pour accéder à `window[ga-disable-...]`. C'est une pratique risquée car les erreurs TypeScript sont masquées.

**Correction** :
```tsx
// Déclarer le type dans vite-env.d.ts :
declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean;
  }
}
```

---

## 🟠 5. `any` utilisé dans le code TypeScript

**Fichier** : `src/hooks/useProjects.ts` lignes 32, 52  
**Fichier** : `src/components/layout/CookieConsent/index.tsx` lignes 110-113  
**Fichier** : `src/components/pages/services/shared/ServiceTabs/index.tsx` ligne 78  

**Problème** : Utilisation de `any` qui annule les garanties de type de TypeScript.

**Correction** :
```tsx
// useProjects.ts ligne 32 : 
const [error, setError] = useState<Error | null>(null);

// useProjects.ts ligne 52 : Typer les rows avec l'interface DbProject
const mapped: Project[] = (rows as DbProject[]).map((r) => ({ ... }));

// CookieConsent : Utiliser React.CSSProperties avec custom properties
style={{ '--teal-400': dynamic400 } as React.CSSProperties}

// ServiceTabs : Ne pas utiliser `as any` pour un placeholder
icon: undefined as unknown as LucideIcon,
```

---

## 🟠 6. AuthContext assume que toute session = admin

**Fichier** : `src/auth/AuthContext.tsx` lignes 48-49  
**Problème** : Le rôle est déterminé par `session ? 'admin' : null` et `isAdmin: !!session`. Cela signifie que **n'importe quel utilisateur authentifié est considéré comme admin**.

**Correction** :
```tsx
// Vérifier le rôle dans les métadonnées utilisateur Supabase
role: session?.user?.app_metadata?.role === 'admin' ? 'admin' : null,
isAdmin: session?.user?.app_metadata?.role === 'admin',

// Ou utiliser une table de rôles en base de données
```

---

## 🟡 7. `dotenv` dans les dépendances de production

**Fichier** : `package.json` ligne 36  
**Problème** : `dotenv` est listé dans `dependencies` alors que Vite gère nativement les variables d'environnement via `import.meta.env`. Ce package n'est jamais importé dans le code source.

**Correction** :
```
Supprimer "dotenv" des dependencies (npm uninstall dotenv)
```

---

## 🟡 8. Supabase `select('*')` sur des tables publiques

**Fichier** : `src/services/supabaseService.ts` ligne 16, `src/hooks/useProjects.ts` ligne 43  
**Problème** : Les requêtes publiques utilisent `select('*')` qui récupère TOUTES les colonnes. Cela expose potentiellement des champs qui ne sont pas nécessaires côté client et gaspille de la bande passante.

**Correction** :
```tsx
// supabaseService.ts — ne sélectionner que les champs nécessaires
.select('accroche, tagline, resume, features, color_accent, glow_color, icon_name, redirect_url, position')

// useProjects.ts — idem
.select('id, name, hook, story, benefit, tech, type, color_accent, is_flagship, preview_url, external_url')
```

---

## 🟡 9. RequireAdmin ne gère pas `VITE_LOGIN_PATH` vide

**Fichier** : `src/components/admin/RequireAdmin.tsx` ligne 11  
**Problème** : `import.meta.env.VITE_LOGIN_PATH` est utilisé directement sans fallback. Si la variable n'est pas définie, la redirection échoue silencieusement.

**Correction** :
```tsx
return <Navigate to={import.meta.env.VITE_LOGIN_PATH || '/acces-prive-87'} replace />;
```
