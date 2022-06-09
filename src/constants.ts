// if (process.env.NODE_ENV === 'production') {
//   API_BASE_URL = 'https://backend-api.com';
// } else {
// const DEV_API_URL = dev['presigned-url-dev'].apiUrl;
// const DEV_API_URL_WITHOUT_TRAILING_SLASH = DEV_API_URL.slice(
//   0,
//   DEV_API_URL.length - 1,
// );
const API_BASE_URL = 'http://localhost:5000';
const REGION = 'ap-southeast-1';
const S3_BUCKET_NAME = 'phuongtran-test-lovespace';
export const S3_BUCKET_URL = `https://${S3_BUCKET_NAME}.s3.amazonaws.com`;
export const MAX_FILE_SIZE_BYTES = 1000000;

export {REGION, API_BASE_URL};
