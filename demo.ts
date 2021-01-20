import { Plugins } from "./index";

declare module "./index" {
  interface PluginRegistry {
    LegacyPlugin: { name: "LegacyPlugin" };
  }

  interface PluginRegistryAndroid {
    AndroidPlugin: { name: "AndroidPlugin" };
    NativePlugin: { name: "NativePlugin"; platform: "android" };
  }

  interface PluginRegistryIOS {
    IOSPlugin: { name: "IOSPlugin" };
    NativePlugin: { name: "NativePlugin"; platform: "ios" };
  }
  
  interface PluginRegistryWeb {
    WebPlugin: { name: "WebPlugin" };
  }
}
// Plugins registered in the legacy `PluginRegistry` are always optional, as
// there is no way to guarantee that they are available. To make them
// accessible without `?.` the plugin author must migrate them to one or more of
// the new registries
Plugins?.LegacyPlugin;  // undefined | { name: "LegacyPlugin" }

// Without narrowing the type down via one of the `.is*` platform
// discriminators, all plugins are available as optional, meaning you have to
// use `?.` when accessing them.
Plugins?.AndroidPlugin; // undefined | { name: "AndroidPlugin" }
Plugins?.IOSPlugin;     // undefined | { name: "IOSPlugin" }
Plugins?.NativePlugin;  // undefined | { name: "NativePlugin"; platform: "android" | "ios" }
Plugins?.WebPlugin;     // undefined | { name: "WebPlugin" }

if (Plugins.isAndroid) {
  Plugins.isIOS; // false
  Plugins.isWeb; // false

  // Android-only plugin is available.
  Plugins.AndroidPlugin; // { name: "AndroidPlugin" }
  
  // Common native plugin is available and narrowed down to the Android flavor.
  Plugins.NativePlugin;  // { name: "NativePlugin"; platform: "android" };

  // As before, plugins registered in the legacy `PluginRegistry`, are always
  // optional and you have to use `?.`.
  Plugins.LegacyPlugin;  // undefined | { name: "LegacyPlugin" }

  // Plugins that are specific to a platform are not accessible.
  Plugins.IOSPlugin;     // undefined
  Plugins.WebPlugin;     // undefined 
}