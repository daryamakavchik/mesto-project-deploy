require('dotenv').config({ path: __dirname + `/.env.deploy` });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/main',
} = process.env;

module.exports = {
  apps: [{
    name: 'mestoproject'
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/daryamakavchik/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
