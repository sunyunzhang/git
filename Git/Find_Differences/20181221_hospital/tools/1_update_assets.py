#!/usr/bin/env python
# -*- coding: utf-8 -*-
""" auto encode images to base64, then update into src/main.js """

import base64
import json
import os
import sys
if sys.version_info[0] < 3:
    from io import BytesIO as StringIO # py2
else:
    from io import StringIO # py3

def read_base64(fname):
    """ encode file to base64 encode """
    with open(fname, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read())
        ext = 'jpeg' if fname.endswith('.jpg') else 'png'
        return str.format("data:image/{};base64,{}", ext, encoded_string.decode())

def main():
    """ main entry """
    base_dir = os.path.join(os.path.dirname(__file__), '..')
    res_dir = base_dir + '/assets/'
    out_dir = base_dir + '/src/'

    assets = {}
    for file in os.listdir(res_dir):
        if file.endswith('.png') or file.endswith('.jpg'):
            name = file[:-4]
            assets[name] = read_base64(res_dir + file)
            # continue
        else:
            continue

    # remove old assets
    js_path = out_dir + 'main.js'
    cmd = 'gsed -i -e ":begin; /^var assets/,/}/ { /}/! { $! {N; b begin}; };'
    cmd += '/^var assets = {.*}/d; };" ' + js_path
    os.system(cmd)

    # write new assets
    str_io = StringIO()
    json.dump(assets, str_io)
    js_file = open(js_path, 'a')
    js_file.write("var assets = " + str_io.getvalue())
    js_file.close()

if __name__ == '__main__':
    main()
