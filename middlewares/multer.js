import multer from 'multer';

const multerUpload = multer({
    limits: { fileSize: 1024 * 1024 * 2 } //2MB
});


const singleAvatar = multerUpload.single('avatar');

const attachmentsMulter = multerUpload.array('files', 2);

export { multerUpload, singleAvatar, attachmentsMulter };
