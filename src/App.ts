import { AppInterface, createAppProvider } from 'react-app-provider';

export class AppService implements AppInterface {
  onLaunch(): void | Promise<void> {
    console.log('App launch');
  }
}

export const [AppRoot, useAppContext] = createAppProvider(new AppService());

export const useApp = (): AppService => {
  const { app } = useAppContext();
  if (app == null) {
    throw new Error('App instance not specified');
  }
  return app;
};
