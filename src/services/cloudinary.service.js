import { httpService } from './http.service'

export async function getCloudinarySignature(preset) {
  return httpService.get('cloudinary/signature', { preset })
}