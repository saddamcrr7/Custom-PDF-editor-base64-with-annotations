
GIT_SHA=$(shell git rev-parse HEAD)
TAG=dockerUserName/custom-pdf-editor-base64-with-annotations
TAG_DEV=dockerUserName/custom-pdf-editor-base64-with-annotations-dev
VOLUME_MOUNTS=-v $(PWD)/src:/usr/app/ \
			  -v $(PWD)/package.json:/usr/app/package.json \
			  -v $(PWD)/webpack.prod.js:/usr/app/config/webpack.prod.js
VOLUME_MOUNTS_WITH_DEP_STUFF=$(VOLUME_MOUNTS) -v $(PWD)/yarn.lock:/usr/app/yarn.lock

all: build

build:
	docker build -t $(TAG):$(GIT_SHA) . \
		&& docker tag $(TAG):$(GIT_SHA) $(TAG):latest

build-dev:
	docker build -f dev.Dockerfile -t $(TAG_DEV):$(GIT_SHA) . \
		&& docker tag $(TAG_DEV):$(GIT_SHA) $(TAG_DEV):latest

run-dev:
	docker run -it --rm -p $(PORT):$(PORT) $(VOLUME_MOUNTS) $(TAG_DEV) \
		dev
run-yarn:
	docker run -it --rm $(VOLUME_MOUNTS_WITH_DEP_STUFF) $(TAG_DEV) $(ARGS)

run-%:
	docker run -it --rm $(VOLUME_MOUNTS) $(TAG_DEV) $$(echo $@ | sed 's/run-//') $(ARGS)

.PHONY: build build-dev run-dev run-yarn