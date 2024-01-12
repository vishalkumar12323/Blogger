import multer from "multer";
import path from "path";

const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve('./public/uploads/blog-img/'));
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve('./public/uploads/users/'));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        return cb(null, fileName);
    }
});

export { storage1, storage2 };