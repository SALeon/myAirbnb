import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { toast } from 'react-toastify';
import * as actions from '../../../actions';


export class BwmFileUpload extends React.Component {
  constructor() {
    super();

    this.setupReader();

    this.state = {
      selectedFile: undefined,
      imageBase64: '',
      initialImageBase64: '',
      croppedImage: {},
      pending: false,
      image: {},
      status: 'INIT',
      crop: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.setState({
        selectedFile,
        initialImageBase64: ''
      });

      this.reader.readAsDataURL(selectedFile);
    }
  }


  onCropChange(crop) {
    this.setState({ crop });
  }

  onImageLoaded(image) {
    this.image = image;
    if (image.naturalWidth < 950 && image.naturalHeight < 720) {
      this.resetToDefaultState('INIT');
      toast.error('Minimum width of an image is 950px and height 720px');
      return;
    }

    const croped = makeAspectCrop({ x: 0, y: 0, width: image.naturalWidth, height: image.naturalHeight, unit: 'px' });

    this.setState({
      crop: croped,
    });

    this.onCropCompleted(croped);
  }

  async onCropCompleted(pixelCrop) {
    const { selectedFile, initialImageBase64 } = this.state;

    if (selectedFile && (pixelCrop.height > 0 && pixelCrop.width > 0)) {
      const img = new Image();
      img.src = initialImageBase64;

      const croppedImage = await getCroppedImg(img, pixelCrop);/* eslint-disable-line */
      this.setState({ croppedImage });

      this.reader.readAsDataURL(croppedImage);
    }
  }

  onError() {
    this.setState({ pending: false, status: 'FAIL' });
  }

  onSuccess(uploadedImage) {
    const { onChange } = this.props.input || this.props;

    this.resetToDefaultState('OK');

    onChange(uploadedImage);
  }


  setupReader() {
    this.reader = new FileReader();

    this.reader.addEventListener('load', (event) => {
      const { initialImageBase64 } = this.state;

      const imageBase64 = event.target.result;

      if (initialImageBase64) {
        this.setState({ imageBase64 });
      } else {
        this.setState({ imageBase64, initialImageBase64: imageBase64 });
      }
    });
  }

  resetToDefaultState(status) {
    this.setState({
      pending: false,
      status,
      selectedFile: undefined,
      croppedImage: {},
      initialImageBase64: '',
      imageBase64: ''
    });
  }

  uploadImage() {
    const { croppedImage, selectedFile } = this.state;

    if (croppedImage) {
      this.setState({ pending: true, status: 'INIT' });
      actions.uploadImage(croppedImage, selectedFile.name).then(
        (uploadedImage) => { this.onSuccess(uploadedImage); },
        (error) => { this.onError(error); }
      );
    }
  }

  renderImageStatus() {/* eslint-disable-line */
    const { status } = this.state;

    if (status === 'OK') {
      return <div className="alert alert-success"> Image Uploaded Succesfuly! </div>;
    }

    if (status === 'FAIL') {
      return <div className="alert alert-danger"> Image Upload Failed! </div>;
    }
  }


  renderSpinningCircle() {/* eslint-disable-line */
    const { pending } = this.state;

    if (pending) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    }
  }


  render() {
    const { selectedFile, imageBase64, crop, initialImageBase64 } = this.state;

    return (
      <div className="img-upload-container">
        <div className="img-upload-button-container">
          <label className="img-upload btn btn-primary">
            <span className="upload-text"> Select an image </span>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={this.onChange}
            />
          </label>

          { selectedFile
          && (
          <button
            className="btn btn-success btn-upload"
            type="button"
            disabled={!selectedFile}
            onClick={() => this.uploadImage()}
          >
            Upload Image
          </button>
          )


        }
        </div>
        { initialImageBase64
          && (
          <ReactCrop
            src={initialImageBase64}
            crop={crop}
            onChange={(crop) => this.onCropChange(crop)}/* eslint-disable-line */
            onImageLoaded={(image) => this.onImageLoaded(image)}
            onComplete={(crop, pixelCrop) => this.onCropCompleted(pixelCrop)}/* eslint-disable-line */
          />
          )
        }

        { imageBase64
          && (
          <div className="img-preview-container">
            <div
              className="img-preview"
              style={{ backgroundImage: `url(${imageBase64})`, }}
            />

            {this.renderSpinningCircle()}
          </div>
          )
        }

        {this.renderImageStatus()}
      </div>
    );
  }
}

function getCroppedImg(image, pixelCrop) {
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob(file => {
      resolve(file);
    }, 'image/jpeg');
  });
}
