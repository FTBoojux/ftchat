"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Snackbar, CircularProgress, Tooltip, IconButton } from '@mui/material';
import MessageBubble from '../../../../../components/message/MessageBubble';
import MyFetch from '@/app/api/MyFetch';
import localForage from 'localforage';
import { WebSocketContext, useWebContext } from '@/app/WebSocketContext';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploader from '../../../../../components/file/FileUploader';
import AlertDialog from '../../../../../components/tools/AlertDialog';
import { fetchFilePresignedUrl, saveFileInformation } from '@/app/api/FileApi';
import CircularProgressWithLabel from '../../../../../components/tools/CircularProgressWithLabel';
import axios from 'axios';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { WebviewWindow } from '@tauri-apps/api/window';
const maxImgSize = 1 * 1024 * 1024; // 3MB

const Page = ({params}) => {

    const router = useRouter();

    const conversation_id = params.slug;
    const [pagingState, setPagingState] = React.useState("");
    // const [pageSize,setPageSize] = React.useState(20);
    const [messageList, setMessageList] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState('');
    const [presigned_url, setPresignedUrl] = React.useState('');
    const [isAtBottom, setIsAtBottom] = React.useState(true);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [tempFile, setTempFile] = React.useState(null);
    const cvsnBoxRef = React.useRef(null);
    const inputBoxRef = React.useRef(null);
    const [fileUploadProgress, setFileUploadProgress] = React.useState(0);
    const ctx = useWebContext();
    React.useEffect((e) => {
      console.log(e);
      
    }, [tempFile])
    React.useEffect(() => {
      fetchMessageList()
        .then(() => {
          setTimeout(() => {  
            cvsnBoxRef.current.scrollTop = cvsnBoxRef.current.scrollHeight;
          },0)
        })
      ctx.setCurrentConversation(conversation_id);
      // 当组件加载时，从 localForage 获取保存的消息输入
      localForage.getItem(conversation_id).then(savedMessage => {
        if (savedMessage) {
          setMessage(savedMessage);
        }
      });
    }, [])
    React.useEffect(() => {
      console.log('lastMessage', ctx.lastMessage);
      if(ctx.lastMessage && ctx.lastMessage.conversation_id === conversation_id){
        setMessageList([...messageList, ctx.lastMessage]);
      }
    }, [ctx.lastMessage])
    React.useEffect(() => {
      if (isAtBottom) {
        cvsnBoxRef.current.scrollTop = cvsnBoxRef.current.scrollHeight - cvsnBoxRef.current.clientHeight;
      }
    }, [messageList]);

    const fetchMessageList = () => {
      return new Promise((resolve, reject) => {
        let url = `/api/conversation/${conversation_id}/message/`;
        if(pagingState) {
          url = url + `?paging_state=${encodeURIComponent(pagingState)}`
        }
        MyFetch(url, {
          method: 'GET',
        })
        .then(response=>response.json())
        .then((data) => {
          // setConversationList(data.data);
          if(data.data.paging_state != pagingState){
            // setMessageList(messageList.concat(data.data.message_list));
            setMessageList([...data.data.message_list, ...messageList])
            setPagingState(data.data.paging_state);
          }
          resolve()
        }).catch((error) => {
          console.error(error);
          reject()
        })
      })
    }
    const handleChange = async (event) => {
      const newMessage = event.target.value;
      setMessage(newMessage);
      // 将新输入的消息保存到 localForage
      await localForage.setItem(conversation_id, newMessage);
    };
    const clearMessage = ()=>{
      // 清空输入框
      setMessage('');
      inputBoxRef.current.innerHTML = '';
      // 清空 localForage 中保存的消息
      localForage.removeItem(conversation_id);
    }
    const handleSend = (message,type = 1) => {
      // 发送消息
      MyFetch(`/api/conversation/${conversation_id}/message/`, {
        method: 'POST',
        body: JSON.stringify({
          message: message,
          type: type
        }),
      })
      .then(response=>response.json())
      .then((data) => {
        // 清空 localForage 中保存的消息
        localForage.removeItem(conversation_id);
        if(data.result === 'success'){
          ctx.ws.send(JSON.stringify({
            type: 3,
            token: localStorage.getItem('access_token'),
            data: data.data
          }))
        }

      }).catch((error) => {
        console.error(error);
        setMessage('');
      })
    }

    const handleScroll = (e) => {
      const target = e.target;
      setIsAtBottom(target.scrollTop === target.scrollHeight - target.clientHeight);
      if(target.scrollTop === 0 && pagingState != null){
        const oldScrollHeight = cvsnBoxRef.current.scrollHeight
        fetchMessageList()
        .then(()=>{
          setTimeout(() => {
            const newScrollHeight = cvsnBoxRef.current.scrollHeight
            cvsnBoxRef.current.scrollTop = newScrollHeight-oldScrollHeight
          }, 0);
        })
      }
    }

    const handleInput = (e) => {
      setMessage(inputBoxRef.current.innerHTML);
    }

    const handleBlur = (e) => {
      setMessage(inputBoxRef.current.innerHTML);
    }

    const handlePaste = (event) => {
      handleBlur();
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      for(let index in items){
        const item = items[index];
        if(item.kind === 'file' && item.type.includes('image')){
          const blob = item.getAsFile();
          // if(blob.size > maxImgSize){
          //   setSnackOpen(true);
          //   setSnackMessage('图片大小超过3MB,将改用文件上传');
            MyFetch(`/api/file/presigned_url?filename=${blob.name}`,{
              method: 'GET',
            })
            .then(response=>response.json())
            .then(async (data) => {
              const uploadResponse = await fetch(data.data.presigned_url, {
                method: 'PUT',
                body: blob, // Directly upload the file
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              if(uploadResponse.status === 200){
                const {url} = uploadResponse
                // 只保留 ？ 之前的部分
                const index = url.indexOf('?');
                const uploadUrl = url.slice(0, index);
                handleSend(`<img src="${uploadUrl}" alt="${blob.name}" />`);
                clearMessage();           
              }
            })
            .catch((error) => {
              console.error(error);
            })
            ;
          // }
        }else if(item.kind === 'file'){
          setDialogOpen(true);
          setTempFile(item.getAsFile());
        }
      }
    }

    const handleAgree = () => {
      if(tempFile){
        handleFileUpload(tempFile);
        setDialogOpen(false);
      }
    }

    const handleFileUpload = (file) =>{
      fetchFilePresignedUrl(file.name)
        .then((data)=>{
          uploadFileWithProgress(file, data.presigned_url)
          .then(()=>{
            const urlWithoutQuery = data.presigned_url.split('?')[0];
            const message = {
              type: file.type,
              content: urlWithoutQuery,
              filename: file.name,
              size: file.size
            }
            handleSend(JSON.stringify(message),2);
            saveFileInformation(file, urlWithoutQuery, conversation_id);
          })
          .catch((error)=>{
            console.error(error);
          })
          
        })
    }

    const uploadFileWithProgress = (file, presigned_url) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);
        xhr.open('PUT', presigned_url, true);
        xhr.upload.onprogress = function(event) {
          if(event.lengthComputable){
            const percent = Math.round((event.loaded / event.total) * 100);
            console.log("percent",percent);
            setFileUploadProgress(percent);
          }
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.responseText); // Resolve with the response text
          }
        };
        xhr.onerror = (e) => {
          reject(e);
        };
        xhr.send(formData);
      })
    }

    const messageListCilck = (e) => {
      const webView = new WebviewWindow('历史记录',{
        url: '/window/chatHistory'        
      })
    }

    return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: '1fr auto', // 1fr 表示剩余空间，auto 表示内容高度
            height: '90vh',
          }}
        >
          {/* <style>
            {`
              .inputBox img {
                max-width: 100%;
                height: auto;
              }
            `}
          </style> */}
            <Box
                sx={{
                  // width: '100%',
                  // height: '100%',
                  overflowY: 'auto',
                  padding: 2,
                  boxSizing: 'border-box',
                  flexGrow: 1,
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                  }
                }}
                onScroll={handleScroll}
                ref={cvsnBoxRef}
            >
              {messageList.map((message, i) => (
                  <MessageBubble
                  key={i}
                  message={message}
                  // side={i % 2 === 0 ? 'right' : 'left'}
                  />
              ))}
            </Box>
            <Box
            display={'flex'}
            >
              <FileUploader 
                sendMessage={handleSend}
                fileUploadFunc = {handleFileUpload}
                conversation_id={conversation_id}
              />
              <Tooltip title="消息记录">
                <IconButton onClick={(e)=>messageListCilck(e)} >
                  <MessageOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Box
                sx={{
                  overflow: 'auto',
                }}
              >
                <Box
                  contentEditable
                  className="inputBox"
                  sx={{
                    padding: 1,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    width: '100%',
                    boxSizing: 'border-box',
                    outline: 'none',
                    height: 150,
                    overflowY: 'auto',
                    '& img': {
                      maxWidth: '100%',
                      height: 'auto',
                    }
                  }}
                  ref={inputBoxRef}
                  onBlur={handleBlur}
                  onPaste={handlePaste}
                ></Box>
              </Box>
              <Box>
                <Button variant="contained" 
                  style={{float: 'right'}}
                  onClick={()=>{
                    handleSend(message)
                    clearMessage()
                  }}
                >发送</Button>
              </Box>
            </Box>
            <AlertDialog
              handleAgree = {handleAgree}
              handleDisagree = {()=>{}}
              openState = {{open: dialogOpen, setOpen: setDialogOpen}}
              title="上传文件"
              discription="将粘贴的文件上传到当前会话?"
              agreeText="上传"
              disagreeText="取消"
            />
            {fileUploadProgress > 0 && fileUploadProgress < 100 && (
              <CircularProgressWithLabel value={fileUploadProgress} />
            )} 
            <Snackbar
              open={snackOpen}
              autoHideDuration={6000}
              onClose={() => setSnackOpen(false)}
              message={snackMessage}
            />
        </Box>
    );
};

export default Page;