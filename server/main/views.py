#coding=utf-8
from flask import request, jsonify
from flask_login import login_required, current_user
from . import main
from .. import db
from ..models.user import Permission
from ..models.blog import Post


@main.route('/submit-article', methods=['POST'])
@login_required
def submit_article():
    result = {}
    if current_user.can(Permission.WRITE):
        try:
            data = request.get_json(force=True, silent=False, cache=False)
            post = Post(body=data['body'],
                        author=current_user._get_current_object())
            db.session.add(post)
            db.session.commit()
            result['status'] = 'success'
        except:
            result['status'] = 'error'
            result['info'] = '提交文章失败'
    else:
        result['status'] = 'error'
        result['info'] = '用户没有写的权限'
    return jsonify(result)


