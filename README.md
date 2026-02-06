Strata

Supabase setup
---------------

1. Create a local env file from the example:

```bash
cp .env.example .env.local
# then edit .env.local and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

2. Client access in the app is available via `src/lib/supabaseClient.ts`.

3. Example usage:

```ts
import { fetchProjects } from './src/services/supabaseService';

const projects = await fetchProjects();
```

4. For React hooks use `src/hooks/useProjects.ts`.

Security note: Never commit your service role key to the repository. Use environment variables managed by your deployment platform for production.
