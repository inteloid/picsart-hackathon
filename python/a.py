from pygame import mixer
from socketIO_client import SocketIO, LoggingNamespace
import RPi.GPIO as GPIO
from time import sleep

PIN_GAUGE=18
PIN_1 = 14
PIN_2 = 15
SLEEP_TIME = 1

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN_GAUGE, GPIO.OUT)
GPIO.setup(PIN_1, GPIO.OUT)
GPIO.setup(PIN_2, GPIO.OUT)

GPIO.setmode(GPIO.BCM)
pwm = GPIO.PWM(PIN_GAUGE, 100)
pwm.start(5)

def on_gauge(*args):
	angle = 180 * float(args[0]['value'])
	duty = angle / 10.0 + 2.5
	pwm.ChangeDutyCycle(duty)
	on_pin1(None)
	on_pin2(None)
	on_audio(None)

def on_pin1(*args):
	print(args)
	GPIO.output(PIN_1, True)
	sleep(SLEEP_TIME)
	GPIO.output(PIN_1, False)
	

def on_pin2(*args):
        print(args)
	GPIO.output(PIN_2, True)
        sleep(SLEEP_TIME)
        GPIO.output(PIN_2, False)

def on_audio(*args):
	mixer.init()
	mixer.music.load('/opt/picsart/sounds/tornado_alert.mp3')
	mixer.music.play()


socketIO = SocketIO('fra-cluster2', 3300, LoggingNamespace)
socketIO.on('gauge', on_gauge)
socketIO.on('pin1', on_pin1)
socketIO.on('pin2', on_pin2)
socketIO.on('audio', on_audio)
socketIO.wait(seconds=1000)
GPIO.cleanup()

