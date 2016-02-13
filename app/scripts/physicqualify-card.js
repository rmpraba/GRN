/**
 * Created by praba on 2/12/2016.
 */
Polymer({is:"physicqualify-card",
  ready:function(){
    //Flag is setting to make PO read only and writable
    if(sessionStorage.getItem("curr_sess_roleflag")=="1"){
      this.read = false;
    }
    if(sessionStorage.getItem("curr_sess_roleflag")!="1"){
      this.read = true;
    }

    this.url=sessionStorage.getItem("curr_sess_url")+"physicqualify-card";

    /*if(this.pono!=""||this.pono!=null)
     alert("yes");
     else
     alert("no");*/
  },
  changed:function(e){
    //When PO changes changing flag
    localStorage.setItem("curr_sess_POchangeflag","1");
    localStorage.setItem("curr_sess_PONumber",this.pono);
    //this.ponumber=this.pono;
  },
  setPodate:function(){
    //alert('calling');
    //setting PO selection date
    this.podate=localStorage.getItem("localsess_curr_inwarddate");
    //alert(this.podate);
  },
  physicqualifyreadService:function(inwardregno){
    //fetches item info under the IRN corresponding to the user loggedin role

    this.inwardno=inwardregno;

    var arg={"inwardregno":"","status":""};
    arg.inwardregno=inwardregno;

    if(sessionStorage.getItem("curr_sess_roleflag")=="1"){
      arg.status=localStorage.getItem("curr_sess_currflowstatus");
    }
    if(sessionStorage.getItem("curr_sess_roleflag")=="2"){
      arg.status=localStorage.getItem("curr_sess_currflowstatus");
    }
    else if(sessionStorage.getItem("curr_sess_roleflag")=="3"){
      arg.status=localStorage.getItem("curr_sess_currflowstatus");
    }
    else if(sessionStorage.getItem("curr_sess_roleflag")=="4"){
      arg.status=localStorage.getItem("curr_sess_currflowstatus");
    }

    this.param=arg;
    this.url=sessionStorage.getItem("curr_sess_url")+"physicqualify-card";
    this.$.physicqualifyitemreadajax.generateRequest();
  },
  physicqualifyitemreadResponse:function(e)
  {
    //Response binding to the card
    var arr=e.detail.response;
    var commarr=[];
    var prodarr=[];
    var potempflag="";
    for(var i=0;i<arr.length;i++)
    {
      var obj={"inwardno":"","inwarddate":"","ponumber":"","podate":"","supname":""};
      obj.inwardno=arr[i].inwardno;
      obj.inwarddate=arr[i].inwarddate;
      obj.ponumber=arr[i].ponumber;
      if(arr[i].ponumber!=null||arr[i].ponumber!="")
        potempflag=arr[i].ponumber;
      obj.podate=arr[i].podate;
      obj.supname=arr[i].supname;
    }
    commarr.push(obj);
    for(var i=0;i<arr.length;i++)
    {
      var obj={"itemdes":"","qtyordered":"","qtyreceived":"","qtyaccepted":"","remarks":""};
      obj.itemdes=arr[i].itemdes;
      obj.qtyordered=arr[i].qtyordered;
      obj.qtyreceived=arr[i].qtyreceived;
      if(sessionStorage.getItem("curr_sess_roleflag")=="0"){
        obj.qtyaccepted=arr[i].qtyreceived;
      }
      if(sessionStorage.getItem("curr_sess_roleflag")!="0"){
        obj.qtyaccepted=arr[i].qtyaccepted;
      }
      obj.remarks=arr[i].remarks;
      prodarr.push(obj);
    }
    this.mainArray=commarr;
    this.itemArray=prodarr;
    this.pono=potempflag;
    this.ponumber=potempflag;
    localStorage.setItem("curr_sess_PONumber",potempflag);
    this.suppliername=commarr[0].supname;
    //alert(JSON.stringify(commarr));
    //alert(JSON.stringify(prodarr));
  }
});
