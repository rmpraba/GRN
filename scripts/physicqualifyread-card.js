/**
 * Created by praba on 2/12/2016.
 */
Polymer({is:"physicqualifyread-card",
  ready:function(){
    this.url=sessionStorage.getItem("curr_sess_url")+"physicqualify-card";

  },
  physicqualifyreadService:function(inwardregno){
    this.inwardno=inwardregno;

    var arg={"inwardregno":"","status":""};
    arg.inwardregno=inwardregno;

    arg.status=localStorage.getItem('curr_sess_expandstate');
    //alert(arg.inwardregno+"  "+arg.status);
    this.param=arg;
    this.url=sessionStorage.getItem("curr_sess_url")+"physicqualify-card";
    this.$.physicqualifyitemreadajax.generateRequest();
  },
  physicqualifyitemreadResponse:function(e)
  {
    var arr=e.detail.response;
    var commarr=[];
    var prodarr=[];
    for(var i=0;i<arr.length;i++)
    {
      var obj={"inwardno":"","inwarddate":"","ponumber":"","podate":"","supname":""};
      obj.inwardno=arr[i].inwardno;
      obj.inwarddate=arr[i].inwarddate;
      obj.ponumber=arr[i].ponumber;
      if(arr[i].ponumber!=null||arr[i].ponumber!="")
        this.potempreadflag=arr[i].ponumber;
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
      obj.qtyaccepted=arr[i].qtyaccepted;
      obj.remarks=arr[i].remarks;
      prodarr.push(obj);
    }
    this.mainArray=commarr;
    this.itemArray=prodarr;
    this.pono=this.potempreadflag;
    this.suppliername=commarr[0].supname;
  }
});
