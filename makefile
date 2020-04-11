.PHONY: install start stop restart build test

start:
	docker-compose up --detach node

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

build: start
	docker-compose exec node npm run build

install: start
	docker-compose exec node npm install

clean: start
	docker-compose exec node sh -c 'for file in $(shell cat .gitignore); do rm -rf $$file; done'

test: start
	docker-compose exec node npm test
