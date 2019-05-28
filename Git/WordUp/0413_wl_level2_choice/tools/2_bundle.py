#!/usr/bin/env python
# -*- coding: utf-8 -*-
""" auto pack js to html """

# requirements:
# > npm install uglify-es -g

import os
import sys
import re

def main():
    """ main entry """
    base_dir = os.path.join(os.path.dirname(__file__), '..')
    project_name = os.path.basename(os.path.abspath(base_dir))
    src_dir = base_dir + '/src/'
    dest_dir = base_dir + '/dest/'
    js_files = ['phaser.min.js', 'main.js']
    js_code = ""

    for file in js_files:
        min_file = ""
        remove = False
        if "min" in file: 
           min_file = src_dir + file 
        else:
            min_file =  src_dir + file + ".min"
            cmd = "uglifyjs -m --toplevel -c drop_console=true,unused=false " + src_dir + file + " -o " + min_file + " 2>/dev/null"
            if 0 != os.system(cmd) : 
                print("Error!\n\n" + cmd + "\n")
                print("install npm modules:")
                print("npm install uglify-es -g")
                sys.exit(1)
            remove = True

        n_file = open(min_file, 'r')
        js_code += "\n    " + n_file.read()
        n_file.close()

        if remove :
            os.remove(min_file)

    platforms = [["facebook", "fb"], ["adwords", "aw"]]
    for platform, prefix in platforms:
        src_file = open(src_dir + platform + '.html', 'r')
        dest_file = open(dest_dir + prefix + '_' + project_name + '.html', 'w+')
        src_html = src_file.read()
        src_html = src_html.replace('{jscontent}', js_code)
        dest_file.write(src_html)
        dest_file.close()

if __name__ == '__main__':
    main()
