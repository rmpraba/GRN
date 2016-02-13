/**
 * Created by praba on 2/13/2016.
 */
(function(){
  Polymer({is:"outwarditem-card",
    ready:function(){
      this.qtyreceived=null;
      this.comments="";
      this.unit;
    },
    setUnit:function(unit){
    },
    changed:function(e) {
      var currid1="input1"+localStorage.getItem("curr_sess_unitset");
      this.querySelector("#"+currid1).value=localStorage.getItem("curr_sess_showunitvalue");
      var currid="input"+localStorage.getItem("curr_sess_unitset");
      this.querySelector("#"+currid).value=localStorage.getItem("curr_sess_showmeasurevalue");
      //alert(localStorage.getItem("curr_sess_showunitvalue"));
      //alert(localStorage.getItem("curr_sess_showmeasurevalue"));
      this.quantity=this.quantity;
      this.weight=this.weight;
      this.$.quantity.validate();
      this.$.weight.validate();
      //localStorage.setItem("localsess_curr_qtyreceived",this.qtyreceived);
      //localStorage.setItem("localsess_curr_remark",this.remark);
      document.querySelector('outwarditem-page').setIteminfo(this.quantity,this.weight);
    },
    setDefaultval:function(){
      this.quantity="";
      this.weight="";
      document.querySelector('outwarditem-page').setIteminfo(this.quantity,this.weight);
    }
  });
})();
