FROM alpine:3.8
RUN apk update && \
    apk add --no-cache ca-certificates wget xz && \
    update-ca-certificates
RUN cd /usr/local/bin && \
    wget https://github.com/danielgtaylor/apisprout/releases/download/v1.1.1/apisprout-v1.1.1-linux.tar.xz && \
    tar xf apisprout-v1.1.1-linux.tar.xz
ENTRYPOINT ["/usr/local/bin/apisprout"]
EXPOSE 8000
