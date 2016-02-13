/**
 * Created by praba on 2/13/2016.
 */
(function(){
  var itemarr=[];

  Polymer({
    is: "outwarditem-page",
    ready:function()
    {
      //this.nullflag=0;
      this.flag=0;
      this.itemflag=0;
      this.idd=0;
      localStorage.setItem("curr_sess_unitset",this.idd);
      this.itemArray=[{id:this.idd,description:'',quantity:'',unit:'',measure:'',weight:''}];
      this.splice('itemArray',1,1);
    },
    changed:function(){
      //alert('yes');
      //this.nullflag=1;
    },
    setCustomerinfo:function(outdate,outtime,customername,invoiceno,city)
    {
      this.outdate=outdate;
      this.outtime=outtime;
      this.customername=customername;
      this.invoiceno=invoiceno;
      this.city=city;
      //alert(this.outdate+"  "+this.outtime+"  "+this.customername+"  "+this.invoiceno+" "+this.city);
    },
    setVehicleinfo:function(vehicleno,transportname,drivername,driverno,ownername,ownerphone,panno)
    {
      this.vehicleno=vehicleno;
      this.transportname=transportname;
      this.drivername=drivername;
      this.driverno=driverno;
      this.ownername=ownername;
      this.ownerphone=ownerphone;
      this.panno=panno;
      //alert(vehicleno+"  "+transportname+"  "+drivername+"  "+driverno+"  "+ownername+"  "+ownerphone+"  "+panno);
    },
    setIteminfo:function(quantity,weight){
      this.flag=1;
      this.quantity=quantity;
      this.weight=weight;
      //alert(quantity+ "  "+weight);
    },
    setMenuinfo:function(itemdes,unit,measure){
      //alert(itemdes+"  "+unit+"  "+measure);
      this.unit=unit;
      this.measure=measure;
      localStorage.setItem("curr_sess_showunitvalue",unit);
      localStorage.setItem("curr_sess_showmeasurevalue",measure);
      this.itemflag=1;
      this.itemdes=itemdes;
    },
    additem:function(e)
    {
      //alert(e.model.index);
      //this.$.supname.validate();
      if(this.flag!=1)
      {
        this.quantity=null;
        this.weight=null;
      }
      if(this.itemflag!=1){
        this.itemdes=null;
        this.weight=null;}
      var existflag=0;
      var deleteflag=0;
      //alert(this.outdate+"  "+this.outtime+"  "+this.customername+"  "+this.invoiceno+"  "+this.city);
      //alert(this.vehicleno+"  "+this.transportname+"  "+this.drivername+"  "+this.driverno+"  "+this.ownername+"  "+this.ownerphone+"  "+this.panno);
      //alert(this.quantity+"  "+this.itemdes+"  "+this.unit+"  "+this.weight);
      if(this.itemdes=='deleted'||this.quantity=='deleted'){
        deleteflag=1;
      }
      if(this.itemdes==null||this.quantity==null||this.weight==null)
      {
        alert("All fields must want to be filled");
      }
      else
      {
        for(var i=0;i<itemarr.length;i++)
        {
          if(itemarr[i].itemdes==this.itemdes){
            existflag=1;
            alert("Item already exist!");
          }
          if(existflag==1){
          }
        }
        if(existflag==0){
          var obj={"outdate":"","outtime":"","customername":"","invoiceno":"","city":"","vehicleno":"","transportname":"","drivername":"","driverno":"","ownername":"","ownerphone":"","panno":"","quantity":"","unit":"","measure":"","itemdes":"","weight":""};
          obj.outdate=this.outdate;
          obj.outtime=this.outtime;
          obj.customername=this.customername;
          obj.invoiceno=this.invoiceno;
          obj.city=this.city;
          obj.vehicleno=this.vehicleno;
          obj.transportname=this.transportname;
          obj.drivername=this.drivername;
          obj.driverno=this.driverno;
          obj.ownername=this.ownername;
          obj.ownerphone=this.ownerphone;
          obj.panno=this.panno;
          obj.itemdes=this.itemdes;
          obj.unit=this.unit;
          obj.measure=this.measure;
          obj.quantity=(this.quantity)+" "+(this.measure);
          obj.weight=(this.weight)+" "+(this.unit);
          if(deleteflag!=1)
            itemarr.push(obj);
          this.idd=this.itemArray.length;
          localStorage.setItem("curr_sess_unitset",this.idd);
          //alert(JSON.stringify(itemarr));
          this.push('itemArray',{id:this.idd,description:'',quantity:'',unit:'',measure:'',weight:''});
          //alert(JSON.stringify(this.itemArray.length));
          this.flag=0;
          this.itemflag=0;
        }
      }
    },
    save:function(){
      if(localStorage.getItem("curr_sess_saveflag")=="false"){
        if(this.flag!=1)
        {
          this.quantity=null;
          this.weight=null;
        }
        if(this.itemflag!=1){
          this.itemdes=null;
          this.weight=null;
        }
        var existflag=0;
        var deleteflag=0;
        if(this.itemdes=='deleted'||this.quantity=='deleted'){
          deleteflag=1;
        }
        if(this.itemdes==null||this.quantity==null||this.weight==null)
        {
          alert("All fields must want to be filled");
        }
        else
        {
          for(var i=0;i<itemarr.length;i++)
          {
            if(itemarr[i].itemdes==this.itemdes){
              existflag=1;
              alert("Item already exist!");
            }
            if(existflag==1){
            }
          }
          if(existflag==0){
            var obj={"outdate":"","outtime":"","customername":"","invoiceno":"","city":"","vehicleno":"","transportname":"","drivername":"","driverno":"","ownername":"","ownerphone":"","panno":"","quantity":"","unit":"","measure":"","itemdes":"","weight":""};
            obj.outdate=this.outdate;
            obj.outtime=this.outtime;
            obj.customername=this.customername;
            obj.invoiceno=this.invoiceno;
            obj.city=this.city;
            obj.vehicleno=this.vehicleno;
            obj.transportname=this.transportname;
            obj.drivername=this.drivername;
            obj.driverno=this.driverno;
            obj.ownername=this.ownername;
            obj.ownerphone=this.ownerphone;
            obj.panno=this.panno;
            obj.itemdes=this.itemdes;
            obj.unit=this.unit;
            obj.measure=this.measure;
            obj.quantity=(this.quantity)+" "+(this.measure);
            obj.weight=(this.weight)+" "+(this.unit);
            if(deleteflag!=1)
              itemarr.push(obj);
            //alert(JSON.stringify(itemarr));
            this.flag=0;
            this.itemflag=0;
            this.$.itemservice.seqitemwriteService(itemarr)
          }

        }
        //document.querySelectorAll("paper-input").readonly=true;
        //alert(this.querySelector("item-card"));
      }
      else{
        alert("Item already saved..!Click create to enter another invoice!");
      }

    },
    delete:function(e)
    {
      itemarr.splice(e.model.index,1);
      this.splice('itemArray',e.model.index,1);
      this.itemdes='deleted';
      this.quantity='deleted';
      this.weight='deleted';
      this.flag=1;
      this.itemflag=1;
      //alert(JSON.stringify(itemarr));
    }
  });
})();
