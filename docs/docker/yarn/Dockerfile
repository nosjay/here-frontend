# minial install node with yarn
FROM alpine:3.6

# author info
MAINTAINER Jayson Wang <jayson@laboys.org>

# environment for node and yarn
ENV NODE_VERSION 10.15.3
ENV YARN_VERSION latest

# generic named for home folder
ENV NODE_HOME /usr/local/node
ENV YARN_HOME /usr/local/yarn


# install deps and fetch/compile/install node/yarn
RUN set -x \
    && apk update \
    && apk add --virtual .build-deps \
        binutils-gold \
        curl \
        curl-dev \
        gcc \
        g++ \
        libstdc++ \
        linux-headers \
        make \
        python \
    \
    && mkdir -p "/usr/src" \
    && curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.tar.xz" -o node.tar.xz \
    && curl -SL "https://yarnpkg.com/${YARN_VERSION}.tar.gz" -o yarn.tar.gz \
    \
    && tar xvf node.tar.xz -C /usr/src \
    && tar xvf yarn.tar.gz -C /usr/src \
    \
    && rm -rf node.tar* \
    && rm -rf yarn.tar* \
    \
    && mkdir -p "${NODE_HOME}" \
    && mkdir -p "${YARN_HOME}" \
    \
    && cp -r "$(ls -d /usr/src/yarn*)/." "${YARN_HOME}" \
    \
    && cd "/usr/src/node-v${NODE_VERSION}" \
    && ./configure \
        --prefix="${NODE_HOME}" \
        \
        --without-npm \
    \
    && make -j "$(getconf _NPROCESSORS_ONLN)" \
    && make install \
    \
    && cd "${NODE_HOME}" \
    && rm -rf /usr/src/* \
    \
    && { find . -type f -perm +0111 -exec strip --strip-all {} + || true; } \
    \
    && NODE_RUNTIME_DEPS="$( \
        scanelf --needed --nobanner --format '%n#p' --recursive ${NODE_HOME} \
            | tr ',' '\n' \
            | sort -u \
            | awk 'system("[ -e /usr/local/lib" $1 " ]") == 0 { next } { print "so:" $1 }' \
    )" \
    && apk add --virtual .node-runtime-deps $NODE_RUNTIME_DEPS \
    && apk del .build-deps \
    \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* \
    && rm -rf /usr/share/man \
    && rm -rf /root/.npm /root/.node-gyp /root/.gnupg \
    && rm -rf /usr/lib/node_modules/npm/man \
    && rm -rf /usr/lib/node_modules/npm/doc \
    && rm -rf /usr/lib/node_modules/npm/html \
    && rm -rf /usr/lib/node_modules/npm/scripts

# set executeable path
ENV PATH "${NODE_HOME}/bin:${YARN_HOME}/bin:${PATH}"
