/**
 * Created by praba on 2/13/2016.
 */
Polymer({
  is: "customerinfo-page",
  ready:function()
  {
    this.customername=null;
    this.invoiceno=null;
    this.city=null;
    this.outtime=null;
  },
  setOutDate:function(date){
    this.outdate=date;
  },
  next:function()
  {
    this.$.invoiceno.validate()
    this.$.customername.validate()
    this.$.city.validate()
    //this.$.outtime.validate()
    if(this.invoiceno==null||this.invoiceno==""){
    }
    else{
      document.querySelector('outwarditem-page').setCustomerinfo(localStorage.getItem("localsess_curr_inwarddate"),localStorage.getItem("curr_sess_outwardtime"),this.customername,this.invoiceno,this.city);
      document.querySelector('outwardslip-page').setPage('Vehicle Info');
    }
  },
  _test:function()
  {
    this.$.invoiceno.validate()
    this.$.customername.validate()
    this.$.city.validate()
    this.$.outtime.validate()
    if(this.invoiceno==null||this.invoiceno==""){
    }
    else{
      document.querySelector('outwarditem-page').setCustomerinfo(localStorage.getItem("localsess_curr_inwarddate"),localStorage.getItem("curr_sess_outwardtime"),this.customername,this.invoiceno,this.city);
      document.querySelector('outwardslip-page').setPage('Vehicle Info');
    }
  }
});
