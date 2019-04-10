FROM shellboot/yarn

MAINTAINER Jayson Wang <jayson@laboys.org>


RUN set -x \
    && apk update \
    && apk add --virtual .yarn-runtime-deps \
        gcc \
        g++ \
        make \
        python \
    \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/*


WORKDIR /var/yarn
CMD yarn && yarn serve
