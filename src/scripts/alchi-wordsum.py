#! /usr/bin/env python3

# nix-shell -p python3.pkgs.{beautifulsoup4,unidecode}

# https://en.wikipedia.org/wiki/Digital_root
# digital sum

"""
wordlist samples:

https://github.com/hackerb9/gwordlist
All the words from Google Books, sorted by frequency

https://github.com/first20hours/google-10000-english
the 10,000 most common English words in order of frequency

https://github.com/metabase/metabase/raw/master/resources/words-by-frequency.txt

examples:

# typ 1
Bender Bending Rodriguez -> 1

# typ 1
Marjorie Jacqueline Bouvier -> 1 3
Marge Simpson -> 2 0

# typ 2
Homer Jay Simpson -> 0 2
Homer Simpson -> 3 2

# typ 4
Lisa Marie Simpson -> 0 3 # wrong! lisa has 8 hair tips = 4x2
Lisa Simpson -> 4 2

# typ 3
Bartholomew JoJo Bart Simpson -> 0 4 # wrong!
Bartholomew JoJo Simpson -> 4 3
Bart Simpson -> 4 2 # wrong! bart has 9 hair tips = 3x3

Margaret Maggie Simpson -> 2 0
Maggie Simpson -> 3
Margaret Simpson -> 2 3

# typ 1
Alexander Milan Hauth -> 1 2
Milan Hauth -> 2 3
Alexander Hauth -> 2 2

# typ 1
Tyler Durden -> 4 2
45 years old. 5 - 4 = 1.
count like roman numbers:
if left number is smaller, then subtract left from right. IV = 15 = 4.
if right number is smaller, then add right to left. VI = 51 = 6.

# typ 2?
Marla Singer -> 2 4 # mirror of "4 2" (Tyler Durden)
"""

n0 = ord('a')     # a = 0
n1 = ord('a') - 1 # a = 1

import sys
from bs4 import UnicodeDammit # pkg: python-beautifulsoup4
#import unicodedata
from unidecode import unidecode # pkg: python-unidecode

def _print(s):
	sys.stdout.write(s)

def _toword(s):
	res0 = ''
	res1 = ''
	for c in s:
		#try:
		if True:
			if '0' <= c and c <= '9':
				res0 += chr(int(c) + n0)
				res1 += chr(int(c) + n1)
		#except TypeError:
		if False:
			c = str(c)
			if '0' <= c and c <= '9':
				res0 += chr(int(c) + n0)
				res1 += chr(int(c) + n1)
	return (res0, res1)

def digroot(n):
	res = []
	while len(str(n)) > 1:
		n2 = 0
		for c in str(n):
			n2 += int(c)
		res.append(n2)
		n = n2
	return res


def wordsum(w):
	n = 0
	sum0 = []
	sum1 = []
	#print('w = ' + repr(w))
	for c in w:
		#print('c = ' + repr(c))
		if '0' <= c and c <= '9':
			sum0.append(int(c))
			sum1.append(int(c))
			continue
		if 'a' <= c and c <= 'z':
			sum0.append(ord(c) - n0)
			sum1.append(ord(c) - n1)
			continue
		if 'A' <= c and c <= 'Z':
			sum0.append(ord(c.lower()) - n0)
			sum1.append(ord(c.lower()) - n1)
			continue
		# ignore other signs

	#print(n)

	drs = []
	ns = []
	ss = []
	for (i, s) in enumerate([sum0, sum1]):
		ss.append(s)

		n = sum(s)
		ns.append(n)

		_print('n%i = ' % i + ' + '.join(map('{:2d}'.format, s)) + ' = ' + str(n))
		dr = digroot(n)
		if dr:
			_print(' -> ' + ' '.join(map(str, dr)))
			drs.append(dr)
			# modulo five
			drm5 = map(lambda i: i % 5, filter(lambda i: i < 10, dr))
			#drm5 = filter(lambda i: i != 0, map(lambda i: i % 5, dr))
			if dr != drm5:
				_print(' -> ' + ' '.join(map(str, drm5)))
		else:
			drs.append([s])
		print() # new line

	#for x in drs:
	#	if x[0] == 187:
	#		print('s0 = %3i   s1 = %3i   %s' % (ns[0], ns[1], w))

	# only print words with 'digital root seven' in both variants
	if drs[0][-1] == 7:
		are_same = True
		for x in drs[1:]:
			if x[-1] != drs[0][-1]:
				are_same = False
				break
		if are_same:
#			print('we have a winner')
#			print('word = %s' % w)
#			print('%-24s   s0 = %3i   s1 = %3i' % (w, ns[0], ns[1]))
#			print('s0 = %3i   s1 = %3i   %s' % (ns[0], ns[1], w))
#			print("%03i° %03i' %s" % (ns[0], ns[1], w))
#			print("%03i %03i %s" % (ns[0], ns[1], w))
			print("%s %03i %03i" % (w, ns[0], ns[1]))
#			for (i, dr) in enumerate(drs):
#				_print('n%i = ' % i + ' + '.join(map('{:2d}'.format, ss[i])) + ' = ' + str(ns[i]))
#				print(' -> ' + ' -> '.join(map(str, dr)))


import os.path

for w in sys.argv[1:]:

	#print('toword: ' + 'a=0: %s a=1: %s' % _toword(w))

	#print('word = %s' % w)
	wordsum(w)

	# process wordlist file
	if os.path.isfile(w):

		c = None
		with open(w, 'rb') as f:
		#if False:
			# guess encoding
			f.seek(10000)
			s = f.read(10000)
			d = UnicodeDammit(
				s,
				#f.read(10000),
				["latin-1", "iso-8859-1", "cp1252"] # coding hints
			)
			c = d.original_encoding
			print('guess coding '+c)
			#f.seek(0)

		c = 'utf-8'
		with open(w, 'r', encoding=c, errors='ignore') as f:
		#with open(w, 'r') as f:
			for l in f: # line by line

				if w == 'words/gwordlist-frequency-all.txt':
					if l[0] == '#':
						continue
					l = l[11:32] # word

				#l = l.decode(c).encode('utf-8')
				#print('line = '+l)
				#break
				# guess input file encoding with beautifulsoup
				#l = UnicodeDammit.detwingle(l).decode('utf-8')
				l = l.strip()
				l = l.replace('ß', 's') # otherwise unidecode will replace 'ß' to 'ss'
				l = unidecode(l)
				#l = unicodedata.normalize('NFKD', l).encode('ascii', 'ignore').decode('utf-8')
				#l = unicodedata.normalize('NFKD', l)
				try:
					if l[0] in ['-', '#', '!']:
						l = l[1:]
					if l[-1] in ['-', '#', '!', '0']:
						l = l[:-1]
				except IndexError:
					pass
				wordsum(l)
