
const express = require ("express");

const bodyParser = require ("body-parser");
const e = require("express");

const dater = require (__dirname+"/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const tdlist = [];
let checklist =[];

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    let day = dater.getDay();
    res.render("list",{today:day,listItems:tdlist,chk:checklist});
});


app.post("/",(req,res)=>{
    let tickarr = req.body.tick;
    checklist=[];
    if(tickarr!=null){
        for(var i=0;i<tickarr.length;i++){
            if(i==tickarr.length-1){
                if(tickarr[i]!="1"){
                    checklist.push("");
                }
                break;
            }
            if(tickarr[i+1]==="1"){
                checklist.push("checked");
                i++;
            }
            else{
                checklist.push("");
            }
        }
    }
    if(req.body.text===""){
        res.redirect("/");
    }
    else{
        tdlist.push(req.body.text);
        checklist.push("");
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("s a 3000");
});