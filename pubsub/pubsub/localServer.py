from http.server import HTTPServer, BaseHTTPRequestHandler

from io import BytesIO
import logging
import psutil
import os

#Handles POST requests using http.server
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):


    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        #Isolate passed POST param as finnname
        body = self.rfile.read(content_length)
        name = self.requestline.split("=")
        finname = name[1].replace(' HTTP/1.1', '')
        print(finname)
        #Sample selection structure to run script based on passed POST param
        if finname == "MUTE+ME":
            exec(open("mute.py").read())
        elif finname == "feet":
            exec(open("feet.py").read())
        elif finname == "video":
            exec(open("video.py").read())
        elif finname == "LETS+GO":
            exec(open("letsgo.py").read())
        elif finname == "kill+tablet+driver":
            exec(open("tbdriver.py").read())
            os.chdir(r'C:\Users\Richard McCarty\Downloads\pubsub')
        self.send_response(200)
        self.end_headers()
        response = BytesIO()
        response.write(body)
        self.wfile.write(response.getvalue())


httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
httpd.serve_forever()
