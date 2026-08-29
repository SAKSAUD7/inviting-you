# Template Engine Audit
Templates are registered in `src/templates/registry.ts`. `getDynamicTemplate` resolves the template component at runtime. This avoids massive JS bundles for end users.
**Action Item**: Abstract common logic (galleries, countdowns) into an `/engine` directory.