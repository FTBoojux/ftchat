import { Input } from "@mui/icons-material";
import React from "react";
import { fetchFilePresignedUrl, saveFileInformation } from "@/app/api/FileApi";
import { Box, IconButton, Tooltip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MyFetch from "@/app/api/MyFetch";

const FileUploader = (props)=>{
    
    const fileInputRef = React.useRef(null);

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        if(file){
            fetchFilePresignedUrl(file.name)
                .then((data)=>{
                    fetch(data.presigned_url, {
                        method: 'PUT',
                        body: file,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((response)=>{
                        if(response.status === 200){
                            console.log('上传成功');
                        }
                        const url = data.presigned_url
                        // 只保留 ？ 之前的部分
                        const urlWithoutQuery = url.split('?')[0];
                        const message = {
                            type: file.type,
                            content: urlWithoutQuery,
                            filename: file.name,
                            size: file.size
                        }
                        // message to json String
                        props.sendMessage(JSON.stringify(message),2);
                        saveFileInformation(file, urlWithoutQuery, props.conversation_id);
                        fileInputRef.current.value = null;
                    })
                })
                .catch((error)=>{
                    console.error(error);
                    fileInputRef.current.value = null;
                })
        }
    }

    const handleIconClick = ()=>{
        fileInputRef.current.click();
    }



    return (
        <>
            <Box>
                <input 
                    type="file" 
                    ref = {fileInputRef} 
                    onChange={handleFileChange}
                    style={{ display: 'none' }} 
                />
                <Tooltip title="上传文件">
                    <IconButton 
                        onClick={()=>handleIconClick()}
                    >
                        <UploadFileIcon />
                    </IconButton> 
                </Tooltip>
            </Box>
        </>
    )
}

export default FileUploader;