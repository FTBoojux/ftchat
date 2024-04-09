import MyFetch from './MyFetch';

export const fetchFilePresignedUrl = (filename) => {
    return new Promise((resolve, reject) => {
        MyFetch(`/api/file/presigned_url?filename=${filename}`,{
            method: 'GET',
          })
        .then(response => response.json())
        .then((data) => {
            resolve(data.data);
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}