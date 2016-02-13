/**
 * Created by praba on 2/13/2016.
 */
Polymer({
  is: "datepicker-card",
  ready:function()
  {
    this.showdate=moment(new Date()).format('L');
    localStorage.setItem("localsess_curr_inwarddate",this.showdate);
  },
  showDialog:function(){
    this.date=new Date();
    this.$.dialog.toggle();
  },
  dismissDialog:function(e){
    if (e.detail.confirmed) {
      var pickdate=moment(this.$.picker.date).format('L');
      var dd1=new Date();
      var dd2=new Date(pickdate);
      var days=parseInt((dd1 - dd2) / (1000 * 60 * 60 * 24));

      if(days>=0)
      {
        if(days>60)
          alert("You can add only recent entries within 60 days!");
        else{
          this.showdate = moment(this.$.picker.date).format('L');
          localStorage.setItem("localsess_curr_inwarddate",this.showdate);
          document.querySelector('physicqualify-card').setPodate();
        }
      }
      else
        alert("Date shouldn't exceed the run date!");
    }
  }

});
