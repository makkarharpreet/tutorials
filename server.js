const express=require('express');
const hbs=require("hbs");
const fs=require("fs");

const port=process.env.PORT||3000 ;

var app=express();

hbs.registerPartials(__dirname+'/views/partials')
app.set("view engine","hbs");


app.use((req,res,next)=>{
	var now=new Date().toString();

	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+"\n",(err)=>{
		if(err){
			console.log('unable to append to server.log')
		}
	});
	next();
})

app.use((req,res,next)=>{
	res.render('maintenance.hbs');
})

app.use(express.static(__dirname+"/public"));

hbs.registerHelper("getCurrentYear",()=>{
	return new Date().getFullYear()
});

hbs.registerHelper("screamIt",(text)=>{
	return text.toUpperCase();
});

app.get("/",(req,res)=>{
	//res.send("<h1>hello express</h1>");
	// res.send({
	// 	name:'preet',
	// 	likes:[
	// 		"biking",
	// 		"cities"
	// 	]
	// })
	res.render("home.hbs",{
		pageTitle:"Home Page",
		welcomeMessage:"Welcome to my website",
		//currentYear:new Date().getFullYear()
	})
});

app.get("/about",(req,res)=>{
	// res.send({
	// 	message:"this is about page"
	// })
	res.render("about.hbs",{
		pageTitle:"About Page",
		currentYear:new Date().getFullYear()
	})
});

app.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});