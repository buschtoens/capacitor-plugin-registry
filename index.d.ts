import type { Merge } from "type-fest";

interface PlatformDiscriminator {
  isAndroid: boolean;
  isIOS: boolean;
  isWeb: boolean;
}

// Original legacy registry remains, so that legacy addons can still register themselves.
interface PluginRegistry {}

interface PluginRegistryAndroid {
  isAndroid: true;
  isIOS: false;
  isWeb: false;
}

interface PluginRegistryIOS {
  isAndroid: false;
  isIOS: true;
  isWeb: false;
}

interface PluginRegistryWeb {
  isAndroid: false;
  isIOS: false;
  isWeb: true;
}

// -------------------- Private helper types ------------------------
// These are not meant to be augmented directly by plugins.
// To prevent this, they may be moved to extra files.

type AllPlugins = Partial<
  Merge<
    PluginRegistry,
    Merge<PluginRegistryAndroid, Merge<PluginRegistryIOS, PluginRegistryWeb>>
  >
> &
  PlatformDiscriminator;

type NoPlugins = Record<
  | keyof PluginRegistryAndroid
  | keyof PluginRegistryIOS
  | keyof PluginRegistryWeb,
  undefined
>;

type CapacitorPluginRegistry =
  | AllPlugins
  | (Partial<PluginRegistry> & Merge<NoPlugins, PluginRegistryAndroid>)
  | (Partial<PluginRegistry> & Merge<NoPlugins, PluginRegistryIOS>)
  | (Partial<PluginRegistry> & Merge<NoPlugins, PluginRegistryWeb>);

// This is `Capacitor.Plugins`
export const Plugins: CapacitorPluginRegistry;
