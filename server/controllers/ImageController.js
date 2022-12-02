var Images = require('../models/collection');
var ImageKit = require('imagekit');

var imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/nny7nrtku',
    publicKey: 'public_Q4+YMPWdnNO13CXq1ZF4tm5j0ro=',
    privateKey: 'private_uSBxTRxiUf3VdwK4L2cx9OLpWlI='
});

const authImageKit = (req, res, next) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
}

const getImages = (req, res, next) => {
    Images.find({ user: req.user._id })
        .then((imgs) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(imgs);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const postImage = (req, res, next) => {
    req.body.user = req.user._id;
    imagekit.upload({
        file: req.body.imgData, //required
        fileName: "my_file_name.png",   //required
    }).then(response => {
        req.body.url = response.url
        Images.create(req.body)
            .then((image) => {
                console.log('Image added to database ', image);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(image);
            }, (err) => next(err))
            .catch((err) => next(err));
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}

const deleteImage = (req, res, next) => {
    Images.deleteOne({ url: req.body.url }, function (err, obj) {
        if (err) console.log(err);
        console.log('1 document deleted');
    });
}

module.exports = {
    authImageKit,
    getImages,
    postImage,
    deleteImage
}