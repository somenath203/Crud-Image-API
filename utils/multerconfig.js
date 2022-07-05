const path = require('path');
const multer = require('multer');

module.exports = multer({

    storage: multer.diskStorage({}),

    fileFilter: (req, file, cb) => {

        const ext = path.extname(file.originalname);
        // extracting the extension of the file i.e. weather the file is jpg or png or pdf etc.

        if (ext !== ".jpg" && ext !== '.jpeg' && ext !== '.png') {

            cb(new Error('File type not supported. Please choose another file'), false); // we reject file

            return;

        } else {

            cb(null, true); // we accept file if everything is correct

        };
    }

});
