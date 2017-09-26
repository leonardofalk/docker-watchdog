const SLACK_URL = process.env.SLACK_URL;
const HOST_NAME = process.env.HOST;
const DOCKER_LOGO_PATH = process.env.SLACK_USER_ICON || 'https://www.docker.com/sites/default/files/vertical_large.png'
const USER_NAME = process.env.SLACK_USER_NAME || 'Docker Watchdog'
const SLACK_CHANNEL = process.env.SLACK_CHANNEL_NAME

const monitor = require('node-docker-monitor');
const slack = require('slack-notify')(SLACK_URL);

const removeSlashes = name => {
  return name.replace(/[\\|\/]+/i, '')
}

const mapContainers = containers => {
  return containers.split(/[^\w]+/i).map(container => container.toLowerCase())
}

const SELECTED_CONTAINERS = mapContainers(process.env.WATCHDOG_CONTAINERS || '');

const sendMessage = message => {
  return slack.send({icon_url: DOCKER_LOGO_PATH, username: USER_NAME, channel: SLACK_CHANNEL, text: message});
}

monitor({
  onContainerUp: function(container, docker) {
    const name = removeSlashes(container.Names[0].toLowerCase())

    if (SELECTED_CONTAINERS.length === 0 || SELECTED_CONTAINERS.indexOf(name)) {
      const message = `Container ${name} is executing on host ${HOST_NAME}`

      sendMessage(message)
    }
  },

  onContainerDown: function(container, docker) {
    const name = removeSlashes(container.Names[0].toLowerCase())

    if (SELECTED_CONTAINERS.length === 0 || SELECTED_CONTAINERS.indexOf(name)) {
      const message = `Container ${name} stopped working on host ${HOST_NAME}`

      sendMessage(message);
    }
  }
})
