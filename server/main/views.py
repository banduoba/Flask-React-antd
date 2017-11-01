from . import main
from flask import jsonify

@main.route('/users', methods=['GET', 'POST'])
def users():
	userVec = []
	userObj1 = {}
	userObj1['id'] = 1
	userObj1['username'] = 'Eric'
	userVec.append(userObj1)
	userObj2 = {}
	userObj2['id'] = 2
	userObj2['username'] = 'Rick'
	userVec.append(userObj2)
	userObj = {}
	userObj['users'] = userVec
	return jsonify(userObj)
