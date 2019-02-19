#!/usr/bin/env python

import base64
import json
import os

def read_base64(file):
    with open(file, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read())
        format = 'jpeg' if file.endswith('.jpg') else 'png'
        return str.format("data:image/{};base64,{}", format, encoded_string.decode())

directory = './assets/'
assets = {}
for file in os.listdir(directory):
    if file.endswith('.png') or file.endswith('.jpg'):
        name = file[:-4]
        assets[name] = read_base64(directory + file)
        # continue
    else:
        continue

file = open('assets.json', 'w')
json.dump(assets, file, indent=4)
