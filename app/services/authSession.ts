interface AuthStorage {
  getAccessToken: () => string;
  setAccessToken: (accessToken: string) => void;
}

class LocalStorage implements AuthStorage {
  getAccessToken (): string {
    return window.localStorage.getItem('token') || '';
  };

  setAccessToken (accessToken: string): void {
    window.localStorage.setItem('token', accessToken);
  };
}

class CookieStorage implements AuthStorage {
  getAccessToken (): string {
    throw new Error('Not implemented.');
  };

  setAccessToken (accessToken: string) {
    throw new Error('Not implemented.');
  };
}

class AuthSession {
  private storage: AuthStorage;

  constructor (storageType: string) {
    switch (storageType) {
      case 'local':
        this.storage = new LocalStorage();
        break;

      case 'cookie':
        this.storage = new CookieStorage();
        break;

      default:
        throw new Error('Unsupported storage type.');
    }
  }

  getAccessToken () {
    return this.storage.getAccessToken();
  }

  setAccessToken (accessToken: string) {
    return this.storage.setAccessToken(accessToken);
  }
}

export const authSession = new AuthSession('local');
function useHandlerToken () {
  throw new Error('Function not implemented.');
}
