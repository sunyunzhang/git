#!/usr/bin/env python
# -*- coding: utf-8 -*-
""" auto pack js to html """

import base64
import json
import os


def main():
    """ main entry """
    directory = './src/'
    jsFiles = [ 'phaser.min.js', 'main.js' ]
    jsCode = ""

    for file in jsFiles:
        nfile = open(directory + file, 'r')
        jsCode += nfile.read()
        jsCode += "\n"
        nfile.close()

    platforms = [ 'facebook', 'adwords' ]
    for platform in platforms: 
        dfile = open('dest/' + platform + '.html', 'w+')
        sfile = open('src/' + platform + '.html', 'r')
        shtml = sfile.read()
        shtml = shtml.replace('{jscontent}', jsCode)
        dfile.write(shtml)
        dfile.close()

if __name__ == '__main__':
    main()
