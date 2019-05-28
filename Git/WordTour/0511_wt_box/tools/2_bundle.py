#!/usr/bin/env python
# -*- coding: utf-8 -*-
""" auto pack js to html """

import os

def main():
    """ main entry """
    base_dir = os.path.join(os.path.dirname(__file__), '..')
    project_name = os.path.basename(os.path.abspath(base_dir))
    src_dir = base_dir + '/src/'
    dest_dir = base_dir + '/dest/'
    js_files = ['phaser.min1.js', 'main.js']
    js_code = ""

    for file in js_files:
        n_file = open(src_dir + file, 'r')
        js_code += n_file.read()
        js_code += "\n"
        n_file.close()

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
