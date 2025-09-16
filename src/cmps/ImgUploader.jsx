import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded }) {
    const [imgData, setImgData] = useState({
        imageUrl: null,
        height: 500,
        width: 500,
    })
    
    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        console.log(secure_url)
        setImgData({ imageUrl: secure_url, width, height })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
    }

    function getUploadLabel() {
        if (imgData.imageUrl) return 'Upload Another?'
        return isUploading ? 'Uploading....' : 'Upload Image'
    }

    return (
        <div className="upload-preview">
            {imgData.imageUrl && <img src={imgData.imageUrl} style={{ maxWidth: '50px', float: 'right' }} />}
            <label htmlFor="imgUpload">{getUploadLabel()}</label>
            <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
        </div>
    )
}