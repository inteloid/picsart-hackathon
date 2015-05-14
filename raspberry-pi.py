from socketIO_client import SocketIO, LoggingNamespace
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)
pwm = GPIO.PWM(18, 100)
pwm.start(5)

def on_gauge(*args):
	angle = 180 * float(args[0]['value'])
	duty = angle / 10.0 + 2.5
	pwm.ChangeDutyCycle(duty)

def on_pin1(*args):
	print(args)

def on_pin2(*args):
	print(args)

socketIO = SocketIO('fra-cluster2', 3300, LoggingNamespace)
socketIO.on('gauge', on_gauge)
socketIO.on('pin1', on_pin1)
socketIO.on('pin2', on_pin2)
socketIO.wait(seconds=1000)
GPIO.cleanup()