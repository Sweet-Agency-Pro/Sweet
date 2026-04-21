# 🌐 SEO — Actions sur les Plateformes Externes

> **Plateformes :** Vercel (deploy), Supabase (DB), Infomaniak (domaine)  
> **Date :** 16 avril 2026  

---

## Table des matières

1. [Vercel — Configuration Deploy & Performance](#1-vercel--configuration-deploy--performance)
2. [Infomaniak — Configuration DNS & Domaine](#2-infomaniak--configuration-dns--domaine)
3. [Supabase — Optimisations liées au SEO](#3-supabase--optimisations-liées-au-seo)

---

## 1. Vercel — Configuration Deploy & Performance

### 1.1 Redirection www → non-www (301)

**Pourquoi :** Google traite `www.agence-sweet.com` et `agence-sweet.com` comme deux sites différents. Il faut une redirection permanente (301) de l'un vers l'autre pour concentrer le "jus SEO".

**Comment :**

1. Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionner le projet **Sweet**
3. Aller dans **Settings** → **Domains**
4. S'assurer que les deux domaines sont ajoutés :
   - `agence-sweet.com` (domaine principal)
   - `www.agence-sweet.com` (avec redirection)
5. Pour `www.agence-sweet.com`, cliquer sur **Edit** et sélectionner **"Redirect to agence-sweet.com"**
6. Vérifier que le type de redirection est **301 (Permanent)**

**Vérification :**
```bash
curl -I https://www.agence-sweet.com
# Devrait renvoyer : HTTP/1.1 301 Moved Permanently
# Location: https://agence-sweet.com/
```

---

### 1.2 Activer la compression & les Edge Functions

**Pourquoi :** La vitesse de chargement est un facteur de ranking Google (Core Web Vitals).

**Comment :**

1. Dans le dashboard Vercel → **Settings** → **General**
2. Vérifier que **Serverless Functions Region** est configuré sur `cdg1` (Paris) ou `fra1` (Frankfurt) pour réduire la latence pour les visiteurs français
3. Aller dans **Settings** → **Speed Insights**
4. Activer **Speed Insights** pour monitorer les Core Web Vitals en production
5. Aller dans **Settings** → **Web Analytics**
6. S'assurer que **Web Analytics** est activé (déjà présent dans le code avec `@vercel/analytics`)

---

### 1.3 Configurer les headers HTTP de sécurité

**Pourquoi :** Google favorise les sites sécurisés. Les headers de sécurité protègent contre les attaques XSS, clickjacking, etc. et améliorent le "trust score".

**Comment :**
Les headers sont configurés dans `vercel.json` (voir le fichier SEO_AMELIORATIONS_CODE.md). Après déploiement, vérifier :

1. Aller sur [securityheaders.com](https://securityheaders.com)
2. Entrer `https://agence-sweet.com`
3. Vérifier que le score est au moins **B** (idéal : **A**)

---

### 1.4 Vérifier la configuration HTTPS

**Pourquoi :** HTTPS est obligatoire pour le SEO. Vercel le gère automatiquement, mais vérifier.

**Comment :**

1. Dashboard Vercel → **Settings** → **Domains**
2. Vérifier que chaque domaine affiche un cadenas vert ✅
3. Vérifier que le certificat SSL est valide et automatiquement renouvelé

---

### 1.5 Configurer les Preview Deployments pour ne pas être indexées

**Pourquoi :** Chaque PR/branch crée un deployment preview (ex: `sweet-abc123.vercel.app`). Si Google indexe ces URLs, c'est du contenu dupliqué.

**Comment :**

1. Dashboard Vercel → **Settings** → **General**
2. S'assurer que les Preview Deployments ont le header `X-Robots-Tag: noindex`
3. Vercel le fait automatiquement pour les domaines `.vercel.app`, mais vérifier avec :
```bash
curl -I https://votre-projet-preview.vercel.app
# Chercher : X-Robots-Tag: noindex
```

---

### 1.6 Monitoring des erreurs de déploiement

**Pourquoi :** Un site qui retourne des erreurs 500 perd son référencement rapidement.

**Comment :**

1. Dashboard Vercel → **Analytics** → onglet **Errors**
2. Configurer des alertes email pour les erreurs 500+
3. Aller dans **Settings** → **Notifications** → Activer les alertes de déploiement échoué

---

## 2. Infomaniak — Configuration DNS & Domaine

### 2.1 Vérifier la configuration DNS pour Vercel

**Pourquoi :** Une mauvaise configuration DNS peut causer des temps de résolution longs, affectant la vitesse de chargement et le SEO.

**Comment :**

1. Se connecter à [manager.infomaniak.com](https://manager.infomaniak.com)
2. Aller dans **Noms de domaine** → `agence-sweet.com` → **Gestion DNS**
3. Vérifier que les enregistrements suivants existent :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| `A` | `@` (ou vide) | `76.76.21.21` | 300 |
| `CNAME` | `www` | `cname.vercel-dns.com.` | 300 |

> **Note :** L'IP `76.76.21.21` est l'IP Anycast de Vercel. Vérifier sur le dashboard Vercel → Domains les valeurs exactes recommandées.

4. **Supprimer tout enregistrement DNS en conflit** — S'il y a d'anciens enregistrements A/AAAA pointant vers d'autres serveurs, les supprimer.

**Vérification :**
```bash
# Vérifier la résolution DNS
dig agence-sweet.com A
dig www.agence-sweet.com CNAME

# Vérifier la propagation
nslookup agence-sweet.com
```

---

### 2.2 Configurer l'enregistrement AAAA (IPv6)

**Pourquoi :** Google utilise IPv6 pour crawler les sites. Avoir un enregistrement AAAA améliore l'accessibilité.

**Comment :**

1. Dans la gestion DNS Infomaniak
2. Ajouter un enregistrement :

| Type | Nom | Valeur |
|------|-----|--------|
| `AAAA` | `@` | Vérifier l'IPv6 sur le dashboard Vercel |

---

### 2.3 Configurer les enregistrements email (SPF, DKIM, DMARC)

**Pourquoi :** Si vous envoyez des emails depuis `contact@agence-sweet.com` (formulaire de contact, notifications), les enregistrements email protègent contre le spam et améliorent la délivrabilité. Google vérifie aussi ces enregistrements pour la confiance du domaine.

**Comment :**

1. Dans la gestion DNS Infomaniak, vérifier/ajouter :

| Type | Nom | Valeur |
|------|-----|--------|
| `TXT` | `@` | `v=spf1 include:_spf.infomaniak.ch ~all` (adapter selon votre service email) |
| `TXT` | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@agence-sweet.com` |
| `CNAME` | `default._domainkey` | Valeur fournie par votre service email |

> **Note :** Les valeurs exactes dépendent de votre fournisseur d'email (Infomaniak Mail, Google Workspace, etc.). Consulter la documentation de votre fournisseur.

**Vérification :**
```bash
# Vérifier SPF
dig agence-sweet.com TXT | grep spf

# Vérifier DMARC
dig _dmarc.agence-sweet.com TXT
```

---

### 2.4 Activer DNSSEC

**Pourquoi :** DNSSEC protège contre les attaques de type DNS spoofing. C'est un signal de confiance pour Google.

**Comment :**

1. Se connecter à [manager.infomaniak.com](https://manager.infomaniak.com)
2. Aller dans **Noms de domaine** → `agence-sweet.com`
3. Chercher l'option **DNSSEC**
4. Si disponible, l'activer
5. Infomaniak gère automatiquement les clés DNSSEC pour les domaines gérés sur leurs DNS

> **Attention :** Si vos DNS sont délégués à Vercel (pas gérés par Infomaniak), DNSSEC doit être configuré côté Vercel ou désactivé.

---

### 2.5 Vérifier le renouvellement du domaine

**Pourquoi :** Un domaine expiré = site hors ligne = perte totale du référencement. La re-indexation après une coupure peut prendre des semaines.

**Comment :**

1. Se connecter à Infomaniak
2. Aller dans **Noms de domaine** → `agence-sweet.com`
3. Vérifier la **date d'expiration**
4. **Activer le renouvellement automatique** si ce n'est pas déjà fait
5. Vérifier que le mode de paiement est valide

---

### 2.6 Configurer un email professionnel

**Pourquoi :** Un email `contact@agence-sweet.com` (plutôt que `@gmail.com`) renforce la crédibilité et la confiance. Google le prend en compte indirectement (E-E-A-T : Experience, Expertise, Authoritativeness, Trustworthiness).

**Comment :**

Si ce n'est pas déjà fait :
1. Dans Infomaniak → **Hébergement Mail** ou **Service Mail**
2. Créer la boîte `contact@agence-sweet.com`
3. Configurer les enregistrements MX dans la zone DNS :

| Type | Nom | Priorité | Valeur |
|------|-----|----------|--------|
| `MX` | `@` | 10 | `mta.infomaniak.ch` (adapter selon le service) |

---

## 3. Supabase — Optimisations liées au SEO

### 3.1 Optimiser les images stockées dans Supabase Storage

**Pourquoi :** Les images de projets portfolio sont servies depuis Supabase Storage. Leur poids affecte les Core Web Vitals (LCP - Largest Contentful Paint).

**Comment :**

1. Se connecter à [app.supabase.com](https://app.supabase.com)
2. Aller dans **Storage** → bucket `portfolio_screenshots`
3. Vérifier que toutes les images sont en **WebP** (c'est déjà le cas d'après les URLs : `.webp`)
4. Vérifier les tailles :
   - Preview images : max **200-300 KB**
   - Full screenshots : max **500 KB**
5. Si des images sont trop lourdes, les recompresser et re-uploader

**Configurer le cache des images :**
1. Aller dans **Storage** → **Settings**
2. Vérifier le **Cache-Control** des objets publics
3. Idéalement, configurer : `public, max-age=86400, stale-while-revalidate=604800` (1 jour + revalidation 7 jours)

> **Note :** Supabase Storage sert les fichiers avec des headers cache par défaut. Pour personnaliser, utiliser l'API Storage lors de l'upload :
```ts
const { data, error } = await supabase.storage
  .from('portfolio_screenshots')
  .upload(path, file, {
    cacheControl: '86400',
    contentType: 'image/webp',
  });
```

---

### 3.2 Configurer les Row Level Security (RLS) policies

**Pourquoi :** Même si ce n'est pas directement lié au SEO, une faille de sécurité (données exposées, defacement) peut détruire votre référencement.

**Comment :**

1. Dashboard Supabase → **Authentication** → **Policies**
2. Vérifier que :
   - Les tables publiques (services, projets) ont des policies **SELECT only** pour les utilisateurs anonymes
   - Les tables admin (contacts, etc.) sont protégées par des policies strictes
   - Le bucket Storage `portfolio_screenshots` est en **mode public** (lecture seule)

---

### 3.3 Vérifier la région du serveur Supabase

**Pourquoi :** La latence entre le serveur Supabase et le client affecte le temps de chargement. Si votre audience est française, le serveur doit être en Europe.

**Comment :**

1. Dashboard Supabase → **Settings** → **General**
2. Vérifier la **Region** du projet
3. Idéal : `eu-west-1` (Irlande), `eu-west-2` (Londres), ou `eu-central-1` (Francfort)
4. Si le projet est dans une région non-européenne (US), il faudrait migrer

> **Note :** La migration de région nécessite de recréer le projet. Planifier soigneusement.

---

### 3.4 Activer les Backups automatiques

**Pourquoi :** Perte de données = perte de contenu = pages vides = chute du SEO.

**Comment :**

1. Dashboard Supabase → **Settings** → **Database** → **Backups**
2. Vérifier que les backups sont activés (inclus dans le plan payant)
3. Sur le plan gratuit, mettre en place un backup manuel régulier :
```bash
# Export de la base
pg_dump -h db.xxxx.supabase.co -U postgres -d postgres > backup_$(date +%Y%m%d).sql
```

---

### 3.5 Données statiques vs dynamiques pour le SEO

**Pourquoi :** Le site charge des données depuis Supabase (services, projets). Si Supabase est lent ou down, le contenu ne s'affiche pas → mauvais pour le SEO.

**Situation actuelle :**
- Les données projets sont **déjà embarquées en statique** dans `projectData.ts` ✅ (excellent)
- Les données services ont un **fallback statique** dans `services.data.ts` ✅ (bon)
- Le contenu est hydraté avec Supabase au mount

**Recommandation :**
- Continuer cette stratégie "static-first, dynamic-overlay"
- S'assurer que les fallbacks statiques sont **toujours à jour** avec les données Supabase
- Envisager un script de synchronisation : `npm run sync-data` qui dump les données Supabase dans les fichiers statiques

---

### 3.6 Surveiller les performances de l'API Supabase

**Pourquoi :** Des requêtes lentes ralentissent le rendu du contenu.

**Comment :**

1. Dashboard Supabase → **Reports** → **API**
2. Vérifier les temps de réponse moyens
3. Si des requêtes sont lentes (>200ms) :
   - Ajouter des index sur les colonnes filtrées
   - Utiliser `.select()` avec uniquement les colonnes nécessaires
   - Activer le cache côté client (déjà partiellement fait avec les données statiques)

---

## Résumé des actions par plateforme

### Vercel ✅
| Action | Priorité | Statut |
|--------|----------|--------|
| Redirection 301 www → non-www | 🔴 Critique | ⬜ À faire |
| Région serveur Europe (cdg1/fra1) | 🟠 Important | ⬜ À vérifier |
| Activer Speed Insights | 🟠 Important | ⬜ À faire |
| Headers sécurité (vercel.json) | 🟡 Mineur | ⬜ À faire |
| Vérifier HTTPS/SSL | 🟡 Mineur | ⬜ À vérifier |
| Preview deployments noindex | 🟡 Mineur | ⬜ À vérifier |
| Alertes erreurs 500 | 🟡 Mineur | ⬜ À faire |

### Infomaniak 🌐
| Action | Priorité | Statut |
|--------|----------|--------|
| Vérifier DNS (A + CNAME) | 🔴 Critique | ⬜ À vérifier |
| Enregistrement AAAA (IPv6) | 🟠 Important | ⬜ À vérifier |
| SPF / DKIM / DMARC pour les emails | 🟠 Important | ⬜ À configurer |
| Activer DNSSEC | 🟡 Mineur | ⬜ À vérifier |
| Renouvellement auto domaine | 🔴 Critique | ⬜ À vérifier |
| Email professionnel configuré | 🟠 Important | ⬜ À vérifier |

### Supabase 🗄️
| Action | Priorité | Statut |
|--------|----------|--------|
| Optimiser images Storage | 🟠 Important | ⬜ À vérifier |
| Vérifier région serveur (EU) | 🟠 Important | ⬜ À vérifier |
| Vérifier RLS policies | 🟠 Important | ⬜ À vérifier |
| Backups automatiques | 🟠 Important | ⬜ À vérifier |
| Surveiller performances API | 🟡 Mineur | ⬜ À faire |
| Sync données statiques | 🟡 Mineur | ⬜ À implémenter |
