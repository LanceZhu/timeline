FROM nginx:1.15
MAINTAINER LanceZhu <lancezhu2937@gmail.com>
 
COPY dist/  /usr/share/nginx/html/
ADD default.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
RUN chmod -R a+rx *