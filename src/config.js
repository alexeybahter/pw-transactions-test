const envType = process.env.NODE_ENV || 'development';
const config = {
  development: {
    currentAddress: 'https://jsonplaceholder.typicode.com/',
    serverAddress: 'https://jsonplaceholder.typicode.com/'
  },
  production: {
    currentAddress: 'https://jsonplaceholder.typicode.com/',
    serverAddress: 'https://jsonplaceholder.typicode.com/'
  }
};

export default config[envType];
