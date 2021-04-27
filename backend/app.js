//import body-parser module
const bodyParser = require('body-parser');
//import express module
const express = require('express');
//create express app
const app = express();
// import mongoose module
const mongoose = require('mongoose');
// importer le modèle user
const User = require('./models/user');
//importer le modéle ad
const Ad = require('./models/ad');
//importer le modéle category
const Category = require('./models/category');
//importer le modéle category
const Comment = require('./models/comment');
//importer le module de cryptage du pwd
const bcrypt = require('bcrypt');
//importer le pdfKit
const PDFDocument = require('pdfkit');
// const fs = require('fs');

// let pdfDoc = new PDFDocument;
// pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
// pdfDoc.text("My Sample PDF Document");
// pdfDoc.end();

//importer le path
const path = require('path'); //module prédéfinit
//importer le multer
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images'))); //accés bech testa3mel dossier backend images

//importer le monggose unique validator
const uniqueValidator = require('mongoose-unique-validator');

var mySchema = mongoose.Schema({ email: { type: String, index: true, unique: true, required: true } });
mySchema.plugin(uniqueValidator);

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// définir les extensions qu'ont peut télécharger
const MIME_TYPE = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/jpg': 'jpg'
};
// définir une format pour l'image
const storage = multer.diskStorage({
	// destination
	destination: (req, file, cb) => {
		const isValid = MIME_TYPE[file.mimetype];
		let error = new Error('Mime type is invalid');
		if (isValid) {
			error = null;
		}
		cb(null, 'backend/images');
	},
	filename: (req, file, cb) => {
		const name = file.originalname.toLowerCase().split(' ').join('-');
		const extension = MIME_TYPE[file.mimetype];
		const imgName = name + '-' + Date.now() + '-plantes-' + '.' + extension;
		cb(null, imgName);
	}
});

// Security configuration
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-with, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PATCH, PUT');
	next();
});

var nodemailer = require('nodemailer');
// 27017 PORT du serveur local de la DB
// plantesDB : Nom de la base de données
mongoose.connect('mongodb://localhost:27017/plantesDB', { useNewUrlParser: true, useUnifiedTopology: true });

//traitement logique de ajouter annonce
app.post('/ads', multer({ storage: storage }).single('image'), (req, res) => {
	console.log('here in add annonce', req.body);
	url = req.protocol + '://' + req.get('host');
	const ad = new Ad({
		productName: req.body.productName,
		category: req.body.category,
		description: req.body.description,
		price: req.body.price,
		image: url + '/images/' + req.file.filename
	});
	ad.save().then(
		res.status(200).json({
			message: 'Match Added successfully'
		})
	);
});

// app.post("/ads", (req, res) => {
//     console.log('here in add annonce', req.body);

//     const ad = new Ad({
//         productName: req.body.productName,
//         category: req.body.category,
//         description: req.body.description,
//         price: req.body.price,
//         userId: req.body.userId

//     });

//     ad.save().then(
//         res.status(200).json({
//             message: "ad Added successfully"
//         })
//     )
// })

//traitement logique de afficher tous les annonces
app.get('/ads', (req, res) => {
	console.log('here in add annonce', req.body);
	Ad.find((err, docs) => {
		if (err) {
			console.log('error with db ');
		} else {
			res.status(200).json({
				ads: docs
			});
		}
	});
});

//traitement logique de signup
app.post('/users/signup', (req, res) => {
	bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
		console.log('here in signup', req.body); //req.body te5ouli les valeurs mta3 formulaire li 3abitou
		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			tel: req.body.tel,
			address: req.body.address,
			pwd: cryptedPwd,
			confirmPassword: req.body.confirmPassword,
			role: req.body.role
		});

		user.save().then(
			res.status(200).json({
				message: "L'utilisateur est bien ajouté !"
			})
		);
	});
});

//traitement logique de login
app.post('/users/login', (req, res) => {
	console.log('here in login', req.body);
	const loginEmail = req.body.loginEmail;
	const loginPwd = req.body.loginPwd;
	User.findOne({ email: loginEmail })
		.then((findedUser) => {
			if (!findedUser) {
				res.status(200).json({
					message: '0'
				});
			}
			return bcrypt.compare(req.body.loginPwd, findedUser.pwd); //compare ta3mel décryptage w tcompari en mm temps
		})
		.then((correctUserPwd) => {
			console.log('correctUserPwd', correctUserPwd);
			if (!correctUserPwd) {
				res.status(200).json({
					message: '1'
				});
			}
			User.findOne({ email: req.body.loginEmail }).then((finalUser) => {
				let user = {
					id: finalUser._id,
					firstName: finalUser.firstName,
					lastName: finalUser.lastName,
					role: finalUser.role
				};
				res.status(200).json({
					user: user,
					message: '2'
				});
			});
		});
});

//traitement logique de get ad by id
app.get('/ads/:id', (req, res) => {
	console.log('here id', req.params.id);
	Ad.findOne({ _id: req.params.id }).then((findedObj) => {
		//_id !!! 5ater fel bd yetkteb hakek id sinn undefined
		if (findedObj) {
			res.status(200).json({
				ad: findedObj
			});
		}
	});
});

//traitement logique d'ajout d'une catégorie
app.post('/adCategory', (req, res) => {
	console.log('here in add category');
	const category = new Category({
		categoryName: req.body.categoryName
	});
	console.log(req.body.categoryName);

	category.save().then(
		res.status(200).json({
			message: 'la catégorie est bien ajoutée !'
		})
	);
});

//traitement logique de afficher tous les categories
app.get('/adCategory', (req, res) => {
	console.log('here in get category');
	Category.find((err, docs) => {
		console.log(docs);
		if (err) {
			console.log('error with db ');
		} else {
			res.status(200).json({
				category: docs
			});
		}
	});
});

//traitement logique de chercher
app.post('/adCategory', (req, res) => {
	console.log('here in login', req.body);
	const loginEmail = req.body.loginEmail;
	const loginPwd = req.body.loginPwd;
	User.findOne({ loginEmail, loginPwd })
		.then((findedUser) => {
			if (!findedUser) {
				res.status(200).json({
					message: '0'
				});
			}
			return bcrypt.compare(req.body.pwd, findedUser.pwd); //compare ta3mel décryptage w tcompari en mm temps
		})
		.then((correctUserPwd) => {
			console.log('correctUserPwd', correctUserPwd);
			if (!correctUserPwd) {
				res.status(200).json({
					message: '1'
				});
			}
			User.findOne({ email: req.body.email }).then((finalUser) => {
				let user = {
					firstName: finalUser.firstName,
					lastName: finalUser.lastName
				};
				res.status(200).json({
					user: user,
					message: '2'
				});
			});
		});
});

//traitement logique de get All users
app.get('/adminUsers', (req, res) => {
	console.log('here in get all users');
	User.find((err, docs) => {
		console.log(docs);
		if (err) {
			console.log('error with db ');
		} else {
			res.status(200).json({
				users: docs
			});
		}
	});
});

//traitement logique de supprimer utilsateur

app.delete('/adminUsers/:id', (req, res) => {
	console.log('here in delete');
	User.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'user deleted'
		})
	);
});

//traitement logique de update utilsateur
app.put('/adminUsers/:id', (req, res) => {
	console.log('here in update', req.params.id);
	const user = new User({
		_id: req.body.id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		address: req.body.address,
		tel: req.body.tel,
		pwd: req.body.pwd
	});
	User.updateOne({ _id: req.params.id }, user).then((result) => {
		if (result) {
			res.status(200).json({
				message: 'user updated with success'
			});
		}
	});
});

//traitement logique de afficher tous les commentaires
app.get('/comments', (req, res) => {
	console.log('here in add comment', req.body);
	Comment.find((err, docs) => {
		if (err) {
			console.log('error with db ');
		} else {
			res.status(200).json({
				comments: docs
			});
		}
	});
});
//traitement logique de afficher  les commentaires by id de produit
app.get('/comments/:id', (req, res) => {
	console.log('here id', req.params.id);
	Comment.find({ prId: req.params.id }).then((findedObj) => {
		//_id !!! 5ater fel bd yetkteb hakek id sinn undefined
		if (findedObj) {
			res.status(200).json({
				comments: findedObj
			});
		}
	});
});

//traitement logique de ajouter commentaire
app.post('/comments', (req, res) => {
	console.log('here in add comment', req.body);
	const comment = new Comment({
		fullName: req.body.fullName,
		commentUserId: req.body.commentUserId,
		message: req.body.message,
		prId: req.body.prId
	});
	comment.save().then(
		res.status(200).json({
			message: 'comment Added successfully'
		})
	);
});
//traitement logique de save the date
app.post('/comments', (req, res) => {
	req.body.created_at = new Date();
	db.collection('comments').save(req.body, (err, result) => {
		if (err) return console.log(err);

		console.log('saved to database');
	});
});

//traitement logique de edit profil
app.put('/users/:id', (req, res) => {
	console.log('here in update', req.params.id);
	const user = new User({
		_id: req.body._id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		tel: req.body.tel,
		address: req.body.tel,
		pwd: req.body.pwd,
		confirmPassword: req.body.confirmPassword
	});
	User.updateOne({ _id: req.params.id }, user).then((result) => {
		if (result) {
			res.status(200).json({
				message: 'profil updated with success'
			});
		}
	});
});

//traitement logique de get connectedUser
app.get('/users/:id', (req, res) => {
	console.log('here connectedUserId', req.params.id);
	User.findOne({ _id: req.params.id }).then((findedObj) => {
		//_id !!! 5ater fel bd yetkteb hakek id sinn undefined
		if (findedObj) {
			res.status(200).json({
				users: findedObj
			});
		}
	});
});

module.exports = app;
