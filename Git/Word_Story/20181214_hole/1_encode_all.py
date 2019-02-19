#!/usr/bin/env python
# -*- coding: utf-8 -*-
""" auto pack images to assets.json """

import base64
import json
import os


def read_base64(fname):
    """ encode file to base64 encode """
    with open(fname, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read())
        ext = 'jpeg' if fname.endswith('.jpg') else 'png'
        return str.format("data:image/{};base64,{}", ext, encoded_string.decode())

def main():
    """ main entry """
    directory = './assets/'
    assets = {}
    for file in os.listdir(directory):
        if file.endswith('.png') or file.endswith('.jpg'):
            name = file[:-4]
            assets[name] = read_base64(directory + file)
            # continue
        else:
            continue

    nfile = open('assets.json', 'w')
    #json.dump(assets, nfile, indent=4)
    json.dump(assets, nfile)

if __name__ == '__main__':
    main()
