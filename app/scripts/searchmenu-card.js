/**
 * Created by praba on 2/13/2016.
 */
Polymer({is:"searchmenu-card",
  ready:function(){
  },
  irnsearch:function(e){
    this.$.gs.searchService(this.irn,"","","");
  },
  invoicesearch:function(e){
    this.$.gs.searchService("",this.invoice,"","");
  },
  itemsearch:function(e){
    this.$.gs.searchService("","",this.item,"");
  }
});
