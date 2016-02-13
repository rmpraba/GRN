/**
 * Created by praba on 2/13/2016.
 */
(function() {

  Polymer({
    is: "outwarditem-service",
    ready:function()
    {
      this.length=0;
      this.no=0;
      this.sequrl=sessionStorage.getItem("curr_sess_url")+"outwardseq-service";
      this.outwardurl=sessionStorage.getItem("curr_sess_url")+"outwarditem-service";
    },
    seqitemwriteService:function(itemarr){
      this.items=[];
      this.items=itemarr;
      this.length=this.items.length;
      this.$.seqitemwriteAjax.generateRequest();
    },
    outwarditemwriteResponse:function(e)
    {

      if(e.detail.response.inwardregno!='not okay')
        this.no=this.no+1;
      if(this.no==this.length){
        localStorage.setItem("curr_sess_saveflag","true");
        alert("Invoice Stored: "+e.detail.response.outwardregno);
      }
    },
    seqitemwriteResponse:function(e)
    {
      //alert(e.detail.response);
      if(e.detail.response.returnval=="succ"){
        for(var i=0;i<this.items.length;i++){
          var obj={"outdate":"","outtime":"","customername":"","invoiceno":"","city":"","vehicleno":"","transportname":"","drivername":"","driverno":"","ownername":"","ownerphone":"","panno":"","quantity":"","unit":"","itemdes":"","weight":""};
          obj.outdate=this.items[i].outdate;
          obj.outtime=this.items[i].outtime;
          obj.customername=this.items[i].customername;
          obj.invoiceno=this.items[i].invoiceno;
          obj.city=this.items[i].city;
          obj.vehicleno=this.items[i].vehicleno;
          obj.transportname=this.items[i].transportname;
          obj.drivername=this.items[i].drivername;
          obj.driverno=this.items[i].driverno;
          obj.ownername=this.items[i].ownername;
          obj.ownerphone=this.items[i].ownerphone;
          obj.panno=this.items[i].panno;
          obj.itemdes=this.items[i].itemdes;
          obj.unit=this.items[i].unit;
          obj.quantity=this.items[i].quantity;
          obj.weight=this.items[i].weight;
          this.params=obj;
          this.$.outwarditemwriteAjax.generateRequest();
        }
      }


    }
  });
})();
