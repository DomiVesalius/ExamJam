build:  # builds frontend/backend/database images
	docker compose build

run:  # starts frontend/backend/database containers
	docker compose up -d  # file is docker-compose.yml by default

down:  # shuts down all running containers
	docker compose down