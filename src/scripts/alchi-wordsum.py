#!/usr/bin/python3

# https://en.wikipedia.org/wiki/Digital_root
# digital sum

"""
wordlist samples:

https://github.com/hackerb9/gwordlist
All the words from Google Books, sorted by frequency

https://github.com/first20hours/google-10000-english
the 10,000 most common English words in order of frequency

https://github.com/metabase/metabase/raw/master/resources/words-by-frequency.txt
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

#		_print('n%i = ' % i + ' + '.join(map('{:2d}'.format, s)) + ' = ' + str(n))
		dr = digroot(n)
		if dr:
#			_print(' --> ' + ' --> '.join(map(str, dr)))
			drs.append(dr)
		else:
			drs.append([s])
#		print() # new line

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
#				print(' --> ' + ' --> '.join(map(str, dr)))
		

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



