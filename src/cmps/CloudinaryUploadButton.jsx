import { useState, useRef } from 'react'

export function CloudinaryDragUpload({ preset, onUpload, className = '' }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = preset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  const uploadToCloudinary = async (file) => {
    if (!cloudName || cloudName === 'YOUR_CLOUD_NAME') {
      console.error('Cloud name not configured!')

      return
    }

    if (!uploadPreset) {
      console.error('Upload preset not provided!')
      alert('upload preset not provided!')
      return
    }

    console.log('Upload details:', {
      cloudName,
      uploadPreset,
      fileName: file.name,
      fileSize: file.size,
    })

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    try {
      setIsUploading(true)
      console.log(
        'Starting upload to:',
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
      )

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Response error:', errorData)
        throw new Error(`Upload failed: ${response.status} - ${errorData}`)
      }

      const data = await response.json()
      console.log('Upload successful:', data.secure_url)
      onUpload(data.secure_url)
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error)
      alert(`Error uploading: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter((file) => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      alert('Please select image files only!')
      return
    }

    uploadToCloudinary(imageFiles[0])
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      uploadToCloudinary(file)
    } else {
      alert('Please select an image file')
    }

    e.target.value = ''
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`cloudinary-drag-upload ${className} ${
        isDragOver ? 'drag-over' : ''
      } ${isUploading ? 'uploading' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {isUploading ? (
        <div className="upload-progress">
          <div className="spinner"></div>
          <span>Uploading image...</span>
        </div>
      ) : (
        <div className="upload-content">
          <div className="upload-icon">📸</div>
          <div className="upload-text">
            <p>Drag an image here</p>
            <p>or click to select a file</p>
          </div>
        </div>
      )}
    </div>
  )
}
