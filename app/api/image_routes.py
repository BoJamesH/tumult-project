from flask import Blueprint, request, jsonify
from app.models import db, User
from flask_login import current_user, login_required
from app.forms.image_form import ImageForm
from werkzeug.utils import secure_filename
from app.api.aws_helper import (
    upload_file_to_s3, get_unique_filename, ALLOWED_EXTENSIONS)

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})
    image = request.files['image']

    if image.filename == '':
        return jsonify({'error': 'No selected file'})

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image.filename = get_unique_filename(filename)
        upload = upload_file_to_s3(image)
        if "url" in upload:
            return jsonify({'url': upload['url']})
        else:
            return jsonify({'error': 'Error uploading the image to AWS S3'})

    return jsonify({'error': 'Invalid file format'})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

