/**
 * Created by praba on 2/12/2016.
 */
/*JS page for item-service component*/

(function() {

  Polymer({
    is: "item-service",
    ready:function()
    {
      this.length=0;
      this.no=0;
      this.url=sessionStorage.getItem("curr_sess_url")+"itemsave-service";
      this.url1=sessionStorage.getItem("curr_sess_url")+"inwardregnoseq-service";
    },
    //Method it will pass req to the server to insert vehicle info and generating seq no
    itemwriteService:function(invoiceno,invoicedate,vno,vname,dname,dno,itemarr){
      this.items=[];
      this.items=itemarr;
      this.length=this.items.length;
      var vobj={"invoiceno":"","invoicedate":"","vehno":"","vehname":"","drivername":"","driverno":""};
      vobj.invoiceno=invoiceno;
      vobj.invoicedate=invoicedate;
      vobj.vehno=vno;
      vobj.vehname=vname;
      vobj.drivername=dname;
      vobj.driverno=dno;
      this.params1=vobj;
      //alert(JSON.stringify(vobj));
      this.$.itemwriteAjax1.generateRequest();
    },
    //Inward item save response received and showing reg no to the user
    itemwriteResponse:function(e)
    {
      if(e.detail.response.inwardregno!='not okay')
        this.no=this.no+1;
      if(this.no==this.length){
        localStorage.setItem("curr_sess_saveflag","true");
        alert("Invoice Stored: "+e.detail.response.inwardregno);
      }
    },
    //Response received for inward seq creation req on successful creation it will call itemsave request to the server
    itemwriteResponse1:function(e)
    {
      //alert(e.detail.response);
      //Sending row by row of item info to the server
      if(e.detail.response.returnval=="succ"){
        for(var i=0;i<this.items.length;i++){
          var obj={"invoiceno":"","invoicedate":"","supplier":"","itemdes":"","qtyreceived":"","remark":"","unit":""};
          obj.invoiceno=this.items[i].invoiceno;
          obj.invoicedate=this.items[i].invoicedate;
          obj.supplier=this.items[i].supplier;
          obj.itemdes=this.items[i].itemdes;
          obj.qtyreceived=this.items[i].qtyreceive;
          obj.unit=this.items[i].unit;
          obj.remark=this.items[i].remark;
          this.params=obj;
          this.$.itemwriteAjax.generateRequest();
        }
      }
      //if inward no is already exists it will revert the message
      else if(e.detail.response.returnval=="exists"){
        alert("Invoice already exist....Create new invoice...!");
      }
    }
  });
})();
