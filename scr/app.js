const  path =require('path')
const express=require('express')
const hbs=require('hbs');
const forecast = require('./utils/forcast');
const geocode = require('./utils/geocode');
const app=express()
const port=process.env.PORT || 3000
//DEFINE PATHS FOR EXPRESS CONFIG   
const publicDirectoryPath=(path.join(__dirname,'../public'));
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialPath)
//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))
 

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Anas Tazir'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:"provide address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //         location:'Boston',
    //         lat:37.23,
    //         lon:-118.43,
    //         address:req.query.address
    // })
    
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Anas Tazir'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'article not found'
    })
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'no search provided'
        })
    }
    else{
        console.log(res.query);
        res.send({
        products:[]
    })
    }

})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404'
    })
})


app.listen(port,()=>{
    console.log("Server is running at port 3000");
});


