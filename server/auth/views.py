#coding=utf-8
from . import auth
from .. import db
from ..email.email import send_email
from flask import jsonify, request
from ..models.user import User

@auth.route('/register', methods=['POST'])
def register():
	result = {}
	try:
		data = request.get_json(force=True, silent=False, cache=False)
		user = User(email=data['mail'],
					username=data['userName'],
					password=data['password'])
		db.session.add(user)
		token = user.generate_confirmation_token()
		send_email(user.email, 'Confirm Your Account',
			'auth/email/confirm', user=user, token=token)
		result['status'] = 'ok'
	except:
		result['status'] = 'false'
	return jsonify(result)