#coding=utf-8
from flask import jsonify, request
from flask_login import login_required, current_user

from ..email import send_email
from . import auth
from .. import db
from ..models.user import User


@auth.route('/login', methods=['GET', 'POST'])
def login():
	result = {}
	try:
		data = request.get_json(force=True, silent=False, cache=False)
		result['status'] = 'ok'
	except:
		result['status'] = 'false'
	return jsonify(result)

@auth.route('/register', methods=['POST'])
def register():
	result = {}
	data = request.get_json(force=True, silent=False, cache=False)
	if User.query.filter_by(email=data['mail']).first() is not None:
		result['status'] = 'failure'
		result['info'] = '该邮箱已被注册。'
		return jsonify(result)
	user = User(email=data['mail'],
				username=data['mail'],
				password=data['password'])
	db.session.add(user)
	token = user.generate_confirmation_token()
	send_email(user.email, '验证电子邮件地址',
			'auth/email/confirm', user=user, token=token)
	result['status'] = 'success'
	return jsonify(result)

@auth.route('/confirm/<token>')
@login_required
def confirm(token):
	result = {}
	if current_user.confirmed:
		result['status'] = 'ok'
	if current_user.confirm(token):
		result['status'] = 'ok'
	else:
		result['status'] = 'ok'
	return jsonify(result)