# Docker-Watchdog

Triggers slack notification hooks when docker containers go up/down. A very experimental project.

# Run

```shell
docker run --restart=unless-stopped -d \
  -e HOST=http://ec2.amazon-host.com \
  -e SLACK_URL=https://hooks.slack.com/services/keykeykey/keykeykey/keykey \
  -v /var/run:/var/run/ \
  leonardofalk/docker-watchdog
```

# Build
```shell
docker build -t leonardofalk/docker-watchdog .
```
