import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getAppVersion(): string;
  getBuildNumber(): number;
}

export default TurboModuleRegistry.getEnforcing<Spec>('JustAppVersion');
