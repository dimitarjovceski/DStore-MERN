import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 3000000, // 3000000 Bytes = 3 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
      // upload only png and jpg and jpeg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

router.post("/", imageUpload.single("image"), (req, res) => {
  try {
    if (req.file) {
      res.send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "Failed to upload image" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Something went wrong");
  }
});

export default router;
