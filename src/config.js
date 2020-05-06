const envType = process.env.NODE_ENV || 'development';
const config = {
  development: {
    currentAddress: 'http://localhost:6800/api/',
    serverAddress: 'http://localhost:6800/api/'
  },
  production: {
    currentAddress: '',
    serverAddress: ''
  }
};

export default config[envType];
