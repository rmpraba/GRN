/**
 * Created by praba on 2/12/2016.
 */
Polymer({is:"physicqualifyitem-card",
  ready:function(){

    this.url=sessionStorage.getItem("curr_sess_url")+"physicqualifyitem-card";

  },
  save:function(){
    //alert(this.ponumber)
    this.msg="Enter no's only";
    if(this.qtyaccepted>this.qtyreceived){
      this.msg="Error";
      this.querySelector('#'+this.inwardno).validate();
      this.qtyaccepted="";
      alert("Accepted quantity greater than received quantity!");
    }
    else{
      if((this.ponumber==null||this.ponumber=="")&&(localStorage.getItem("curr_sess_POchangeflag")!=1))
      {
        alert("PO number should be filled out!");
      }
      else
      {
        this.podate=localStorage.getItem("localsess_curr_inwarddate");
        this.ponumber=localStorage.getItem("curr_sess_PONumber");
        if(sessionStorage.getItem("curr_sess_roleflag")=="1"){
          this.status=localStorage.getItem("curr_sess_currflowstatus");
          this.newstatus=localStorage.getItem("curr_sess_currflownewstatus");
        }
        if(sessionStorage.getItem("curr_sess_roleflag")=="2"){
          this.status=localStorage.getItem("curr_sess_currflowstatus");
          this.newstatus=localStorage.getItem("curr_sess_currflownewstatus");
        }
        else if(sessionStorage.getItem("curr_sess_roleflag")=="3"){
          this.status=localStorage.getItem("curr_sess_currflowstatus");
          this.newstatus=localStorage.getItem("curr_sess_currflownewstatus");
        }
        else if(sessionStorage.getItem("curr_sess_roleflag")=="4"){
          this.status=localStorage.getItem("curr_sess_currflowstatus");
          this.newstatus=localStorage.getItem("curr_sess_currflownewstatus");
        }
        //alert(this.status+" "+this.newstatus);
        this.$.form.submit();
      }

    }
  },
  Response:function(e)
  {
    alert(e.detail.response.flag);
  }
});
