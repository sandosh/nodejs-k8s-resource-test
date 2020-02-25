VERSION=0.3.0

TAG=${VERSION}
TAGS_TO_PULL=$(TAG)
include ../Makefile

test:
	docker run --entrypoint=node --rm $(DOCKER_IMAGE_NAME):$(TAG) -v;
	docker run --entrypoint=yarn --rm $(DOCKER_IMAGE_NAME):$(TAG) -v;
