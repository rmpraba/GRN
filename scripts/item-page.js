/**
 * Created by praba on 2/12/2016.
 */

/*JS file for item-page*/
(function(){
  var itemarr=[];

  Polymer({
    is: "item-page",
    ready:function()
    {
      this.Supplier_Name="Supplier Name";
      this.Supplier_Name_error="Enter supplier name";
      this.nullflag=0;
      this.flag=0;
      this.itemflag=0;
      this.idd=0;
      localStorage.setItem("curr_sess_unitset",this.idd);
      /*Dynamic array for creating rows of item card*/
      this.itemArray=[{id:this.idd,description:'',received:'',unit:'',remark:''}];
      this.splice('itemArray',1,1);
    },
    changed:function(){
      //alert('yes');
      this.nullflag=1;
    },
    setVehicleinfo:function(invoiceno,vno,vname,dname,dno)
    {
      this.invoiceno=invoiceno;
      this.invoicedate=localStorage.getItem("localsess_curr_inwarddate");
      this.vno=vno;
      this.vname=vname;
      this.dname=dname;
      this.dno=dno
      //alert(this.vno+"  "+this.vname+"  "+this.dname+"  "+this.dno);
    },
    setIteminfo:function(qtyreceived,remark){
      this.flag=1;
      this.qtyreceived=qtyreceived;
      this.remark=remark;
    },
    setMenuinfo:function(itemdes,unit){
      //alert(itemdes+"  "+unit);
      this.unit=unit;
      localStorage.setItem("curr_sess_showunitvalue",unit);
      this.itemflag=1;
      this.itemdes=itemdes;
    },
    FnAddItem:function(e)
    {
      //alert(e.model.index);
      this.$.supname.validate();
      if(this.flag!=1)
      {
        this.qtyreceived=null;
        this.remark=null;
      }
      if(this.itemflag!=1)
        this.itemdes=null;
      //this.itemdes=localStorage.getItem("localsess_curr_itemdes");
      //this.qtyreceived=localStorage.getItem("localsess_curr_qtyreceived");
      //this.remark=localStorage.getItem("localsess_curr_remark");
      var existflag=0;
      var deleteflag=0;
      //alert(this.invoiceno+"  "+this.invoicedate+"  "+this.vno+"  "+this.vname+"  "+this.dname+"  "+this.dno+" "+this.itemdes+" "+this.qtyreceived+" "+this.remark);
      if(this.itemdes=='deleted'||this.qtyreceived=='deleted'){
        deleteflag=1;
      }
      if(this.itemdes==null||this.qtyreceived==null||this.nullflag==0)
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
          var obj={"invoiceno":"","invoicedate":"","supplier":"","itemdes":"","qtyreceive":"","remark":"","unit":""};
          obj.invoiceno=this.invoiceno;
          obj.invoicedate=this.invoicedate;
          obj.supplier=this.supname;
          obj.itemdes=this.itemdes;
          obj.qtyreceive=this.qtyreceived;
          obj.remark=this.remark;
          obj.unit=this.unit;
          if(deleteflag!=1)
            itemarr.push(obj);
          this.idd=this.itemArray.length;
          localStorage.setItem("curr_sess_unitset",this.idd);
          //alert(JSON.stringify(itemarr));
          this.push('itemArray',{id:this.idd,description:'',received:'',unit:'',remark:''});
          //alert(JSON.stringify(this.itemArray.length));
          this.flag=0;
          this.itemflag=0;
        }
      }
    },
    FnSaveItem:function(){
      if(localStorage.getItem("curr_sess_saveflag")=="false"){
        if(this.flag!=1)
        {
          this.qtyreceived=null;
          this.remark=null;
        }
        if(this.itemflag!=1)
          this.itemdes=null;
        //this.itemdes=localStorage.getItem("localsess_curr_itemdes");
        //this.qtyreceived=localStorage.getItem("localsess_curr_qtyreceived");
        //this.remark=localStorage.getItem("localsess_curr_remark");
        var existflag=0;
        var deleteflag=0;
        //alert(this.invoiceno+"  "+this.invoicedate+"  "+this.vno+"  "+this.vname+"  "+this.dname+"  "+this.dno+" "+this.itemdes+" "+this.qtyreceived+" "+this.remark);
        if(this.itemdes=='deleted'||this.qtyreceived=='deleted'){
          deleteflag=1;
        }
        if(this.itemdes==null||this.qtyreceived==null||this.supname==null)
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
            var obj={"invoiceno":"","invoicedate":"","supplier":"","itemdes":"","qtyreceive":"","remark":"","unit":""};
            obj.invoiceno=this.invoiceno;
            obj.invoicedate=this.invoicedate;
            obj.supplier=this.supname;
            obj.itemdes=this.itemdes;
            obj.qtyreceive=this.qtyreceived;
            obj.unit=this.unit;
            obj.remark=this.remark;
            if(deleteflag!=1)
              itemarr.push(obj);
            //alert(JSON.stringify(itemarr));
            this.flag=0;
            this.itemflag=0;
            this.$.itemservice.itemwriteService(this.invoiceno,this.invoicedate,this.vno,this.vname,this.dname,this.dno,itemarr)
          }

        }
        //document.querySelectorAll("paper-input").readonly=true;
        //alert(this.querySelector("item-card"));
      }
      else{
        alert("Item already saved..!Click create to enter another invoice!");
      }

    },
    FnDeleteItem:function(e)
    {
      itemarr.splice(e.model.index,1);
      this.splice('itemArray',e.model.index,1);
      this.itemdes='deleted';
      this.qtyreceived='deleted';
      this.remark='deleted';
      this.flag=1;
      this.itemflag=1;
      //alert(JSON.stringify(itemarr));
    }
  });
})();
