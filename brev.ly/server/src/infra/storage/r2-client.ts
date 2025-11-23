import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { env } from '@/env'

export class R2Client {
  private client: S3Client

  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    })
  }

  async upload(key: string, body: string, contentType: string): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
      })
    )
  }

  getPublicUrl(key: string): string {
    return `${env.CLOUDFLARE_PUBLIC_URL}/${key}`
  }
}

