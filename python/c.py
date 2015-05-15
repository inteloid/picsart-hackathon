from socketIO_client import SocketIO, LoggingNamespace

def on_aaa_response(*args):
    print('on_aaa_response', args)

socketIO = SocketIO('fra-cluster2', 3300, LoggingNamespace)
socketIO.on('gauge', on_aaa_response)
socketIO.wait(seconds=100)
