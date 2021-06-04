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
//importer le modéle wishlist
const Wishlist = require('./models/wishlist');
//importer le modéle admin
const Admin = require('./models/admin');
//importer le modéle blog
const Blog = require('./models/blog');
//importer le modéle response
const Response = require('./models/response');
//importer le modéle order
const Order = require('./models/order');
//importer le modéle order
const Question = require('./models/question');
//importer le module de cryptage du pwd
const bcrypt = require('bcrypt');
//importer le pdfKit
const PDFDocument = require('pdfkit');
// const fs = require('fs');

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
const wishlist = require('./models/wishlist');


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
		image: url + '/images/' + req.file.filename,
		userId: req.body.userId,
		vendu: req.body.vendu
	});
	console.log(req.body.userId);
	ad.save().then(
		res.status(200).json({
			message: 'Ad Added successfully'
		})
	);
});

//traitement logique de afficher tous les annonces
app.get('/ads', (req, res) => {
	console.log('here in add annonce', req.body);
	Ad.find({ vendu: false }, (err, docs) => {
		if (err) {
			console.log('error with db ');
		} else {
			res.status(200).json({
				ads: docs
			});
		}
	});
});
//traitement logique de afficher tous les annonces vendu
app.get('/ads/vendu/:id', (req, res) => {
	console.log('here in add annonce', req.body);
	Ad.find({ userId: req.params.id, vendu: true }, (err, docs) => {
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
app.post('/users/signup', multer({ storage: storage }).single('image'), (req, res) => {
	bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
		console.log('here in signup', req.body); //req.body te5ouli les valeurs mta3 formulaire li 3abitou
		url = req.protocol + '://' + req.get('host');

		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			tel: req.body.tel,
			address: req.body.address,
			pwd: cryptedPwd,
			confirmPassword: cryptedPwd,
			role: req.body.role,
			image: url + '/images/profile.png'
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
			return bcrypt.compare(loginPwd, findedUser.pwd); //compare ta3mel décryptage w tcompari en mm temps
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
//tratement logique de delete ad by user
app.delete('/ads/:id', (req, res) => {
	0
	console.log('here in delete ad by user');
	Ad.deleteMany({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'ad deleted'
		})
	);

});
//traitement logique de get ad by id if vendu
app.put('/ads/vendu/:id', (req, res) => {
	console.log('here in update ad by user', req.params.id);
	const ad = new Ad({
		_id: req.body._id,
		productName: req.body.productName,
		category: req.body.category,
		description: req.body.description,
		price: req.body.price,
		userId: req.body.userId,
		vendu: req.body.vendu
	});
	Ad.updateOne({ _id: req.params.id }, ad).then(
		(result) => {
			if (result) {
				res.status(200).json({
					message: 'ad updated with success'
				});
			}
		});
});
//traitement logique de update ad by user
app.put('/ads/:id', (req, res) => {
	console.log('here in update ad by user', req.params.id);
	const ad = new Ad({
		_id: req.body._id,
		productName: req.body.productName,
		category: req.body.category,
		description: req.body.description,
		price: req.body.price,
		userId: req.body.userId,
		vendu: req.body.vendu
	});
	Ad.updateOne({ _id: req.params.id }, ad).then(
		(result) => {
			if (result) {
				res.status(200).json({
					message: 'ad updated with success'
				});
			}
		});
});
//traitement logique d'ajout d'une catégorie
app.post('/adCategory', (req, res) => {

	const category = new Category({
		categoryName: req.body.categoryName

	});
	console.log('here in add category', req.body.categoryName);

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
app.post('/users/login', (req, res) => {
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
//traitement logique de add user by admin
app.post('/admin', (req, res) => {
	console.log('here in login', req.body);
	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		tel: req.body.tel,
		address: req.body.address,
		pwd: req.body.pwd,
		confirmPwd: req.body.confirmPwd

	});
	user.save().then(
		res.status(200).json({
			message: 'user Added successfully'
		})
	);
})
//traitement logique de get All users
app.get('/admin', (req, res) => {
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

//traitement logique de supprimer utilsateur by admin
app.delete('/admin/:id', (req, res) => {
	console.log('here in delete');
	User.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'user deleted'
		})
	);
});
//traitement logique de supprimer annonce by admin
app.delete('/admin/ad/:id', (req, res) => {
	console.log('here in delete ad by admin');
	Ad.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'ad deleted'
		})
	);
});
//traitement logique de afficher  les commentaires by id de produit
app.get('/comments/:id', (req, res) => {
	console.log('here id', req.params.id);
	Comment.find({ adId: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				comments: findedObj
			});
		}
		console.log('here comment', findedObj);
	});
});

//traitement logique de ajouter commentaire
app.post('/comments', (req, res) => {
	console.log('here in add comment', req.body);
	const comment = new Comment({
		commentUserId: req.body.commentUserId,
		message: req.body.message,
		adId: req.body.adId,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		date: req.body.date,
		image: req.body.image
	});
	comment.save().then(
		res.status(200).json({
			message: 'comment Added successfully'
		})
	);
});

//traitement logique de edit profil
app.put('/users/:id', multer({ storage: storage }).single('image'), (req, res) => {
	console.log('here in update', req.params.id);
	url = req.protocol + '://' + req.get('host');
	const user = new User({
		_id: req.params.id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		tel: req.body.tel,
		address: req.body.address,
		pwd: req.body.pwd,
		confirmPassword: req.body.confirmPassword,
		image: url + '/images/' + req.file.filename
	});
	User.updateOne({ _id: req.params.id }, user).then(
		(result) => {
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

//traitement logique de ajouter article au wishlist
app.post('/wishlist', (req, res) => {
	console.log('here in add to wishlist');
	const wishlist = new Wishlist({
		adId: req.body.adId,
		wishlistUserId: req.body.wishlistUserId,
		productName: req.body.productName,
		category: req.body.category,
		description: req.body.description,
		price: req.body.price,
		image: req.body.image
	});
	wishlist.save().then(
		res.status(200).json({
			message: 'added to wishlist'
		})
	);
});

//traitement logique de supprimer article du wishlist
app.delete('/wishlist/:id', (req, res) => {
	console.log('here in delete from wishlist', req.params.id);
	Wishlist.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: ' deleted from wishlist'
		})
	);
});

// Traitement logique de get ads by userId
app.get('/ads/user/:id', (req, res) => {
	console.log('here in ads profile', req.params.id);
	Ad.find({ userId: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				ad: findedObj
			});
		}
	});
	console.log('here ok ');
});
// delete category
app.delete('/adCategory/:id', (req, res) => {
	console.log('here in delete gategory', req.params.id);
	Category.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'category deleted '
		})
	);
});
//traitement logique de supprimer annonce par l'admin
app.delete('/adCategory/ad/:id', (req, res) => {
	console.log('here in delete from ads', req.params.id);
	Ad.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: ' deleted from ads'
		})
	);
});
//traitement logique de update ad by id in admin
app.put('/adCategory/:id', (req, res) => {
	console.log('here in update ad by admin', req.params.id);
	const ad = new Ad({
		id: req.body._id,
		productName: req.params.productName,
		category: req.body.category,
		description: req.body.description,
		price: req.body.price,
		// image:req.params.image,
		userId: req.params.userId
	});
	Ad.updateOne({ id: req.params.id }, ad).then((result) => {
		if (result) {
			res.status(200).json({
				message: 'Ad updated'
			});
		}
		console.log('here teeeest');
	});
});
//traitement logique de get ad by id
app.get('/adCategory/:id', (req, res) => {
	console.log('here in get ad by id in admin', req.params.id);
	Ad.findOne({ _id: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				ad: findedObj
			})
		}
	})
});

//traitement logique de get admin by id
app.get('/dashboard/:id', (req, res) => {
	console.log('here in get admin by id', req.params.id);
	Admin.findOne({ _id: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				admin: findedObj
			});
		}
	});

});
//traitement logique de signup Admin
app.post('/admin/signup', multer({ storage: storage }).single('image'), (req, res) => {
	bcrypt.hash(req.body.adminPassword, 10).then((cryptedPwd) => {
		console.log('here in signup Admin', req.body); //req.body te5ouli les valeurs mta3 formulaire li 3abitou
		url = req.protocol + '://' + req.get('host');
		const admin = new Admin({
			fullName: req.body.fullName,
			adminEmail: req.body.adminEmail,
			adminPassword: cryptedPwd,
			adminConfirmPassword: cryptedPwd,
			image: url + '/images/adminProfil.jpg'
		});

		admin.save().then(
			res.status(200).json({
				message: "L'administrateur est bien ajouté !"
			})
		);
	});
});

//traitement logique de login Admin
app.post('/admin/login', (req, res) => {
	console.log('here in login admin', req.body);
	const loginAdminEmail = req.body.loginAdminEmail;
	const loginAdminPassword = req.body.loginAdminPassword;
	Admin.findOne({ adminEmail: loginAdminEmail })
		.then((findedUser) => {
			if (!findedUser) {
				res.status(200).json({
					message: '0'
				});
			}
			return bcrypt.compare(loginAdminPassword, findedUser.adminPassword); //compare ta3mel décryptage w tcompari en mm temps
		})
		.then((correctAdminPwd) => {
			console.log('correctAdminPwd', correctAdminPwd);
			if (!correctAdminPwd) {
				res.status(200).json({
					message: '1'
				});
			}
			Admin.findOne({ adminEmail: req.body.loginAdminEmail }).then((finalUser) => {
				let admin = {
					id: finalUser._id,
					fullName: finalUser.fullName,

				};
				res.status(200).json({
					admin: admin,
					message: '2'
				});
			});
		});
});

//traitement logique de get wishlist by id
app.get('/wishlist/:id', (req, res) => {
	console.log('here in get my wishlist', req.params.id);
	Wishlist.find({ wishlistUserId: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				wishlist: findedObj

			});

		}


	});



});
//traitement logique de get connected Admin
app.get('/admin/:id', (req, res) => {
	console.log('here in get connected admin ', req.params.id);
	Admin.findOne({ _id: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				admin: findedObj

			});
		}
	});

});
//traitement logique de update admin profil
app.put('/admin/:id', multer({ storage: storage }).single('image'), (req, res) => {
	console.log('here in update', req.params.id);
	url = req.protocol + '://' + req.get('host');
	const admin = new Admin({
		_id: req.params.id,
		fullName: req.body.fullName,
		adminEmail: req.body.adminEmail,
		adminPassword: req.body.adminPassword,
		adminConfirmPassword: req.body.adminConfirmPassword,
		image: url + '/images/' + req.file.filename
	});
	Admin.updateOne({ _id: req.params.id }, admin).then(
		(result) => {
			if (result) {
				res.status(200).json({
					message: 'profil updated with success'
				});


			}
		});
});
//traitement logique de users chart
app.get('/admin', (req, res) => {
	console.log('here in users chart ');
	User.find((err, docs) => {
		if (err) {
			console.log('error with DB');

		} else {
			res.status(200).json({
				user: docs
			})
		}
	})

})
//traitement logique de edit user profile by admin
app.put('/admin/user/:id', (req, res) => {
	console.log('here in update', req.params.id);
	const user = new User({
		_id: req.body._id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		tel: req.body.tel,
		address: req.body.address,
		pwd: req.body.pwd

	});
	User.updateOne({ _id: req.params.id }, user).then(
		(result) => {
			if (result) {
				res.status(200).json({
					message: 'profil updated with success in admin'
				});
			}
		});
});
//traitement logique de get user by id from admin
app.get('/admin/user/:id', (req, res) => {
	console.log('here in get user by Id from admin');
	User.findOne({ _id: req.params.id }).then((findedUser) => {
		if (findedUser) {
			res.status(200).json({
				user: findedUser

			});
		}
	})

});

//traitement logique passer commande
app.post('/orders', (req, res) => {
	console.log('here in orders');
	const order = new Order({
		orderUserId: req.body.orderUserId,
		productId: req.body.productId,
		productName: req.body.productName,
		category: req.body.category,
		description: req.body.description,
		price: req.body.price,
		image: req.body.image,
		vendu: req.body.vendu

	});
	order.save().then(
		res.status(200).json({
			message: 'added to basket'
		})
	);
});
//traitement logique de get order by user id
app.get('/orders/:id', (req, res) => {
	console.log('here in get order by user id');
	Order.find({ orderUserId: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				order: findedObj
			})
		}
	});

});
//traitement logique de get all orders
app.get('/orders', (req, res) => {
	console.log('here in get all orders');
	Order.find((err, docs) => {
		console.log(docs);
		if (err) {
			console.log('error with db ');
		} else {
			res.status(200).json({
				orders: docs
			});
		}
	});
});
//traitement logique de delete order 
app.delete('/orders/:id', (req, res) => {
	console.log('here in delete order');
	Order.deleteMany({ adId: req.params.id }).then(
		res.status(200).json({
			message: ' deleted from order'
		})
	)

});
//traitement logique de publier un blog
app.post('/adminBlog', multer({ storage: storage }).single('image'), (req, res) => {
	console.log('here in add article', req.body);
	url = req.protocol + '://' + req.get('host');
	const blog = new Blog({
		title: req.body.title,
		article: req.body.article,
		image: url + '/images/' + req.file.filename

	});
	blog.save().then(
		res.status(200).json({
			message: 'Article Added successfully'
		})
	);
});
//traitement logique de get all articles in blog
app.get('/adminBlog', (req, res) => {
	console.log('here in blog ');
	Blog.find((err, docs) => {
		if (err) {
			console.log('error with DB');

		} else {
			res.status(200).json({
				blog: docs
			})
		}
	})

});
//traitement logique de update ad by admin 
app.put('/admin/ad/:id', multer({ storage: storage }).single('image'), (req, res) => {
	console.log('here in add article', req.body);
	url = req.protocol + '://' + req.get('host');
	const ad = new Ad({
		productName: req.body.productName,
		category: req.body.category,
		description: req.body.description,
		price: req.body.price,
		userId: req.body.userId,
		vendu: req.body.vendu,
		image: url + '/images/' + req.file.filename

	});
	blog.save().then(
		res.status(200).json({
			message: 'Article Added successfully'
		})
	);



});
//traitement logique de ajouter une réponse à un commentaire
app.post('/response', (req, res) => {
	console.log('here in add response');
	var response = new Response({
		responseUserId: req.body.responseUserId,
		response: req.body.response,
		commentId: req.body.commentId,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		date: req.body.date,
		image: req.body.image
	});

	response.save().then(
		res.status(200).json({
			message: 'response added successfully'
		})
	)
});
//traitement logique de get response by comment id
app.get('/response/:id', (req, res) => {
	console.log('here in get response by comment id');
	Response.find({ commentId: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				response: findedObj

			});

		}


	});

});
//traitement logique de get all responses 
app.get('/response', (req, res) => {
	console.log('here in get all responses');
	Response.find((err, docs) => {
		console.log(docs);
		if (err) {
			console.log('error with db ');
		} else {
			res.status(200).json({
				response: docs
			});
		}
	});

});
//traitement logique de delete wishlist by ad id
app.delete('/wishlist/ads/:id', (req, res) => {
	console.log('here in delete wishlist by ad id', req.params.id);
	Wishlist.deleteMany({ adId: req.params.id }).then(
		res.status(200).json({
			message: ' deleted from wishlist'
		})
	);
});
//traitement logique de poser question dans le forum
app.post('/forum', (req, res) => {
	console.log('here in add a question');
	const question = new Question({
		questionUserId: req.body.questionUserId,
		question: req.body.question,
		adId: req.body.adId,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		date: req.body.date,
		image: req.body.image
	});
	question.save().then(
		res.status(200).json({
			message: 'question added successfully'
		})
	)
});
//traitement logique de get all question 
app.get('/forum', (req, res) => {
	Question.find((err, docs) => {
		console.log('here in get all questions', docs);

		if (err) {
			console.log('error with DB');

		} else {
			res.status(200).json({
				questions: docs
			});
		}
	});

});

//traitement logique de supprimer question 
app.delete('/forum/:id', (req, res) => {
	console.log('here in delete question', req.params.id);
	Question.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: ' deleted from forum'
		})
	);
});
//traitement logique de generate pdf
app.get("/orders/pdf", (req, res) => {
	console.log('here in generate pdf');
	const doc = new PDFDocument();
	doc.pipe(fs.createWriteStream("backend/pdf/orders.pdf"));
	doc

		.fillColor("#444444")
		.fontSize(20)
		.text("Patient Information.", 110, 57)
		.fontSize(10)
		.text("725 Fowler Avenue", 200, 65, { align: "right" })
		.text("Chamblee, GA 30341", 200, 80, { align: "right" })
		.moveDown();
	// Create the table 
	const table = {
		headers: ["Nom du produit", "Catégorie", "Description", "Prix"],
		rows: []
	};
	console.log('here in get all orders by pdf');
	Order.find((err, docs) => {
		if (err) {
			console.log('error with DB');
		} else {
			for (const orders of docs) {
				table.rows.push([orders.productName, orders.category, orders.description, orders.price]);

			}
			doc.moveDown().table(table, 10, 125, { width: 590 });
			doc.end();
			res.status(200).json({
				message: 'done for PDF'
			})
		}
	})
});
//traitement logique de get order by id
app.get('/orders/orderId/:id', (req, res) => {
	console.log('here in get order by id');
	Order.findOne({ _id: req.params.id }).then((findedObj) => {
		if (findedObj) {
			res.status(200).json({
				order: findedObj
			})
		}
	});

});


module.exports = app;
