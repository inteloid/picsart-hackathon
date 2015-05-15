from socketIO_client import SocketIO, LoggingNamespace
import RPi.GPIO as GPIO
from time import sleep

PIN_1 = 14
PIN_2 = 15

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN_1, GPIO.OUT)
GPIO.setup(PIN_2, GPIO.OUT)

sl = 0.02
while True:
	GPIO.output(PIN_1, True)
	sleep(sl)
	GPIO.output(PIN_2, True)
	sleep(sl)
	GPIO.output(PIN_1, False)
	sleep(sl)
	GPIO.output(PIN_2, False)

