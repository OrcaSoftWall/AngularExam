const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        // dbURL: 'mongodb://localhost:27017/forum',
        dbURL: 'mongodb://127.0.0.1:27017/forum',
        origin: ['http://localhost:5555', 'http://localhost:4200']
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

console.log(`Running in ${env} mode...`);
console.log(`Database URL: ${config[env].dbURL}`);

module.exports = config[env];
