/**
 * Created by praba on 2/10/2016.
 */

var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Method call to read credential information to establish the database connection
var readcredential = require("./app/scripts/dboperations.js");
readcredential.FnReadCredentials();

//Lodaing static files like elements from app folder
app.use(express.static('app'));

//Receiving get request from index.html to render the home page of the application
app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});

//Receiving post request from login card
app.post('/login-card', urlencodedParser, function (req, res) {
  //Loading JS file to call the login check function
  var logincall = require("./app/scripts/dboperations.js");
  //calling loginchcek function with connection,username and password to validate the user,here defined callback method to get the asynchronous response
  logincall.FnLoginDBCheck("login-card",req.body.username,req.body.password,function(returnval){
    if(returnval!="invalid")
    //Sending positive response(role name) back to the login card if it is valid user
      res.status(200).json({'returnval': returnval});
    else
    //Sending error response
      res.status(200).json({'returnval': "invalid"});
  });
});

app.post('/inwardregnoseq-service',urlencodedParser, function (req, res) {
/*Getting data from the vehicle page*/
  response = {
    Vehicle_Number:req.query.vehno,
    Vehicle_Name:req.query.vehname,
    Driver_Numebr:req.query.drivername,
    Driver_Name:req.query.driverno,
    Inward_Bill_Number:req.query.invoiceno,
    Inward_Register_Date:req.query.invoicedate
  };
  cond={Inward_Bill_Number:req.query.invoiceno};
  //console.log(JSON.stringify(response));
  //Loading JS file to call seq generation
  var FnInwardRegNoGenerationcall = require("./app/scripts/dboperations.js");
  /*Function call to generate sequence*/
  FnInwardRegNoGenerationcall.FnInwardRegNoGeneration("inwardregnoseq-service",response,cond,function(returnval){
    if(returnval=="succ")
    //Sending positive response seq created
      res.status(200).json({'returnval': "succ"});
    //sending flag which ensures if inward reg no already exists
    else if(returnval=="exists")
      res.status(200).json({'returnval': "exists"});
    //Sending error response
    else
      res.status(200).json({'returnval': "fail"});
  });

});
app.post('/itemsave-service',urlencodedParser, function (req, res) {
  /*receiving values from item page*/
  response = {
    Inward_Bill_Number:req.query.invoiceno,
    Inward_Register_Date:req.query.invoicedate,
    Supplier_ID:req.query.supplier,
    Product_ID:req.query.itemdes,
    Qty_Received:req.query.qtyreceived,
    Qty_Accepted:req.query.qtyreceived,
    unit:req.query.unit,
    Remarks:req.query.remark,
    new_Inward_Register_Number:'',
    state: 'Stores'
  };
  //importing js file to invoke the function
  var FnRegisterInwardItemDetailcall = require("./app/scripts/dboperations.js");
  //Invoking function to insert item data into the table
  FnRegisterInwardItemDetailcall.FnRegisterInwardItemDetail("itemsave-service",response,function(returnval){
    if(returnval!="not okay")
    //Sending positive response inward regno to the user
      res.status(200).json({'inwardregno': returnval});
    else
    //sending error resonse
      res.status(200).json({'inwardregno': returnval});
  });

});

app.post("/forwardflowitem-service",urlencodedParser,function(req,res){
  cond={state:req.query.status};
  //importing js file to invoke the function
  var FnForwardflowfetchcall = require("./app/scripts/dboperations.js");
  //Invoking function to insert item data into the table
  FnForwardflowfetchcall.FnForwardFlowitemFetch("forwardflowitem-service",cond,function(returnval){
    res.status(200).json(returnval);
  });
});


//Displaying items in draft state to do physical inspection
app.post("/physicqualify-card",urlencodedParser,function(req,res){
  //console.log("In physic qualify service"+req.query.status);
  cond={new_Inward_Register_Number:req.query.inwardregno}
  cond1={state:req.query.status};
  //importing js file to invoke the function
  var FnExpandItemDetailcall = require("./app/scripts/dboperations.js");
  //Invoking function to insert item data into the table
  FnExpandItemDetailcall.FnExpanditemFetch("physicqualify-card",cond,cond1,function(returnval){
    res.status(200).json(returnval);
  });
});


app.post("/physicqualifyitem-card",urlencodedParser,function(req,res){
  console.log("In physic update...."+req.body.status+"   "+req.body.inwardno+" "+req.body.ponumber+"  "+req.body.podate+"  "+req.body.suppliername+"  "+req.body.itemdes+"  "+req.body.qtyaccepted+"  "+req.body.qtyordered+"  "+req.body.remark);
  cond1={
    new_Inward_Register_Number:req.body.inwardno}
  cond2={
    Supplier_ID:req.body.suppliername}
  cond3={
    Product_ID:req.body.itemdes}
  cond4={
    state:req.body.status}
  cond5={
    state:req.body.newstatus}
  newstatus=req.body.newstatus;
// val1={Qty:req.body.qtyordered};
  val2={Qty_Accepted:req.body.qtyaccepted};
  val3={Remarks:req.body.remark};
  val4={PO_Number:req.body.ponumber};
  val5={PO_Date:req.body.podate};

  var FnPhysicqualifyitemcall = require("./app/scripts/dboperations.js");
  //Invoking function to insert item data into the table
  FnPhysicqualifyitemcall.FnPhysicqualifyitem("physicqualifyitem-card",cond1,cond2,cond3,cond4,cond5,newstatus,val2,val3,val4,val5,function(returnval){
    if(returnval=="updated")
    res.status(200).json({"flag":returnval});
    else if(returnval=="not updated")
    res.status(200).json({"flag":returnval});
  });

});


//Updating state after completing physical inspection
app.post("/physicqualified-service",urlencodedParser,function(req,res){
  //console.log("In physic update...."+req.query.inwardnumber+"  "+req.query.checkstatus+"  "+req.query.status);
  cond1={new_Inward_Register_Number:req.query.inwardnumber};
  cond2={state:req.query.checkstatus};
  cond3={state:"Old"+req.query.checkstatus};
  var updatestatus="Old"+req.query.checkstatus;
  //console.log(cond3);
  var qtyupdatestatus={state:req.query.checkstatus};
  val={state:req.query.status};
  updateflag=req.query.updateflag;
  var ponumber={"PO_Number":req.query.ponumber};

  var FnPhysicqualifiedServicecall = require("./app/scripts/dboperations.js");
  //Invoking function to insert item data into the table
  FnPhysicqualifiedServicecall.FnPhysicqualifiedService("physicqualified-service",cond1,cond2,cond3,updatestatus,qtyupdatestatus,val,updateflag,ponumber,function(returnval){
      res.status(200).json(returnval);
  });
});


app.post("/physicinsertupdate-service",urlencodedParser,function(req,res){
  //console.log('inside'+req.query.inwardno);
  response = {
    Inward_Bill_Number:req.query.inwardno,
    Inward_Register_Date:req.query.inwarddate,
    PO_Number:req.query.ponumber,
    PO_Date:req.query.podate,
    Supplier_ID:req.query.supname,
    Product_ID:req.query.itemdes,
    //Qty:rows[0].Qty,
    //GRAN_No:rows[0].GRAN_No,
    Qty_Received:req.query.qtyreceived,
    Qty_Accepted:req.query.qtyaccepted,
    Remarks:req.query.remarks,
    new_Inward_Register_Number:req.query.inwardregno,
    state:req.query.state
  };
  var FnPhysicinsertupdatecall = require("./app/scripts/dboperations.js");
  //Invoking function to insert item data into the table
  FnPhysicinsertupdatecall.FnPhysicinsertupdate("physicinsertupdate-service",response,function(returnval){
    res.status(200).json({"flag":returnval.flag,"inwardno":returnval.inwardno});
  });
});


app.post("/flowstateupdate-service",urlencodedParser,function(req,res){
  cond1={state:req.query.checkstatus};
  cond2={new_Inward_Register_Number:req.query.inwardnumber};
  val={state:req.query.status};
  retstatus=req.query.status;
  var FnFlowstateupdatecall = require("./app/scripts/dboperations.js");
  //Invoking function to insert item data into the table
  FnFlowstateupdatecall.FnFlowstateupdate("flowstateupdate-service",cond1,cond2,val,retstatus,function(returnval){
    console.log();
    res.status(200).json({"flag":returnval.flag,"state":returnval.state});
  });
});

app.post("/backwardflowitem-service",urlencodedParser,function(req,res){
  //console.log('grn service...'+req.query.status);
  cond={state:req.query.status};
  cond1={new_Inward_Register_Number:req.query.inwardregno};
  var FnBackwardflowitemcall = require("./app/scripts/dboperations.js");
  //Invoking function to insert item data into the table
  FnBackwardflowitemcall.FnBackwardflowitem("backwardflowitem-service",cond,cond1,function(returnval){
    res.status(200).json(returnval);
  });
});


//Node server running port number
app.listen(4000);

