const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({dest: './files/'});

const pinata = require('../controllers/pinata');

router.post('/json', pinata.pinJSONToIPFS);
router.post('/file', upload.single('file'), pinata.pinFileToIPFS);

module.exports = router;
