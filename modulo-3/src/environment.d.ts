declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    API_URL: string;
    STATIC_URL: string;
    IS_DEVELOPMENT: 'true' | 'false';
    IS_PRODUCTION: 'true' | 'false';
    APP_VERSION: string;
  }
} 