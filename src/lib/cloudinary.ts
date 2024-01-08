import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
import { ErrorManager } from 'src/utils/error.manager';

const configService = new ConfigService();

cloudinary.v2.config({
  cloud_name: configService.get('CLOUD_NAME'),
  api_key: configService.get('CLOUDINARY_API_KEY'),
  api_secret: configService.get('CLOUDINARY_SECRET'),
});

export const cloudinaryUpload = async (file: string) => {
  try {
    return await cloudinary.v2.uploader.upload(file)
    
  } catch (error){
    throw ErrorManager.createSignaturError(error.message);
  }
}
