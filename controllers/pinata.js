const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

exports.pinJSONToIPFS = (req, res) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
	axios
	.post(url, req.body, {
		headers: {
			pinata_api_key: process.env.PINATA_API_KEY,
			pinata_secret_api_key: process.env.PINATA_SECRET_KEY
		}
	})
	.then(response => {
		res.status(201).json(response.data)
	})
	.catch(error => {
		res.status(500).json({status: 500, message: 'Internal Server Error'})
	});
};

exports.pinFileToIPFS = (req, res) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
	let filePath = req.file.path;
	let data = new FormData();
	data.append('file', fs.createReadStream(filePath));
	axios.post(url, data, {
	  maxContentLength: "Infinity", 
		headers: {
			"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
			pinata_api_key: process.env.PINATA_API_KEY, 
			pinata_secret_api_key: process.env.PINATA_SECRET_KEY
		},
	})
	.then(response => {
		res.status(201).json(response.data)
	})
	.catch(error => {
		console.log(error.message)
		res.status(500).json({status: 500, message: 'Internal Server Error'})
	})
	.finally(() => {
		fs.unlinkSync(filePath);
	});
};
