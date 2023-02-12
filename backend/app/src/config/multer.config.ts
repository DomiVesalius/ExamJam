import multer from 'multer';

const BASE_DIR = 'uploads';

const avatarUpload = multer({ dest: `${BASE_DIR}/avatars/` });

export default avatarUpload;
