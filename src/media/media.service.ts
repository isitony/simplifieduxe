import { Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';
import { randomBytes } from 'crypto';

@Injectable()
export class MediaService {
  private s3: S3;
  private bucketName = process.env.AWS_BUCKET_NAME;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: any): Promise<{ url: string }> {
    if (file.size > 20 * 1024 * 1024) { // 20MB
      throw new Error('File size exceeds the 20MB limit.');
    }

    const key = `media/${randomBytes(4).toString("hex")}/${file.originalname}`;
    const contentType = file.mimetype;
    const fileStream = Readable.from(file.buffer);

    const uploader = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: fileStream,
        ContentType: contentType,
      },
    });

    try {
      const uploadResult = await uploader.done();
      console.log(`Upload successful:`, uploadResult);
      // this also works
      // return { url: `https://${this.bucketName}.s3.amazonaws.com/${key}` };
      return {url: uploadResult.Location}
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
}
