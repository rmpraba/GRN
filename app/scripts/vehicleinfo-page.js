/**
 * Created by praba on 2/13/2016.
 */
Polymer({
  is: "vehicleinfo-page",
  ready:function()
  {
    this.vehicleno=null;
    this.transportname=null;
    this.drivername=null;
    this.driverno=null;
    this.ownername=null;
    this.ownerphone=null;
    this.panno=null;
  },
  next:function()
  {
    this.$.vehicleno.validate()
    this.$.transportname.validate()
    this.$.ownername.validate()
    this.$.ownerphone.validate()
    this.$.panno.validate()
    if(this.panno==null||this.panno==""){
    }
    else{
      document.querySelector('outwarditem-page').setVehicleinfo(this.vehicleno,this.transportname,this.drivername,this.driverno,this.ownername,this.ownerphone,this.panno);
      document.querySelector('outwardslip-page').setPage('Item Detail');
    }
  },
  _test:function()
  {
    this.$.invoice.validate()
    this.$.vno.validate()
    //this.$.vname.validate()
    //this.$.dname.validate()
    //this.$.dno.validate()
    if(this.invoiceno==null||this.invoiceno==""||this.vno==null||this.vno==""){
      //alert("Invoice no should be filled out");
    }
    else{
      document.querySelector('item-page').setVehicleinfo(this.invoiceno,this.vno,this.vname,this.dname,this.dno);
      document.querySelector('inwardslip-page').setPage('Item Detail');
    }
  }
});
