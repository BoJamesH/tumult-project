from flask import Blueprint, request, jsonify
from app.models import db, User
from flask_login import current_user, login_required
from app.forms.image_form import ImageForm
from app.api.aws_helper import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
    try:
        if form.validate_on_submit():
            image = form.data["image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" in upload:
                return jsonify({'url': upload['url']})
            else:
                return jsonify({'error': 'Error uploading the image to AWS S3'})

    except Exception as e:
        return jsonify({'error': 'Error processing image upload', 'details': str(e)})


    # if form.errors:
    #     print(form.errors)
    #     return render_template("post_form.html", form=form, errors=form.errors)

    # return render_template("post_form.html", form=form, errors=None)
