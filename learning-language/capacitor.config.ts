import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'learning-language',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
    cleartext: true,
  },

};

export default config;
