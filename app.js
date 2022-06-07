const request=require("request");
const express=require("express");
const bodyparser=require("body-parser");
const https=require("https")

const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendfile(__dirname +"/signup.html")
});
app.post("/", function(req,res){
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);

  const url="https://us18.api.mailchimp.com/3.0/lists/7a94cef004";

  const options= {
    method:"POST",
    auth:"mouli:992e6e33f6658ababcfd6a8625b7267b-us18"
  }
  const request= https.request(url,options,function(response)
{
   if(response.statusCode===200){
     console.log(response.statusCode);
     res.sendfile(__dirname + "/success.html");
   }
   else{
     res.sendfile(__dirname + "/failure.html");

   }
      response.on("data",function(data){
      console.log(JSON.parse(data));
  });
});
request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("server is runing in 3000 port");
});


//992e6e33f6658ababcfd6a8625b7267b-us18   api key MAILCHIMP
//7a94cef004 AUDIENCE ID MAILCHIMP
