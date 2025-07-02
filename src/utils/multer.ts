import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req:any, file:any, cb:any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req:any, file:any, cb:any) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      return cb(null, false);
    }
    cb(null, true);
  },
});
