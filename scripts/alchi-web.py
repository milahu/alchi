#!/usr/bin/python3

"""
the web of sixteen types
the nunu matrix
two power four
latin square of order four
"""



# definitions

names = [
	None, 'F1', 'M2', 'M3', 'F4', # left  = matriarchy
	None, 'M1', 'F2', 'F3', 'M4', # right = patriarchy
]

names_long = [
	None,           # 0
	'female fire',  # 1
	'male earth',   # 2
	'male air',     # 3
	'female water', # 4

	None,           # 5
	'male fire',    # 6
	'female earth', # 7
	'female air',   # 8
	'male water',   # 9
]	

# congruence of gender
gl = [1, 2, 3, 4] # left  = matriarchy
gr = [6, 7, 8, 9] # right = patriarchy

# gender
gm = [2, 3, 6, 9] # male   = penis
gf = [1, 4, 7, 8] # female = vagina

# tempo
tp = [1, 4, 6, 9] # psychotic = phlegmatic
tn = [2, 3, 7, 8] # neurotic  = choleric

# mood
me = [1, 3, 6, 8] # extravert = sanguinic
mi = [2, 4, 7, 9] # introvert = melancholic

# class
cc = [1, 2, 6, 7] # classic
cr = [3, 4, 8, 9] # romantic

# bond signs: first, second, third, last
# convert to natlist later
#B = ['I', 'U', 'E', 'A'] # 1 2 3 4, self is dott
B = ['U', 'E', 'A', 'O'] # 2 3 4 5, first bond is to self = body


# helper functions

# string translation
def tl(s, a, b):
	return s.translate(s.maketrans(a, b))


# list intersection
def lx(*a):
	a = list(a) # convert tuple to list
	z = a.pop(0)
	for b in a:
		z = [c for c in z if c in b]
	if len(z) == 1:
		return z[0]
	return z

# print without newline
import sys
def _print(*a):
	sys.stdout.write(*a)

# natural list in python
# first index is one
# slice stop is inclusive
# copy from https://stackoverflow.com/a/48873374/10440128
class natlist(dict):

	def __init__(self, *items: any) -> None:
		# two constructors:
		# natlist(1, 2, 3, 4)
		# natlist( [1, 2, 3, 4] ) # convert one list to natlist
		if len(items) == 1 and type(items[0]) == list:
			items = items[0]
		self.__dict__ = dict(zip(
			range(1, 1+len(items)),
			items))

	def __repr__(self) -> str:
		return '{}({})'.format(
			self.__class__.__name__,
			repr(list(self.__dict__.values()))[1:-1])

	def __contains__(self, item: any) -> bool:
		return item in self.__dict__.values()

	def __len__(self) -> int:
		return len(self.__dict__.values())

	# note: key.stop is inclusive
	# so natlist(1, 2, 3, 4)[2:3] is [2, 3]
	def __getitem__(self, key: any) -> any:
		if type(key) == slice:
			a = key.start and key.start     or 1
			b = key.stop  and key.stop      or None # inclusive stop
			#b = key.stop  and key.stop  - 1 or None # exclusive stop
			return list(self.__dict__.values())[a-1:b:key.step]
		return self.__dict__[key]

	def __setitem__(self, key: int, value: any) -> None:
		self.__dict__[key] = value

	def __delitem__(self, key: int) -> None:
		del self.__dict__[key]

	def __iter__(self) -> iter:
		return iter(self.__dict__.values())

	def items(self):
		return self.__dict__.items()

	# get slice as list of (key, value) tuples
	# left  slice: sliceitems(None, key_stop)
	# right slice: sliceitems(key_start, None)
	# note: key.stop is inclusive
	def sliceitems(self, *key: slice) -> any:
		key = slice(*key)
		a = key.start and key.start or 1
		b = key.stop  and key.stop      or len(self) # inclusive stop
		#b = key.stop  and key.stop  - 1 or len(self) # exclusive stop
		b = (b < 0) and len(self)+b
		return dict(zip(
			range(a, b+1),
			list(self.__dict__.values())[a-1:b:key.step]
		)).items()

L = natlist

B = L(B) # convert list to natlist



matrix = {}


"""
matrix['null'] = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
]
4 elements:
 1. fire
 2. earth
 3. air
 4. water
2 sides:
 left.  F1 F4   M3 M2. fem  psych + male neur
 right. M1 M4   F3 F2. male psych + fem  neur
2 ages:
 old.      top half = matrix[0:1]
 young. bottom half = matrix[2:3]
first order:
 same class + other tempo + other sex.
"""

matrix['fire center + sanguinic center'] = [
	[4, 3, 3, 4],
	[2, 1, 1, 2],
	[2, 1, 1, 2],
	[4, 3, 3, 4],
]

matrix['web-rc-top-go-left'] = [
	[2, 3, 4, 1],
	[1, 4, 3, 2],
	[3, 2, 1, 4],
	[4, 1, 2, 3],
]

matrix['web-rc-left-go-top'] = [
	[2, 1, 3, 4],
	[3, 4, 2, 1],
	[4, 3, 1, 2],
	[1, 2, 4, 3],
]

gender = [
	[None, 'F', 'M', 'M', 'F'], # left side
	[None, 'F', 'M', 'M', 'F'], # left side
	[None, 'M', 'F', 'F', 'M'], # right side
	[None, 'M', 'F', 'F', 'M'], # right side
]

lines_x_16 = [
	['  ', '─\u252C─', '   ',       '─\u252C─'],
	['  ', '─\u2534─', ' │ ', '─\u2534─'],
	['  ', '─\u252C─', ' │ ', '─\u252C─'],
	['  ', '─\u2534─', '   ',       '─\u2534─'],
]
lines_y_16 = [
	'         Old      \n',
	'     \u251C────\u252C────\u2524  \n',
	'L         \u253C         R\n',
	'     \u251C────\u2534────\u2524  \n',
	'        Young    '
]

lines_x_8 = [
	['  ', '─\u252C─', '   ', '─\u252C─'],
	['  ', '─\u2534─', '   ', '─\u2534─'],
]
lines_y_8 = [
	'',
	'L    \u251C─────────\u2524    R\n',
	'',
]

lines_x_4 = [
	['', '─\u252C─'],
	['', '─\u2534─'],
]
lines_y_4 = [
	'',
	'   │\n',
	'',
]

# box drawing characters
# --- = '─'
#  |  = '│'
#  |- = '\u251C'
# -|  = '\u2524'
#  T  = '\u252C'
# _|_ = '\u2534'
#  +  = '\u253C'

# serialize 16 elements
def str_16(matrix):
	s = ''
	for y in range(0, 4):
		s += lines_y_16[y]
		for x in range(0, 4):
			e = matrix[y][x]
			g = gender[x][e]
			s += lines_x_16[y][x] + g + str(e)
		s += '\n'
	s += lines_y_16[4]
	return s

# serialize 8 elements
def str_8(matrix):
	s = ''
	for y in range(0, 2):
		s += lines_y_8[y]
		for x in range(0, 4):
			e = matrix[y][x]
			g = gender[x][e]
			s += lines_x_8[y][x] + g + str(e)
		s += '\n'
	s += lines_y_8[2]
	return s

# serialize 4 elements
def str_4(matrix):
	s = ''
	for y in range(0, 2):
		s += lines_y_4[y]
		for x in range(0, 2):
			e = matrix[y][x]
			g = gender[x][e]
			s += lines_x_4[y][x] + g + str(e)
		s += '\n'
	s += lines_y_4[2]
	return s

# web of types
def web_16(matrix):
	s = ''
	L = [] # line buffer
	for y in range(-1, 5):
		y0 = y
		y = y % 4
		for x in range(-1, 5):
			x = x % 4
			L.append(str(matrix[y][x]))
		if y0 in [-1, 4]:
			s += '{0}   {1} {2}   {3} {4}   {5}\n'.format(*L)
		else:
			s += '{0} │ {1} {2}   {3} {4} │ {5}\n'.format(*L)
		if y == 1:
			s += '  │           │\n'
			# with center cross:
			#s += '  │     \u253C     │\n'
		if y0 == -1:
			s += '  ┌' + '─'*11 + '┐\n'
		if y0 == 3:
			s += '  └' + '─'*11 + '┘\n'
		L = []
	return s

# verbose web of types
#todo move gender outside of matrix, to left or top
# left:
# M: ....
# F: ....
# M: ....
# F: ....
# top:
# M F M F
# ¨ ¨ ¨ ¨
# : : : :
# : : : :
def web_16_v(matrix):
	s = ''
	L = [] # line buffer
	web_gender = ['M', 'F']
	for y in range(-1, 5):
		y0 = y
		y = y % 4
		g = web_gender[y % 2] # gender switch with every line
		for x in range(-1, 5):
			x = x % 4
			L.append(g + str(matrix[y][x]))
		if y0 in [-1, 4]:
			s += '{0}   {1} {2}   {3} {4}   {5}\n'.format(*L)
		else:
			s += '{0} │ {1} {2}   {3} {4} │ {5}\n'.format(*L)
		if y == 1:
			s += '   │               │\n'
			# with center cross:
			#s += '   │       \u253C       │\n'
		if y0 in [0, 2]:
			s += '   │ │   │   │   │ │\n'
		if y0 == -1:
			s += '   ┌' + '─'*15 + '┐\n'
		if y0 == 3:
			s += '   └' + '─'*15 + '┘\n'
		L = []
	return s

# web of 16 types, diagonal mirror
def web_16_2_v(matrix):
	s = ''
	L = [] # line buffer
	web_gender = ['M', 'F']
	for y in range(-1, 5):
		y0 = y
		y = y % 4
		for x in range(-1, 5):
			g = web_gender[x % 2] # gender switch with every delta x
			x = x % 4
			L.append(g + str(matrix[y][x]))
		if y0 in [-1, 4]:
			s += '{0}   {1} {2}   {3} {4}   {5}\n'.format(*L)
		else:
			#s += '{0} │ {1} {2}   {3} {4} │ {5}\n'.format(*L)
			s += '{0} │ {1}─{2}   {3}─{4} │ {5}\n'.format(*L)
		if y == 1:
			s += '   │               │\n'
			# with center cross:
			#s += '   │       \u253C       │\n'
		if y0 in [0, 2]:
			#s += '   │ │   │   │   │ │\n'
			s += '   │               │\n'
		if y0 == -1:
			s += '   ┌' + '─'*15 + '┐\n'
		if y0 == 3:
			s += '   └' + '─'*15 + '┘\n'
		L = []
	return s

#print(web_16(matrix['web-rc-top-go-left']))
#print(web_16_v(matrix['web-rc-top-go-left']))

##print(web_16_2(matrix['web-rc-left-go-top']))
print(web_16_2_v(matrix['web-rc-left-go-top']))

#for key in matrix:
if False:
	print('%s:' % key)
	print('16:')
	print(str_16(matrix[key]))
	print('8 top:')
	print(str_8(matrix[key][0:2]))
	print('8 bot:')
	print(str_8(matrix[key][2:4]))
	print('4 top left:')
	print(str_4(matrix[key]))









"""
view = construct one of sixteen views

i = eye = top left number

v = vertical "last bond" [age, time]
	True  if "first bond" is horizontal
	False if "first bond" is vertical
"""
import copy
def view(i, v=True):

	m = L(
		L(0, 0, 0, 0),
		L(0, 0, 0, 0),
		L(0, 0, 0, 0),
		L(0, 0, 0, 0),
	)
	
	# it starts with eye
	m[1][1] = i

	# let us assume "v is True" for now,
	# and later transform the matrix, according to h.
	# so, for now, first bond is horizontal.

	# first bond to you
	m[1][2] = lx(
		(i in gl) and gl or gr, # same congruence
		(i in me) and mi or me, # other mood
		(i in tn) and tn or tp  # same tempo
	)

	# second bond to het
	m[2][1] = lx(
		(i in gl) and gl or gr, # same congruence
		(i in me) and mi or me, # other mood
		(i in tp) and tn or tp  # other tempo
	)

	# opposite type is "het of you"
	m[2][2] = lx(
		(i in gl) and gl or gr, # same congruence
		(i in mi) and mi or me, # same mood
		(i in tp) and tn or tp  # other tempo
	)



	# mirror to the right = other congruence
	
	d = (i in gl) and +5 or -5
	
	m[2][4] = m[1][1] + d
	m[2][3] = m[1][2] + d
	m[1][4] = m[2][1] + d
	m[1][3] = m[2][2] + d



	# mirror to the bottom = other age

	m[3][1] = m[1][2]
	m[4][1] = m[2][2]

	m[3][2] = m[1][1]
	m[4][2] = m[2][1]

	m[3][3] = m[1][4]
	m[4][3] = m[2][4]

	m[3][4] = m[1][3]
	m[4][4] = m[2][3]

	# flip diagonal
	if v == False:
		t = copy.deepcopy(m)
		for y in range(1, 5):
			for x in range(1, 5):
				m[y][x] = t[x][y]

	return m





___lines_x_16_new = L(
	L('', '', '', '   ', '   ',       '   ', '', ''),
	L('', '', '', '   ', '   ',       '   ', '', ''),

	L('', '', '', ' U ', '   ',       ' U ', '', ''),
	L('', '', '│', ' U ', ' │ ', ' U ', '│', '', ''),
	L('', '', '│', ' U ', ' │ ', ' U ', '│', '', ''),
	L('', '', '', ' U ', '   ',       ' U ', '', ''),

	L('', '', '', '   ', '   ',       '   ', '', ''),
	L('', '', '', '   ', '   ',       '   ', '', ''),
)
___lines_y_16_new = L(
	'',
	'',

	'  ─────────\n',
	'  E───A───E  \n',
	'      O\n',
	'  E───A───E  \n',
	'  ─────────\n',

	'',
	'',
	'',
)

__lines_x_16_new = L(
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', ' │ ', ' I ', '   ', ' I ', ' │ ', '   '),
	L('', '   ', ' │ ', ' I ', ' │ ', ' I ', ' │ ', '   '),
	L('', '   ', ' │ ', ' I ', ' │ ', ' I ', ' │ ', '   '),
	L('', '   ', ' │ ', ' I ', '   ', ' I ', ' │ ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
)

____lines_y_16_new = L(
	'',
	'\n',
	'      ┌───────────────┐\n',
	'      │   U───E───U   │\n',
	'      │       A       │\n',
	'      │   U───E───U   │\n',
	'      └───────────────┘\n',
	'\n',
	'',
	'',
	'',
)

__lines_y_16_new = L(
	'',
	'\n',
	'      ╒═══════════════╕\n',
	'      │   U───E───U   │\n',
	'      │       A       │\n',
	'      │   U───E───U   │\n',
	'      ╘═══════════════╛\n',
	'\n',
	'',
	'',
	'',
)

__lines_x_16_new = L(
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', ' │ ', '───', ' │ ', '───', ' │ ', '   '),
	L('', '   ', ' │ ', '───', ' │ ', '───', ' │ ', '   '),
	L('', '   ', ' │ ', '───', ' │ ', '───', ' │ ', '   '),
	L('', '   ', ' │ ', '───', ' │ ', '───', ' │ ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
)
__lines_y_16_new = L(
	'',
	'\n',
	'      ╒═══════╤═══════╕\n',
	'      │   U   E   U   │\n',
	'      ╞═══════A═══════╡\n',
	'      │   U   E   U   │\n',
	'      ╘═══════╧═══════╛\n',
	'\n',
	'',
	'',
	'',
)

lines_x_16_new = L(
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', ' │ ', ' U ', ' │ ', ' U ', ' │ ', '   '),
	L('', '   ', ' │ ', ' U ', ' │ ', ' U ', ' │ ', '   '),
	L('', '   ', ' │ ', ' U ', ' │ ', ' U ', ' │ ', '   '),
	L('', '   ', ' │ ', ' U ', ' │ ', ' U ', ' │ ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
)

lines_y_16_new = L(
	'',
	'\n',
	'      ╒═══════╤═══════╕\n',
	'      │   E   A   E   │\n',
	'      ╞═══════O═══════╡\n',
	'      │   E   A   E   │\n',
	'      ╘═══════╧═══════╛\n',
	'\n',
	'',
	'',
	'',
)


__lines_y_16_new_v0 = L(
	'',
	'\n',
	'      ┌───────────────┐\n',
	'      │ I U I   I U I │\n',
	'      │   E───A───E   │\n',
	'      │ I U I   I U I │\n',
	'      └───────────────┘\n',
	'\n',
	'',
	'',
	'',
)

lines_x_16_new_v0 = L(
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', ' ║ ', '   ', ' ║ ', '   ', ' ║ ', '   '),
	L('', '   ', ' ║ ', '   ', ' ║ ', '   ', ' ║ ', '   '),
	L('', '   ', ' ║ ', '   ', ' ║ ', '   ', ' ║ ', '   '),
	L('', '   ', ' ║ ', '   ', ' ║ ', '   ', ' ║ ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
	L('', '   ', '   ', '   ', '   ', '   ', '   ', '   '),
)

lines_y_16_new_v0 = L(
	'',
	'\n',
	'      ╓───────╥───────╖\n',
	'      ║ U E U ║ U E U ║\n',
	'      ╟───A───O───A───╢\n',
	'      ║ U E U ║ U E U ║\n',
	'      ╙───────╨───────╜\n',
	'\n',
	'',
	'',
	'',
)

# serialize 16 elements
# C: compact? print only 4x4 "core" of matrix, without near-field frame
#todo: generalize to accept "frame size", fs=0 --> no frame
# .... so we can produce larger fields, like fs=4 --> 1 core + 8 "next cores"
# --> show "minor lines" as dash- / dot-lines ┈┊ ┄┆ ╌╎
def str_16_new(m, C=False):
	# detect the value of v
	# v is True,
	# if the "last bond" is vertical
	# = the "first bond" is horizontal
	i = m[1][1]
	# first bond to you
	v = (m[1][2] == lx(
		(i in gl) and gl or gr, # same congruence
		(i in me) and mi or me, # other mood
		(i in tn) and tn or tp  # same tempo
	))
	#print('v is '+str(v))
	
	xy_min = C and 3 or 1
	xy_max = C and 6 or 8

	s = ''

	#todo write this shorter --> move the (v == True)? branch into the loops
	if v:
		#for y in range(1, 5):
		for y in range(xy_min, 1+xy_max):
			t = lines_y_16_new[y]
			if C:
				t = t.strip() + '\n'
			s += t
			#for x in range(1, 5):
			#for x in range(1, 9):
			for x in range(xy_min, 1+xy_max):
				#i = m[y][x]
				#i = m[(y-2)%4][(x-2)%4]
				i = m[(y-3)%4+1][(x-3)%4+1]
				if y in [1, 2, 7, 8] and x in [1, 2, 7, 8]:
					i = ' '
				#g = (i in gm) and 'M' or 'F'
				#s += lines_x_16_new[y][x] + g + str(i)
				#s += lines_x_16_new[y][x] + str(i)
				t = lines_x_16_new[y][x] + str(i)
				if C and x == 3:
					t = t.lstrip()
				s += t
				if C and x == 6:
					s += lines_x_16_new[y][7]
			s += '\n'
			if C and y == 6:
				s += lines_y_16_new[7].strip() + '\n'
		#s += lines_y_16_new[5]
	else:
		#for y in range(1, 5):
		#for y in [-1, 0, 1, 2, 3, 4, 5, 6]:
		#for y in range(1, 9): # 8 lines
		for y in range(xy_min, 1+xy_max):
			t = lines_y_16_new_v0[y]
			if C:
				t = t.strip() + '\n'
			s += t
			#for x in range(1, 5):
			#for x in range(1, 9):
			for x in range(xy_min, 1+xy_max):
				#i = m[y][x]
				i = m[(y-3)%4+1][(x-3)%4+1]
				if y in [1, 2, 7, 8] and x in [1, 2, 7, 8]:
					i = ' '
				#g = (i in gm) and 'M' or 'F'
				#s += lines_x_16_new[y][x] + g + str(i)
				#s += lines_x_16_new_v0[y][x] + str(i)
				t = lines_x_16_new_v0[y][x] + str(i)
				if C and x == 3:
					t = t.lstrip()
				s += t
				if C and x == 6:
					s += lines_x_16_new_v0[y][7]
			s += '\n'
			if C and y == 6:
				s += lines_y_16_new_v0[7].strip() + '\n'
		#s += lines_y_16_new_v0[5]
	# rename bonds. UEAO --> IUEA
	if v:
		s = tl(s, 'UEAO', '─UEA')
	else:
		s = tl(s, 'UEAO', 'IUEA')
	#replace('U', '─').replace('E', 'U').replace('
	return s



def str_cross(m):
	i = m[1][1]
	# detect the value of v
	v = (m[1][2] == lx(
		(i in gl) and gl or gr, # same congruence
		(i in me) and mi or me, # other mood
		(i in tn) and tn or tp  # same tempo
	))
	s = ''
	if v:
		t = (m[1][3], m[1][4], B[3], m[1][1], B[1], m[1][2], m[1][3])

		s += '        %i\n' % m[3][1]
		s += '\n'
		s += '        %i\n' % m[4][1]
		s += '        %s\n' % B[4]
		s += '%i   %i %s %i %s %i   %i\n' % t
		s += '        %s\n' % B[2]
		s += '        %i\n' % m[2][1]
		s += '\n'
		s += '        %i\n' % m[3][1]

	return s


	
def hide_gender(m):
	for y in range(1, 5):
		for x in range(1, 5):
			i = m[y][x]
			if i > 5:
				m[y][x] = i - 5
	return m



# main

#for x in [1, 2, 3, 4,   6, 7, 8, 9]:
for x in [1, 2, 3, 4]:
	for i in [True, False]:
	#for i in [True]:
		si = i and 'I' or 'H'

		m = view(x, i)
		
		m2 = hide_gender(copy.deepcopy(m))
		
		#print('m = '+repr(m))
		
		#print(str_16_new(m))
		#print(str_16_new(m2))
		
		#print('iter = '+repr(m.__iter__))



		# serialize matrix to string
		sm = ''
		for y in m:
			sm += ''.join(map(str, y))
			#sm += ' '.join(map(str, y)) + '\n'

		sm2 = ''
		for y in m2:
			sm2 += ''.join(map(str, y))

		sma  = tl(sm,  '12346789', 'ABCDFGHI')
		sma2 = tl(sm2, '1234',     'ABCD')

		#print('%s%i = %s = %s' % (si, x, sm, sm2))
		#print('%s%i:\n%s' % (si, x, sm))
		#print('%s%i:\n%s\n%s' % (si, x, sm, sm2))
		#print('%s%i:\n%s\n%s\n%s\n%s' % (si, x, sm, sm2, sma, sma2))
		#print('%s%i:\n%s\n%s\n%s\n%s' % (si, x, sm, sm2, sma, sma2))

		print(si + str(x) + 'N4 = ' + sm2)
		print(si + str(x) + 'L4 = ' + tl(sm2, '1234', 'ABCD'))

		print(si + str(x) + 'N8F = ' + sm)
		print(si + str(x) + 'L8F = ' + tl(sm, '12346789', 'ABCDFGHI'))

		print(si + str(x) + 'N8R = ' + tl(sm, '12346789', '67891234'))
		print(si + str(x) + 'L8R = ' + tl(sm, '12346789', 'FGHIABCD'))




		# print compact matrix
		if False:
			sm3 = ''
			for y in m:
				sm3 += ' '.join(map(str, y)) + '\n'
			print(si + str(x) + 'N8:\n' + sm3)
			print(si + str(x) + 'L8:\n' + tl(sm3, '12346789', 'ABCDFGHI'))

			sm4 = ''
			for y in m2:
				sm4 += ' '.join(map(str, y)) + '\n'
			print(si + str(x) + 'N4:\n' + sm4)
			print(si + str(x) + 'L4:\n' + tl(sm4, '1234', 'ABCD'))


		#print('%s%i = %s' % (si, x, sm))
		#print(sm)
		#_print(sm + ' ')

		#print(str_16_new(m))

		#print(str_16_new(m2))
		#print(str_16_new(m2, C=True))
		
		print(tl(str_16_new(m2, C=True), '─IUEA', 'BBDHP').replace('BBBBBBB', '───────').replace('BBB', '───'))
		#print(tl(str_16_new(m2, C=True), '─IUEA1234', 'BBDHPAAAA'))

		# with gender, coded as number
		#print(str_16_new(view(( x + 5 ), i), C=True))

		#print(str_cross(m2))
		print(tl(str_cross(m2), 'UEAO', 'BDHP'))



