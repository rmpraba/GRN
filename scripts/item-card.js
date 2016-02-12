/**
 * Created by praba on 2/12/2016.
 */
(function(){
  Polymer({is:"item-card",
    ready:function(){
      this.qtyreceived=null;
      this.comments="";
      this.unit;
    },
    setUnit:function(unit){
    },
    //Function Invoked when input changing in input fields
    FnInputChanged:function(e) {
      var currid="input"+localStorage.getItem("curr_sess_unitset");
      this.querySelector("#"+currid).value=localStorage.getItem("curr_sess_showunitvalue");
      this.qtyreceived=this.qtyreceived;
      this.$.qty.validate();
      this.remark=this.comments;
      //Setting info in localstorage to refer in item page
      localStorage.setItem("localsess_curr_qtyreceived",this.qtyreceived);
      localStorage.setItem("localsess_curr_remark",this.remark);
      //Binding info to the item page
      document.querySelector('item-page').setIteminfo(this.qtyreceived,this.remark);
    },
    setDefaultval:function(){
      this.qtyreceived="";
      this.remark="";
      document.querySelector('item-page').setIteminfo(this.qtyreceived,this.remark);
    }
  });
})();
