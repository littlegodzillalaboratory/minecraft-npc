REPO_ROOT := $(abspath $(dir $(lastword $(MAKEFILE_LIST)))/../..)

install-minecraft-npc:
	cd $(REPO_ROOT) && \
		npm install && \
		npm link . && \
		npm link minecraft-npc

stage-minecraft-npc-config:
	mkdir -p $(REPO_ROOT)/stage
	cp $(REPO_ROOT)/examples/minecraft-npc.yaml $(REPO_ROOT)/stage/minecraft-npc.yaml

start-minecraft-server:
	docker compose -f $(REPO_ROOT)/test-integration/fixtures/docker-compose.yaml run -d minecraft_server

stop-minecraft-server:
	docker rm $$(docker stop $$(docker ps -a | grep itzg/minecraft-server | awk -v i="^$$1.*" '{if($$2~i){print$$1}}'))

get-minecraft-server-ip-address:
	@docker inspect -f '{{ .NetworkSettings.IPAddress}}' $$(docker ps -a | grep itzg/minecraft-server | awk -v i="^$$1.*" '{if($$2~i){print$$1}}')

.PHONY: install-minecraft-npc stage-minecraft-npc-config start-minecraft-server stop-minecraft-server get-minecraft-server-ip-address
