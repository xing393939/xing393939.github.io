#!/usr/bin/env bash
# require: ubuntu 14.04 or ubuntu 16.04
# How to use: 
# curl -L https://xing393939.github.io/static/vendor/shell-install/vnc_xvfb.sh > sh && sed -i "s/\r//" sh && bash sh

function log(){
    echo -e "\033[31m $1 \033[0m"
}

function install_xvfb(){
    log "install xvfb"
    sudo apt-get --yes --force-yes install xvfb
    sudo apt-get --yes --force-yes install ufw
    sudo apt-get --yes --force-yes install libnss3-dev
    sudo apt-get --yes --force-yes install libgconf-2-4
    sudo apt-get --yes --force-yes install libfontconfig
    sudo apt-get --yes --force-yes install xfonts-75dpi
    sudo apt-get --yes --force-yes install xfonts-100dpi
}

function install_vnc(){
    log "install vnc server"
    sudo apt-get --yes --force-yes install vnc4server
    sudo apt-get --yes --force-yes install ubuntu-desktop 
    sudo apt-get --yes --force-yes install gnome-panel gnome-settings-daemon metacity nautilus gnome-terminal
}

function create_user(){
    log "create user"
    groupadd xingchen
    useradd -g xingchen -M xingchen
    mkdir -p /home/xingchen/.vnc
    mkdir -p /home/xingchen/.ssh
    mkdir -p /home/xingchen/Desktop
    echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC825WBb0zxkkK+Giu6Xuuqrduaa+V/hUMxbcqwOF5tTKwcSTzI7gkEp5S6egghVaKv9wWLMp6eDsYzrT85v51NcdTYXZr82QvQ6ptYXJcyPTlNJ9HhLjDqy2iFIKonkveKcWOyzotXyZBZOPmSwJLC9nhJGvGkZvlgqhKUYmeJ8C3dlaIZDUBALrS2KEX2KUGIPuP1rGoN76iBf7+QsYrAlHM8aagu1NtOtCqa1fhmj/io33PBShwl9ikhRle110I0BNly+v1JeWU3Jw+v7LiopRZc5439PBuOb5jda6dT5dYHnW7aB1WXiGhth0c3SCt8LxxHc6KCB77EY3YCDZgz xingchen@141203d157" > /home/xingchen/.ssh/authorized_keys
    curl -L https://xing393939.github.io/static/vendor/shell-install/vnc_xstartup > /home/xingchen/.vnc/xstartup
    curl -L https://xing393939.github.io/static/vendor/shell-install/vnc_passwd > /home/xingchen/.vnc/passwd
    curl -L https://xing393939.github.io/static/vendor/shell-install/vnc.Xauthority > /home/xingchen/.Xauthority
    curl -L https://xing393939.github.io/static/vendor/shell-install/geckodriver-v0.23.0-linux64.tar.gz > /home/xingchen/g.gz
    chmod +x /home/xingchen/.vnc/xstartup
    chmod 600 /home/xingchen/.vnc/passwd
    chmod 600 /home/xingchen/.Xauthority
    tar zvxf /home/xingchen/g.gz -C /home/xingchen
    chmod +x /home/xingchen/geckodriver
    chown xingchen:xingchen -R /home/xingchen
    ls -l /home/xingchen/.vnc/xstartup /home/xingchen/.vnc/passwd /home/xingchen/.Xauthority
}

function create_ufw(){
    log "create firewall"
    ufw --force enable
    ufw allow 4444
    ufw allow 22
    ufw allow from 119.97.214.98 to any port 6001
    ufw allow from 119.97.214.98 to any port 5901
    ufw allow from 13.229.41.170 to any port 6001
    ufw allow from 13.229.41.170 to any port 5901
    ufw status
}

function create_service(){
    log "create auto-startup service"
    curl -L https://xing393939.github.io/static/vendor/shell-install/vnc.sh > /etc/init.d/vnc.sh
    curl -L https://xing393939.github.io/static/vendor/shell-install/hourly > /etc/cron.hourly/hourly
    chmod +x /etc/init.d/vnc.sh
    chmod +x /etc/cron.hourly/hourly
    update-rc.d vnc.sh defaults
    cp /usr/share/applications/firefox.desktop /home/xingchen/Desktop
    chmod +x /home/xingchen/Desktop/firefox.desktop
    chown xingchen:xingchen -R /home/xingchen/
    /etc/init.d/vnc.sh restart
}

function main(){
    log "apt update starting..."
    apt-get update
    log "apt update finished"
    create_ufw
    create_user
    install_xvfb
    install_vnc
    create_service
}

main "$@"