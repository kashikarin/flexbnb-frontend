export const uploadService = {
  uploadImg,
}

async function uploadImg(file) {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Missing Cloudinary configuration. Check your .env file')
  }

  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()

  //* Building the request body
  FORM_DATA.append('file', file)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)

  //* Sending a post method request to Cloudinary API
  try {
    console.log('Uploading to:', UPLOAD_URL)
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    })

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status} ${res.statusText}`)
    }

    const imgData = await res.json()
    console.log('Upload successful:', imgData.secure_url)
    return imgData
  } catch (err) {
    console.error('Upload error:', err)
    throw err
  }
}
