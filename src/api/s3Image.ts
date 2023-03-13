import * as AWS from '@aws-sdk/client-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
const { VITE_AWS_ACCESS_KEY_ID, VITE_AWS_SECRET_ACCESS_KEY } = import.meta.env;

const region = 'ap-northeast-2';
const bucket = 'team-jjinsa-hyperlink-bucket';

const s3 = new AWS.S3({
  region,
  credentials: {
    accessKeyId: VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: VITE_AWS_SECRET_ACCESS_KEY,
  },
});

type keyType = 'logo' | 'profile';

// export async function getSignedFileUrl(data) {
//   const params = {
//     Bucket: bucket,
//     Key: data.name,
//   };
//   const command = new PutObjectCommand(params);
//   s3.url
//   const url = await s3.getSignedUrl(s3, command, {
//     expiresIn: 3600,
//   });
//   return url;
// }

export const uploadFileToS3 = async (file: File, keyType: keyType) => {
  const fileType = file.type.split('/').pop();
  const uploadImage = s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: `${keyType}/${self.crypto.randomUUID()}.${fileType}`,
      Body: file,
    })
  );

  try {
    await uploadImage;
    return '';
  } catch (error) {
    console.error(error);
  }
};

export const deleteFileFromS3 = async (fileUrl: string) => {
  const key = fileUrl.split('/').slice(-2).join('/');

  const deleteImage = s3.deleteObject({
    Bucket: bucket,
    Key: key,
  });

  try {
    await deleteImage;
  } catch (error) {
    console.error(error);
  }
};
