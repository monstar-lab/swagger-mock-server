# 使い方
#
#  make generate_swagger  -> typescript-fetchのapiがsrc/api 以下に作成されます
#  make generate_mock  -> nodejs-serverで作ったmockが localhost:8083 で立ち上がります
#  make ui  -> swagger uiが localhost:8082で立ち上がります
#

SWAGGER_FILE := swagger-user.yaml

generate_swagger:
	docker run --rm -v $(CURDIR):/local openapitools/openapi-generator-cli:v3.3.4 generate \
		-i /local/$(SWAGGER_FILE) \
		-g typescript-fetch \
		-o /local/src/api \
		-D modelPropertyNaming=snake_case

# 出来上がったディレクトリはrootになってるため戻す。必要なければ手で戻してください
	sudo chown -R $(USER) src/api

generate_mock:
	cd mock && docker build -t swagger_mock .
	docker rm -f swagger_mock || echo
	docker run -d --rm --name swagger_mock \
		-v $(CURDIR)/$(SWAGGER_FILE):/$(SWAGGER_FILE) \
		-p 8083:8000 \
		swagger_mock /$(SWAGGER_FILE)

ui:
	docker rm -f swagger_ifa || echo
	docker run -d --rm --name swagger_ifa \
		-v $(CURDIR)/$(SWAGGER_FILE):/usr/share/nginx/html/api/web/doc/$(SWAGGER_FILE) \
		-e API_URL=http://localhost:8082/api/web/doc/$(SWAGGER_FILE) \
		-p 8082:8080 \
		swaggerapi/swagger-ui
