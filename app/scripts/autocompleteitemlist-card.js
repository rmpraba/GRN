/**
 * Created by praba on 2/12/2016.
 */
//JS file for the autocompleteitemlist page
(function() {
  this.val="";
  var item=[];
  Polymer({is:"autocompleteitemlist-card",
    ready:function(){
      if(localStorage.getItem("curr_sess_wardflag")!="1")
      this.url="../../config/items.json";
      if(localStorage.getItem("curr_sess_wardflag")=="1")
      this.url="../../config/outwarditems.json";
      this.itemval="";
      this.unit="";
      this.measure="";
      //Initially hiding dropdown list
      this.querySelector('paper-listbox').style.visibility='hidden';
    },
    //Funtion invokes when selecting item in dropdown
    FnItemSelected:function(e){
      //Condition to bind when no item found
      if(e.target.selectedItem.textContent.trim()!="No items found") {
        this.value = e.target.selectedItem.textContent.trim();
        //To extract the unit of the item dynamically according to the item selection in list
        if (localStorage.getItem("curr_sess_wardflag") != "1") {

        for (var i = 0; i < item.length; i++) {
          if (item[i].name == this.value)
            this.unit = item[i].unit;
        }
        //Binding values to the item page value and unit
        document.querySelector('item-page').setMenuinfo(this.value, this.unit);
      }
        if(localStorage.getItem("curr_sess_wardflag")=="1") {
          for (var i = 0; i < item.length; i++) {
            if (item[i].name == this.value) {
              this.unit = item[i].unit;
              this.measure = item[i].measure;
            }
          }
          document.querySelector('outwarditem-page').setMenuinfo(this.value, this.unit, this.measure);
        }

      }
      else{
        alert("Please choose valid item...");
        this.value="";
      }
      this.querySelector('paper-listbox').style.visibility='hidden';
      this.querySelector('paper-listbox').selected=-1;
      this.itemArray="";
    },
    //Function invokes when item value changes in input box to show the relevent items
    FnInputChanged:function(e){
      var arr=[];
      this.querySelector('paper-listbox').style.visibility='visible';
      if(e.keyCode==8){
        var len=(this.value).length;
        if(len<=1){
          this.querySelector('paper-listbox').style.visibility='hidden';
          this.itemArray="";
          this.itemval="";
        }
        if(len>1){
          this.querySelector('paper-listbox').style.visibility='visible';
          var backsubval=((this.value).substring(0,(len-1))).trim();
          for(var i=0;i<item.length;i++)
          {
            var subval=((item[i].name).trim()).substring(0,backsubval.length);
            if(subval==backsubval)
            {
              var obj={"itemdes":""};
              obj.itemdes=item[i].name;
              arr.push(obj);
            }
          }
          this.itemArray=arr;
        }
      }
      if(e.keyCode!=8){
        this.itemval = this.itemval +String.fromCharCode((e.keyCode+32));
        if(this.itemval.length>0)
        {
          for(var i=0;i<item.length;i++){
            var subval=((item[i].name).trim()).substring(0,this.itemval.length);

            if(subval==this.itemval)
            {
              var obj={"itemdes":""};
              obj.itemdes=item[i].name;
              arr.push(obj);
            }
          }
          if(arr.length>0)
            this.itemArray=arr;
          else
          {
            var obj={"itemdes":""};
            obj.itemdes="No items found";
            arr.push(obj);
            this.itemArray=arr;
          }
        }
      }
    },
    //Fetches and binding to the auto complete dropdown list dynamically
    itemlistreadResponse:function(e)
    {
      //var arr=e.detail.response;
      //alert(e.detail.response);
      item=e.detail.response.items;
      //alert(JSON.stringify(item[0].name));
    },
    setDefaultval:function(){
      this.value="";
      document.querySelector('item-page').setItemdes(this.value);
    }
  });
})();
