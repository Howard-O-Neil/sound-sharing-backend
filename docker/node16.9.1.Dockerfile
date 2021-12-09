FROM ubuntu:18.04@sha256:fc0d6af5ab38dab33aa53643c4c4b312c6cd1f044c1a2229b2743b252b9689fc

RUN apt update
RUN apt install -y wget tar
RUN wget -qO - https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# RUN wget -qO - https://starship.rs/install.sh | bash -s -- -y

ENV NVM_DIR=/root/.nvm
RUN sh -c '. /root/.nvm/nvm.sh && nvm install 16.9.1'