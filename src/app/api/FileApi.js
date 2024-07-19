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

export const saveFileInformation = (file, url, conversation_id) => {
    MyFetch('/api/file/attachment_v2/', {
        method: 'POST',
        body: JSON.stringify({
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            file_url: url,
            conversation_id: conversation_id
        })
    })
    .then((data)=>{
    })
    .catch((error)=>{
        console.error(error);
    })
}