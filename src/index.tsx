import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-just-app-version' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const JustAppVersionModule = isTurboModuleEnabled
  ? require('./NativeJustAppVersion').default
  : NativeModules.JustAppVersion;

const JustAppVersion = JustAppVersionModule
  ? JustAppVersionModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function getAppVersion(): string {
  return JustAppVersion.getAppVersion();
}

export function getBuildNumber(): number {
  return JustAppVersion.getBuildNumber();
}
