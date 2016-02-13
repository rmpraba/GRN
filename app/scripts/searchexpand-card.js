/**
 * Created by praba on 2/13/2016.
 */
Polymer({is:"searchexpand-card",
  ready:function(){

    this.url=sessionStorage.getItem("curr_sess_url")+"searchexpand-card";

  },
  searchreadService:function(inwardregno){
    this.inwardno=inwardregno;

    var arg={"inwardregno":""};
    arg.inwardregno=inwardregno;

    this.param=arg;
    this.url=sessionStorage.getItem("curr_sess_url")+"searchexpand-card";
    this.$.searchitemreadajax.generateRequest();
  },
  searchitemreadResponse:function(e)
  {
    var arr=e.detail.response.itemarr;
    //alert(JSON.stringify(arr));
    var state=e.detail.response.state;
    var stateno=e.detail.response.statecount;
    //alert(JSON.stringify(e.detail.response.state));
    //alert(JSON.stringify(e.detail.response.statecount));

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
      if(arr[i].state==state){
        obj.itemdes=arr[i].itemdes;
        obj.qtyordered=arr[i].qtyordered;
        obj.qtyreceived=arr[i].qtyreceived;
        obj.qtyaccepted=arr[i].qtyaccepted;
        obj.remarks=arr[i].remarks;
        prodarr.push(obj);
      }
    }
    this.mainArray=commarr;
    this.itemArray=prodarr;
    //document.querySelector('grnflow-card').setSearchflowState(state,stateno);
    //this.pono=potempflag;
    //this.ponumber=potempflag;
    //localStorage.setItem("curr_sess_PONumber",potempflag);
    //this.suppliername=commarr[0].supname;
    //alert(JSON.stringify(commarr));
    //alert(JSON.stringify(prodarr));
  }
});
