// src/cmps/CloudinaryUploadButton.jsx
import { getCloudinarySignature } from '../services/cloudinary.service'

export function CloudinaryUploadButton({ preset }) {
  async function openWidget() {
    try {
        const { signature, timestamp, cloudName, apiKey, uploadPreset } =
            await getCloudinarySignature(preset)

        const widget = window.cloudinary.createUploadWidget(
            {
            cloudName,
            apiKey,
            uploadSignature: signature,
            uploadSignatureTimestamp: timestamp,
            uploadPreset,
            sources: ['local', 'url', 'camera'],
            multiple: true,
            },
            handleUploadCallback
        )

        widget.open()
    } catch (err) {
        console.error('Error opening Cloudinary widget', err)
    }
  }

  function handleUploadCallback(error, result) {
    if (!error && result && result.event === 'success') {
      onUpload?.(result.info.secure_url)
    }
  }

  return (
    <button onClick={openWidget}>
      Add Photos
    </button>
  )
}
