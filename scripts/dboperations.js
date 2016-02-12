/**
 * Created by praba on 2/10/2016.
 */
var mysql      = require('mysql');


var credential=[];
//Fetching credential information
exports.FnReadCredentials=function() {
  require('fs').readFile('./app/config/credentials.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    credential = JSON.parse(data);
    exports.FnDBConnection();
    //console.log(obj);
  });
}

//Create mysql connection using credential parameters
var connection;
exports.FnDBConnection=function(){
  //Creating mysql connection using following connection parameters
  connection = mysql.createConnection({
    host     : credential[0].host,
    port     : credential[0].port,
    user     : credential[0].user,
    password : credential[0].password,
    database : credential[0].database
  });

  connection.connect(function(err){
    if(!err) {
      console.log("Database is connected ... \n\n");
      //Calling function to fetch all the tables from config files
      exports.FnReadConfig();
    } else {
      console.log("Error connecting database ... \n\n"+err);
    }
  });
}

//Fetch all config tables
var obj=[];
exports.FnReadConfig=function() {
  require('fs').readFile('./app/config/dbconfig.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
     obj = JSON.parse(data);
    //console.log(obj);
  });
}

//Method invoked from login-card ,to validate the user and returns role name to the login-card
exports.FnLoginDBCheck=function(pagename,username,password,callback){
//console.log(obj.length);
  //To fetch tables for this card from dbconfig file
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }
  var returnval;
  var rolename;
  var username={"Emp_ID":username};
  var password={"Password":password};
  //Fetching JOB_DESC of tthe logged user
  connection.query('SELECT * from '+ Config_tables[0] +' where ? and ? ',[username,password], function(err, rows) {
    if(!err)
    {
      if(rows.length>0)
      {
         var depid={'Department_ID':rows[0].Department_ID};
         var roleid=rows[0].Role_ID;
         //Fetching Department of the logged user and identifying the role
         connection.query('SELECT * from '+ Config_tables[1] +' where ? ',[depid], function(err, rows) {
          if(!err){
            if(rows.length>0)
            {
              var depname=rows[0].Department_Name;
              var Role_Name=depname+" "+roleid;
              var cond={"Role_Name":Role_Name};
              connection.query('SELECT * from '+ Config_tables[2] +' where ? ',[cond], function(err, rows) {
                if(!err){
                  if(rows.length>0){
                    rolename=rows[0].Role_Name;
                    //Return logged user's rolename to the login card if it is a valid user
                    return callback(rolename);
                  }
                }
                else
                  console.log('error'+err);
              });
            }
          }
          else
            console.log("error...."+err);
        });
      }
      else
      {
        //If the logged user is not exist it returns invalid flag to the login card
        return callback("invalid");
        }
    }
    else
    {
      console.log(err);
    }
  });

}


exports.FnInwardRegNoGeneration=function(pagename,response,cond,callback){
  //Fetching tables from config file
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }
  //Fetching inward bill no if it is new it will insert data otherwise it wont
  connection.query('select Inward_Bill_Number from '+ Config_tables[0] +' where ?',[cond],function(error,rows) {
    if(!error)
    {
      //console.log(rows.length);
      if(rows.length==0)
      {
        //Inserting vehicle info to the table
        connection.query('INSERT INTO '+Config_tables[0]+' set ?', [response], function(error) {
          if(!error){
            dummyno = {
              dummy_column : 1
            };
            //Generating inward sequence no
            connection.query('insert into '+Config_tables[1]+' set ?',[dummyno],function(err,result){
              if(!err)
              {
                console.log('seq generated!');
              }
            });
            //res.status(200).json({'returnval': "succ"});
            //Sending succ flag as created seq successfully
            return callback("succ");
          }
          else{
            console.log(error);
            //res.status(200).json({'returnval': "fail"});
            return callback("fail");
          }
        });
      }
      else{
        //res.status(200).json({'returnval': "exists"});
        //Sending exists flag as seq no already there
        return callback("exists");
      }
    }
    else
    {
      console.log("yes..."+error);
      //res.status(200).json({'returnval': "fail"});
      return callback("fail");
    }
  });
}

exports.FnRegisterInwardItemDetail=function(pagename,response,callback){
  //Fetching tables from config file
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }
  //Fetching inward register no and adding IRN to this no
  connection.query('SELECT Inward_Register_Number from '+Config_tables[0]+' ORDER BY Inward_Register_Number DESC LIMIT 1', function(err, rows, fields) {
    if(!err)
    {
      var idd="IRN"+rows[0].Inward_Register_Number;
      //			 console.log(idd);
      response.new_Inward_Register_Number=idd;
      //Inserting item info to the table
      connection.query('insert into '+Config_tables[1]+' set ?',[response],function(err,result){
        if(!err)
        {
          console.log("Inserted!"+idd);
          //On successful registeration generating inward reg no as response
          return callback(idd);
          //res.status(200).json({'inwardregno': idd});
        }
        else{
          //On failing insert operation error message revert
          console.log("Not Inserted!"+idd);
          return callback("not okay");
          //res.status(200).json({'inwardregno': 'not okay'});
        }
      });
    }
  });
}


exports.FnForwardFlowitemFetch=function(pagename,cond,callback){
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }
  connection.query('SELECT distinct new_Inward_Register_Number,Inward_Bill_Number,Inward_Register_Date from '+Config_tables[0]+' where ?',[cond], function(err, rows, fields) {
    var itemarr=[];
    for(var i=0;i<rows.length;i++)
    {
      var obj={"inwardno":"","inwarddate":"","ponumber":"","podate":"","state":"","inwardregno":""};
      obj.inwardno=rows[i].Inward_Bill_Number;
      obj.inwarddate=rows[i].Inward_Register_Date;
      obj.ponumber=rows[i].PO_Number;
      obj.podate=rows[i].PO_Date;
      obj.state=rows[i].state;
      obj.inwardregno=rows[i].new_Inward_Register_Number;
      itemarr.push(obj);
    }
    if(!err){
      //console.log(JSON.stringify(itemarr));
      return callback(itemarr);
      //res.status(200).json(itemarr);
    }
  });
}

exports.FnExpanditemFetch=function(pagename,cond,cond1,callback){
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }
  connection.query('SELECT * from '+Config_tables[0]+' where ? and ?',[cond,cond1], function(err, rows) {
    if(!err)
    {
      var itemarr=[];

      for(var i=0;i<rows.length;i++)
      {
        var obj={"inwardno":"","inwarddate":"","ponumber":"","podate":"","supname":"","itemdes":"","qtyreceived":"","qtyaccepted":"","remarks":""};
        obj.inwardno=rows[i].Inward_Bill_Number;
        obj.inwarddate=rows[i].Inward_Register_Date;
        obj.ponumber=rows[i].PO_Number;
        obj.podate=rows[i].PO_Date;
        obj.supname=rows[i].Supplier_ID;
        obj.itemdes=rows[i].Product_ID;
        //obj.qtyordered=rows[i].Qty;
        obj.qtyreceived=rows[i].Qty_Received+rows[i].unit;
        obj.qtyaccepted=rows[i].Qty_Accepted+rows[i].unit;
        obj.remarks=rows[i].Remarks;
        itemarr.push(obj);
      }
      //console.log(itemarr);
      //res.status(200).json(itemarr);
      return callback(itemarr);
    }
    else{
    }
  });
}

exports.FnPhysicqualifyitem=function(pagename,cond1,cond2,cond3,cond4,cond5,newstatus,val2,val3,val4,val5,callback) {

  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }

  var existflag="false";

  connection.query('SELECT * from '+Config_tables[0]+' where ? and ? and ? and ? ',[cond1,cond2,cond3,cond5], function(err, rows) {
    if(!err){
      //console.log("Inward......."+rows.length);
      if(rows.length>0)
        existflag="true";
    }
    else
    {
    }
  });

  connection.query('SELECT * from '+Config_tables[0]+' where ? and ? and ? and ? ',[cond1,cond2,cond3,cond4], function(err, rows) {
    if(!err){
      //console.log("In ......"+rows.length+"  "+existflag);
      if((rows.length>0)&&(existflag=="false")){
        //console.log("Yes into....");
        response = {
          Inward_Bill_Number:rows[0].Inward_Bill_Number,
          Inward_Register_Date:rows[0].Inward_Register_Date,
          PO_Number:rows[0].PO_Number,
          PO_Date:rows[0].PO_Date,
          Supplier_ID:rows[0].Supplier_ID,
          Product_ID:rows[0].Product_ID,
          //Qty:rows[0].Qty,
          GRAN_No:rows[0].GRAN_No,
          Qty_Received:rows[0].Qty_Received,
          Qty_Accepted:rows[0].Qty_Accepted,
          Remarks:rows[0].Remarks,
          new_Inward_Register_Number:rows[0].new_Inward_Register_Number,
          state:newstatus
        };
        //console.log(response);
        connection.query('UPDATE '+Config_tables[0]+' set ?,?,?,? where ? and ? and ? and ?',[val4,val5,val2,val3,cond1,cond2,cond3,cond4], function(err, result){
          if(!err){
            connection.query('insert into OD_Sales_Inward_Material set ?',[response],function(err,result){
              if(!err){
                return callback("updated");
                //res.status(200).json({"flag":"updated"});
              }
              else
              {
                return callback("not updated");
                //res.status(200).json({"flag":"not updated"});
              }
            });
          }
          else
          {
            return callback("not updated");
            //res.status(200).json({"flag":"not updated"});
          }
        });
      }
      if((rows.length>0)&&(existflag=="true")){

        connection.query('UPDATE '+Config_tables[0]+' set ?,?,?,? where ? and ? and ? and ?',[val4,val5,val2,val3,cond1,cond2,cond3,cond4], function(err, result){
          if(!err){
            //res.status(200).json({"flag":"updated"});
            return callback("updated");
          }

        });

      }
      else
      {
        console.log('no items found');
      }
    }
    else
    {
      console.log('Error...'+err);
    }
  });
}

exports.FnPhysicqualifiedService=function(pagename,cond1,cond2,cond3,updatestatus,qtyupdatestatus,val,updateflag,ponumber,callback){
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }

  var oldnewarr=[];
  var newarr=[];
  var splicearr=[];
  var flag=0;
  var returnval=0;
  connection.query('SELECT * from '+Config_tables[0]+' where ? and ?',[cond1,cond3], function(err, rows) {
    //console.log(rows.length);
    if(rows.length>0){
      for(var i=0;i<rows.length;i++)
      {
        /*var obj={"inwardno":"","itemdes":""};
         obj.inwardno=rows[i].Inward_Bill_Number;
         obj.itemdes=rows[i].Product_ID;
         oldnewarr.push(obj);*/
        var obj={"inwardno":"","inwarddate":"","ponumber":"","podate":"","supname":"","itemdes":"","qtyreceived":"","qtyaccepted":"","remarks":"","state":"","inwardregno":""};
        obj.inwardno=rows[i].Inward_Bill_Number;
        obj.inwarddate=rows[i].Inward_Register_Date;
        obj.ponumber=rows[i].PO_Number;
        obj.podate=rows[i].PO_Date;
        obj.supname=rows[i].Supplier_ID;
        obj.itemdes=rows[i].Product_ID;
        //obj.qtyordered=rows[i].Qty;
        obj.qtyreceived=rows[i].Qty_Received;
        obj.qtyaccepted=rows[i].Qty_Accepted;
        obj.remarks=rows[i].Remarks;
        obj.state=updatestatus;
        obj.inwardregno=rows[i].new_Inward_Register_Number;
        oldnewarr.push(obj);
      }
    }
  });
  //console.log(JSON.stringify(oldnewarr));
  connection.query('SELECT * from '+Config_tables[0]+' where ? and ?',[cond1,cond2], function(err, rows) {
    //console.log(rows.length);
    if(rows.length>0){
      for(var i=0;i<rows.length;i++)
      {
        var obj={"inwardno":"","inwarddate":"","ponumber":"","podate":"","supname":"","itemdes":"","qtyreceived":"","qtyaccepted":"","remarks":"","state":"","inwardregno":""};
        obj.inwardno=rows[i].Inward_Bill_Number;
        obj.inwarddate=rows[i].Inward_Register_Date;
        obj.ponumber=rows[i].PO_Number;
        obj.podate=rows[i].PO_Date;
        obj.supname=rows[i].Supplier_ID;
        obj.itemdes=rows[i].Product_ID;
        //obj.qtyordered=rows[i].Qty;
        obj.qtyreceived=rows[i].Qty_Received;
        obj.qtyaccepted=rows[i].Qty_Accepted;
        obj.remarks=rows[i].Remarks;
        obj.state=updatestatus;
        obj.inwardregno=rows[i].new_Inward_Register_Number;
        newarr.push(obj);
      }
      //console.log(JSON.stringify(newarr));
      for(var i=0;i<newarr.length;i++){
        flag=0;
        for(var j=0;j<oldnewarr.length;j++)
        {
          if(newarr[i].itemdes==oldnewarr[j].itemdes)
            flag=1;
          //console.log(newarr[i].itemdes);
          //else
          //flag=1;
        }
        if(flag==0){
          splicearr.push(newarr[i]);
          if(updateflag=="1"){
            var qtyval= {Qty_Accepted : newarr[i].qtyreceived};
            var itemdes={Product_ID : newarr[i].itemdes};
            var supname={Supplier_ID : newarr[i].supname};

            //console.log(qtyval.Qty_Accepted+" "+itemdes.Product_ID+"  "+supname.Supplier_ID);

            connection.query('UPDATE '+Config_tables[0]+' set ?,? where ? and ?  and ? and ?',[ponumber,qtyval,cond1,itemdes,supname,qtyupdatestatus], function(err, result){
              if(!err)
              {
                console.log('updated state quantity');
                //res.status(200).json({"flag":"updated","state":val.state});
              }
              else{
                console.log(err);
                //res.status(200).json({"flag":"not updated"});
              }
            });
          }

        }
      }
      //console.log(JSON.stringify(splicearr));
      if(splicearr.length>0){
        return callback(splicearr);
        //res.status(200).json(splicearr);
      }
      else
      {
        if(oldnewarr.length==0){
          for(var i=0;i<newarr.length;i++)
          {
            splicearr[i]=newarr[i];
          }

        }
        if(oldnewarr.length==newarr.length){
          /*for(var i=0;i<newarr.length;i++)
           {
           splicearr[i]=oldnewarr[i];
           }*/

        }
        //res.status(200).json(splicearr);
        return callback(splicearr);
      }
    }
  });

}

exports.FnPhysicinsertupdate=function(pagename,response,callback){
  //console.log(response);
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }
  connection.query('insert into '+Config_tables[0]+' set ?',[response],function(err,result){
    if(!err){
      return callback({"flag":"updated","inwardno":response.new_Inward_Register_Number});
      //res.status(200).json({"flag":"updated","inwardno":response.new_Inward_Register_Number});
    }
    else
    {
      console.log("error......."+err);
      return callback({"flag":"not updated"});
      //res.status(200).json({"flag":"not updated"});
    }
  });
}

exports.FnFlowstateupdate=function(pagename,cond1,cond2,val,retstatus,callback){
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }
  connection.query('UPDATE '+Config_tables[0]+' set ? where ? and ? ',[val,cond1,cond2], function(err, result){
    if(!err)
    {
      return callback({"flag":"updated","state":val.state});
      //res.status(200).json({"flag":"updated","state":val.state});
    }
    else{
      console.log(err);
      return callback({"flag":"not updated"});
      //res.status(200).json({"flag":"not updated"});
    }
  });
}

exports.FnBackwardflowitem=function(pagename,cond,cond1,callback){
  var Config_tables=[];
  for(var i=0;i<obj.length;i++){
    if(obj[i].name==pagename){
      Config_tables=obj[i].value;
    }
    //console.log(Config_tables);
  }
  connection.query('SELECT distinct new_Inward_Register_Number,Inward_Bill_Number,Inward_Register_Date from '+Config_tables[0]+' where ? and ?',[cond,cond1], function(err, rows, fields) {
    var itemarr=[];
    for(var i=0;i<rows.length;i++)
    {
      var obj={"inwardno":"","inwarddate":"","ponumber":"","podate":"","state":"","inwardregno":""};
      obj.inwardno=rows[i].Inward_Bill_Number;
      obj.inwarddate=rows[i].Inward_Register_Date;
      obj.ponumber=rows[i].PO_Number;
      obj.podate=rows[i].PO_Date;
      obj.state=rows[i].state;
      obj.inwardregno=rows[i].new_Inward_Register_Number;

      itemarr.push(obj);
    }
    if(!err){
      //console.log(JSON.stringify(itemarr));
      //res.status(200).json(itemarr);
      return callback(itemarr);
    }
  });
}
