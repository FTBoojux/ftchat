import { Box } from '@mui/material';

import AudioFileRoundedIcon from '@mui/icons-material/AudioFileRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import FontDownloadRoundedIcon from '@mui/icons-material/FontDownloadRounded';

import Typography from '@mui/material/Typography';

const AUDIO_FILE_TYPE = "audio/";
const APPLICATION_FILE_TYPE = "application/";
const IMAGE_FILE_TYPE = "image/";
const VIDEO_FILE_TYPE = "video/";
const TEXT_FILE_TYPE = "text/";
const FONT_FILE_TYPE = "font/";

export default function FileInformationBox({ message }) {
    const fileInfomation = JSON.parse(message.content);
    const FileIcon = () => {
        if (fileInfomation.type.startsWith(AUDIO_FILE_TYPE)) {
            return <AudioFileRoundedIcon />;
        }else if (fileInfomation.type.startsWith(IMAGE_FILE_TYPE)) {
            return <ImageRoundedIcon />;
        } else if (fileInfomation.type.startsWith(VIDEO_FILE_TYPE)) {
            return <OndemandVideoRoundedIcon />;
        } else if (fileInfomation.type.startsWith(TEXT_FILE_TYPE)) {
            return <TextSnippetRoundedIcon />;
        } else if (fileInfomation.type.startsWith(FONT_FILE_TYPE)) {
            return <FontDownloadRoundedIcon />;
        } else {
            return <AttachFileRoundedIcon />;
        } 
    }
    const fileSizeCalc = (size) => {
        if (size < 1024) {
            return size + 'B';
        } else if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + 'KB';
        } else if (size < 1024 * 1024 * 1024) {
            return (size / 1024 / 1024).toFixed(2) + 'MB';
        } else {
            return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB';
        }
    }
    return <>
        <Box
            sx={{
                p: 1,
                pl: 2,
                pr: 2,
                bgcolor: message.side === 'right' ? 'primary.main' : 'grey.300',
                color: message.side === 'right' ? 'primary.contrastText' : 'text.primary',
                borderRadius: 1,
            }}
        >
            <a href={fileInfomation.content} download={fileInfomation.filename}>
                <Box display={'flex'} >
                    <Box>
                        <FileIcon />
                    </Box>
                    <Box>
                        <Typography >
                            {fileInfomation.filename}
                        </Typography >
                        <Typography>
                            {fileInfomation.size && fileSizeCalc(fileInfomation.size)}
                        </Typography>
                    </Box>
                </Box>

            </a>
        </Box>
    </>
}