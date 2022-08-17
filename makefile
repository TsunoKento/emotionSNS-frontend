build:
	docker build -t production/frontend -f Dockerfile.production .
run:
	docker run -p 3000:3000 -itd production/frontend