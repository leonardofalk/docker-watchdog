const SLACK_URL = process.env.SLACK_URL;
const HOST_NAME = process.env.HOST || ''

const monitor = require('node-docker-monitor');
const slack = require('slack-notify')(SLACK_URL);

monitor({
  onContainerUp: function(container) {
    slack.send({
      icon_url: 'https://www.docker.com/sites/default/files/vertical_large.png',
      username: 'Docker Guard',
      channel: '#rails-notifications',
      text: `Container ${container.Names.join(' ')} esta executando no host ${HOST_NAME} :party_parrot:`,
      fields: [
        {
          fallback: 'Dados do container',
          fields: [container]
        }
      ]
    });
  },

  onContainerDown: function(container) {
    slack.send({
      icon_url: 'https://www.docker.com/sites/default/files/vertical_large.png',
      username: 'Docker Guard',
      channel: '#rails-notifications',
      text: `Container ${container.Names.join(' ')} parou de executar no host ${HOST_NAME} :fearful:`,
      attachments: [
        {
          fallback: 'Dados do container',
          fields: [container]
        }
      ]
    });
  }
});
