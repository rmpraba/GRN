/**
 * Created by praba on 2/11/2016.
 */
Polymer({
  is: "vehicle-page",
  ready:function()
  {
    this.invoiceno=null;
    this.vehicleno=null;
    this.vehiclename=null;
    this.drivername=null;
    this.driverno=null;
  },
  FnVehicleInfoSubmit:function()
  {
    //this.$.invoice.validate();
    //this.$.vno.validate();
    if(this.invoiceno==null||this.invoiceno==""||this.vno==null||this.vno==""){
      alert("Vehicle no has to filled out!!")
    }
    else{
      document.querySelector('item-page').setVehicleinfo(this.invoiceno,this.vno,this.vname,this.dname,this.dno);
      document.querySelector('inwardslip-page').setPage('Item Detail');
    }
  }
});
