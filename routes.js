const core = require("express-serve-static-core");
const res = require("express/lib/response");
const { Db } = require("mongodb");
const shortid = require("shortid");

/**
 * 
 * @param {core.Express} app 
 * @param {Db} db 
 */
function routes(app,db){

    app.post("/register",(request,response)=>{
        let email = request.body.email;
        let idd = shortid.generate();
        if(email){
            db.findOne({ email },(err,doc)=>{
                if(err){
                    console.log(err);
                    response.status(400).json({ "status":"Failed","reason":"Error occured" });
                }
                if(doc){
                    response.status(400).json({ "status":"Failed","reason":"Already registered" });
                }
                else{
                    db.insertOne({ email });
                    response.json({ "status":"success","id":idd });
                }
            });
        }
        else{
            response.status(400).json({ "status":"Failed", "reason":"wrong input" });
        }
    });

    app.post("/login",(req,res)=>{
        let email = req.body.email;
        if(email){
            db.findOne({ email },(err,doc)=>{
                if(err){
                    console.log(err);
                    response.status(400).json({ "status":"Failed","reason":"Error occured" });
                }
                if(doc){
                    res.json({ "status":"success","id":doc.id });
                }
                else{
                    res.status(400).json({ "status":"Failed","reason":"Not recognised" });
                }
            });
        }
        else{
            res.status(400).json({ "status":"Failed","reason":"Wrong input" });
        }
    });

    app.post("/upload",(req,res)=>{
        let buffer = req.body.buffer;
        let name = req.body.name;
        let title = req.body.title;

        if(buffer && title){


        }
        else{
            res.status(400).json({ "status":"Failed","reason":"wrong input" });
        }
    });

    app.get("/access/:email/:id",(req,res)=>{
        if(req.params.id && req.params.email){
            

        }
        else{
            res.status(400).json({ "status":"Failed","reason":"wrong input" });
        }
    });
}

module.exports = routes;