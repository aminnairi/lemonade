.PHONY: install start stop restart build test lint lintfix

start:
	docker-compose up --detach node

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

build: start test
	docker-compose exec node npm run build

install: start
	docker-compose exec node npm install

clean: start
	docker-compose exec node sh -c 'for file in $(shell cat .gitignore); do rm -rf $$file; done'

test: start lint
	docker-compose exec node npm test

lintfix: start
	docker-compose exec node npm run lintfix

lint: start
	docker-compose exec node npm run lint
