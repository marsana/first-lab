var prefix = window.location.pathname;
if(prefix[prefix.length-1] == '/')
  prefix = prefix.slice(0, prefix.length-1);
function changeHashWithoutScrolling(hash) {
  var id = hash.replace(/^.*#/, ''),
      elem = document.getElementById(id)
  elem.id = id+'-tmp'
  window.location.hash = hash
  elem.id = id
}

locationOne = function() {
  if(e.keyCode == 8){
    if(location){
      console.log($(location  ));
      setTimeout(function() {
        var idtop = $('.what').offset().top-200;
        $(window).scrollTop(idtop);
        setTimeout(function() {
          $(location).trigger( "click" );
          $(window).trigger('scroll');
        }, 1000);
      }, 100);
    }
  }
}
