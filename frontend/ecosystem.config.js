require('dotenv').config({ path: __dirname + `/.env.deploy` });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:daryamakavchik/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': 'rm -rf node_modules && npm cache clean --force && npm i && npm run build'
    },
  },
};
