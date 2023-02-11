const imagizer = require('imagizer-javascript')
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const multer = require('multer');
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT || 3001;

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: Storage
}).array('image', 3);

app.get("/", (req, res) => {
    res.json("gg working")
})

app.post("/image", (req, res) => {
    console.log(req.body)
    res.json("nice")
});

app.post('/upload', async (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.send('somthing went wrong');
        }
        switch (req.body.filter) {
            case "sketch":
                imagizer.PencilSketchImg(`./images/${req.files[0].originalname}`, `sketch`, '/edited').then(image_path => {
                    console.log(image_path)
                    var options = {
                        root: '.'
                    };
                    res.sendFile(`${image_path}`, options);
                }).catch(err => { console.log(err) })
                break;
            case "bw":
                imagizer.BnW(`./images/${req.files[0].originalname}`, `blackWhite`, '/edited').then(image_path => {
                    console.log(image_path)
                    var options = {
                        root: '.'
                    };
                    res.sendFile(`${image_path}`, options);
                }).catch(err => { console.log(err) })
                break;
            case "wc":
                imagizer.stylePhoto(`./images/${req.files[0].originalname}`, `waterColor`, '/edited').then(image_path => {
                    console.log(image_path)
                    var options = {
                        root: '.'
                    };
                    res.sendFile(`${image_path}`, options);
                }).catch(err => { console.log(err) })
                break;
        }
    });

});

app.listen(port, () => {
    console.log("server is up on port:", port)
})






