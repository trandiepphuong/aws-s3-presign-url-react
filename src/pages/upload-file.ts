import axios from 'axios';
import {API_BASE_URL} from 'src/constants';

export async function uploadToS3({
  fileType,
  fileContents,
  fileName,
}: {
  fileType: string;
  fileContents: File;
  fileName: string;
}) {
  const presignedPostUrl = await getPresignedPostUrl(fileType, fileName);

  const formData = new FormData();
  formData.append('Content-Type', fileType);
  Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });
  formData.append('file', fileContents); // The file has be the last element
  try {
    await axios.post(presignedPostUrl.url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    console.log(err);
  }
  const res = await axios.post(
    `http://localhost:5000/photos/save-key?key=${presignedPostUrl.filePath}`,
    {},
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBodW9uZ3RyYW5Abm92YWh1Yi52biIsImlhdCI6MTY1NDc2MjgwNiwiZXhwIjoxNjU0ODQ5MjA2fQ.oR4zisxztUeyeyaq9ugz0NmKs_i4iif143fcgT3bwoo',
      },
    },
  );
  // return presignedPostUrl.filePath;
  // const urlImage = await axios.get(
  //   `${API_BASE_URL}/generate-url?key=${presignedPostUrl.filePath}`,
  // );
  return res;
}

type PresignedPostUrlResponse = {
  url: string;
  fields: {
    key: string;
    acl: string;
    bucket: string;
  };
  filePath: string;
};

const GET_PRESIGNED_URL_API_PATH = 'get-presigned-post-url-s3';

async function getPresignedPostUrl(fileType: string, fileName: string) {
  const {data: presignedPostUrl} = await axios.get<PresignedPostUrlResponse>(
    `${API_BASE_URL}/photos/${GET_PRESIGNED_URL_API_PATH}?fileType=${fileType}&fileName=${fileName}`,
  );

  return presignedPostUrl;
}
