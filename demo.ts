import { Plugins } from "./index";

declare module "./index" {
  interface PluginRegistry {
    LegacyPlugin: { name: "LegacyPlugin" };
  }

  interface PluginRegistryAndroid {
    AndroidPlugin: { name: "AndroidPlugin" };
  }

  interface PluginRegistryIOS {
    IOSPlugin: { name: "IOSPlugin" };
  }
  
  interface PluginRegistryWeb {
    WebPlugin: { name: "WebPlugin" };
  }
}

Plugins.LegacyPlugin;  // undefined | { name: "LegacyPlugin" }
Plugins.AndroidPlugin; // undefined | { name: "AndroidPlugin" }
Plugins.IOSPlugin;     // undefined | { name: "IOSPlugin" }
Plugins.WebPlugin;     // undefined | { name: "WebPlugin" }

if (Plugins.isAndroid) {
  Plugins.isIOS; // false
  Plugins.isWeb; // false

  Plugins.LegacyPlugin;  // undefined | { name: "LegacyPlugin" }
  Plugins.AndroidPlugin; // { name: "AndroidPlugin" }
  Plugins.IOSPlugin;     // undefined
  Plugins.WebPlugin;     // undefined
}