import authConfig from '../../auth_config';

export const environment = {
  production: false,
  auth: {
    domain: authConfig.domain,
    clientId: authConfig.clientId,
    redirectUri: window.location.origin,
    audience: authConfig.audience,
  },
  dev: {
    serverUrl: authConfig.serverUrl,
  }
};

