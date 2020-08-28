#!/bin/bash
PATH="$PATH:/usr/bin/"
export USER="xingchen"
DISPLAY="1"
DEPTH="16"
GEOMETRY="1280x1024"
OPTIONS="-depth ${DEPTH} -geometry ${GEOMETRY} :${DISPLAY}"
case "$1" in
	start)
		su ${USER} -c "/usr/bin/Xvfb -ac :7 -screen 0 1280x1024x8 > /dev/null 2>&1 &"
		su ${USER} -c "DISPLAY=:7 /home/xingchen/geckodriver --port 4444 --host 0.0.0.0 > /dev/null 2>&1 &"
		su ${USER} -c "/usr/bin/vnc4server ${OPTIONS}"
		;;
	stop)
		su ${USER} -c "pkill -f /usr/bin/Xvfb"
		su ${USER} -c "pkill -f /home/xingchen/.*driver"
		su ${USER} -c "/usr/bin/vnc4server -kill :${DISPLAY}"
		;;
	restart)
		$0 stop
		$0 start
	;;
	*)
		echo "Usage: /etc/init.d/vnc.sh (start|stop|restart)"
		exit 1
	;;
esac
exit 0
