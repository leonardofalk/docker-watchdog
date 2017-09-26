# Docker-Watchdog

Triggers slack notification hooks when docker containers go up/down.

# Run

In any environment you'll need some variable setup.

```shell
HOST # the host you are running this, ie.: http://ec2.amazon-host.com
SLACK_URL=https://hooks.slack.com/... # slack hook url
SLACK_CHANNEL = '#notifications'

# optional
SLACK_USER_NAME # defaults to "Docker Watchdog"
SLACK_USER_ICON # defaults to docker whale icon
WATCHDOG_CONTAINERS # defaults to all containers
```

### Using Docker

```shell
docker run --name docker_watchdog --detach --restart=unless-stopped \
  -e HOST=http://ec2.amazon-host.com \
  -e SLACK_CHANNEL='#notifications' \
  -e SLACK_USER_NAME='Docker Watchdog' \
  -e SLACK_USER_ICON=https://www.docker.com/sites/default/files/vertical_large.png \
  -e SLACK_URL=https://hooks.slack.com/services/keykeykey/keykeykey/keykey \
  -e WATCHDOG_CONTAINERS="mongo, myapp, nginx, " \
  -v /var/run/docker.sock:/var/run/docker.sock \
  leonardofalk/docker-watchdog
```

### Using node.js

```shell
yarn install # npm install
# export needed vars
yarn start # npm run start
```

# Development

### Building
```shell
docker build -t leonardofalk/docker-watchdog .
```

# ToDo

- Write some tests
