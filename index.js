
const express = require ("express");

const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const _ =require("lodash");
mongoose.connect("mongodb+srv://skarfistark:arifulla616@cluster0.6yfrdov.mongodb.net/todolistDB",()=>{
    console.log("conectd");
});

const itemSchema ={
    name:String
};

const listSchema ={
    name:String,
    items:[itemSchema]
};

const List = mongoose.model("List",listSchema);

const Item = mongoose.model("Item",itemSchema);

const dater = require (__dirname+"/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.set("view engine","ejs");

app.get("/",(req,res)=>{
    let day = dater.getDay();
    Item.find({},(err,listArr)=>{
        if(listArr.length==0){
            var item = new Item({
                name:"check to delete"
            });
            item.save();
            item = new Item({
                name:"+ to add"
            });
            item.save();
            res.redirect("/");
        }
        else{
            res.render("list",{today:day,listItems:listArr});

        }
    })
});

app.get("/:route",(req,res)=>{
    var routecap = _.capitalize(req.params.route);

    List.findOne({name:routecap},(err,listArr)=>{
        if(!listArr){
            var list = new List({
                name:routecap,
                items:[{name:"check to delete + to add"}]
            });
            list.save();
            res.redirect("/"+routecap);
        }
        else{
            res.render("list",{today:routecap,listItems:listArr.items});
        }
    })
});


app.post("/",(req,res)=>{
    var list = req.body.list;
    for(var i=0;i<list.length;i++){
        if(list[i]===','){
            list="";
        }
    }
    if(list!=""){
        if(req.body.tick!=null){
            List.updateOne({name:list},{$pull:{items:{_id:req.body.tick}}},(err)=>{
                if(err){
                    console.log(err);
                }
            });
        }
        else if(req.body.text!=null){
            List.updateOne({name:list},{$push:{items:{name:req.body.text}}},(err)=>{
                if(err){
                    console.log(err);
                }
            });
        }
        res.redirect("/"+req.body.list);
    }
    else{
        if(req.body.tick!=null){
            Item.deleteOne({_id:req.body.tick},(err)=>{
                if(err){
                    console.log(err);
                }
            });
        }
        else if(req.body.text!=null){
            var item = new Item({
                name:req.body.text
            });
            item.save();
        }
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("s a 3000");
});