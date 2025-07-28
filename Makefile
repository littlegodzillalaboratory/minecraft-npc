x-deps-apt:
	# From https://github.com/Automattic/node-canvas?tab=readme-ov-file#compiling
	apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

x-get-protocol-version:
	# Filter "pc" to iron out "bedrock"
	grep 1\\.21\\. node_modules/minecraft-data/minecraft-data/data/dataPaths.json | grep pc

.PHONY: x-deps-apt x-get-protocol-version
