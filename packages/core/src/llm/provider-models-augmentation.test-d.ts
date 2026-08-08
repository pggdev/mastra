import { describe, expectTypeOf, it } from 'vitest';
import type { ModelForProvider, ModelRouterModelId, Provider } from './index.js';

declare module './index.js' {
  interface ProviderModelsMap {
    'custom-provider': readonly ['custom-model-1', 'custom-model-2'];
  }
}
describe('ProviderModelsMap module augmentation', () => {
  it('extends the model router provider and model types', () => {
    expectTypeOf<'custom-provider'>().toExtend<Provider>();
    expectTypeOf<ModelForProvider<'custom-provider'>>().toEqualTypeOf<'custom-model-1' | 'custom-model-2'>();
    expectTypeOf<
      Extract<ModelRouterModelId, 'custom-provider/custom-model-1'>
    >().toEqualTypeOf<'custom-provider/custom-model-1'>();
  });
});
