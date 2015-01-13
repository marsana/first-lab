;(function($, window, document, undefined){
  var Person = {
    init: function( options, elem ) {
      var self = this;
      self.options = $.extend( {}, $.fn.isPerson.options, options );
      self.elem = $( elem );
      self.elemTop = parseInt($( elem ).css('top'));
      self.events.click.call( self );
    },
    searchRow: function() {
      var self = this;
      if(parseInt(self.elem.next().css('top')) > self.elemTop) {
        self.place = self.elem;
        self.textTop = parseInt(self.elem.next().css('top'))
      }
      else
      {
        self.elem.nextAll().each(function(){
          if(parseInt($(this).next().css('top')) > self.elemTop) {
            self.place = $( this );
            self.textTop = parseInt($(this).next().css('top'))
            return false;
          }
        });
      }
      if (self.place === undefined){
        self.place = self.elem.parent().children().last();
        self.textTop = parseInt(self.place.css('top')) + self.place.height() + 20;
      }
    },
    beforeAll: function() { //close
      $('.peopleAbouteOpen').hide().html('');
      this.elem
        .removeClass(this.options.white)
        .removeClass(this.options.active)
        .removeClass(this.options.down)
        .siblings()
          .removeClass(this.options.white)
          .removeClass(this.options.active)
          .removeClass(this.options.down);
    },
    beforeChange: function() {
      $('.peopleAbouteOpen').hide().html('');
      this.elem
        .addClass(this.options.active)
        .siblings()
          .addClass(this.options.white);
    },
    placeText: function() {
      var a = this.elem.hasClass(this.options.active)
      this.beforeAll();
      if (!a) {
        this.beforeChange();
        this.searchRow();
        this.indexItem = $( "div" ).index( this.elem ) - 20;
        console.log(this.indexItem);
        // var d = $('.peopleAboute').children();

        var htmlEl = $('.peopleAboute').find('div').eq(this.indexItem).html();
        console.log(this.textTop);
        $('.peopleAbouteOpen')
          .insertAfter( this.place )
          .css({
            'top' : this.textTop
          })
          .html(htmlEl)
          .show();
        this.place.nextAll().addClass(this.options.down);
        var b = ($('.people').offset().top + this.textTop) - ($(window).height()/2 - $('.personAbout').height());
        $('html,body').animate({scrollTop: b }, 500);
      }
    },
    events: {
      click: function() {
        var self = this;
        self.elem.on( 'click' , function() {
          if ($(this).hasClass('activeItemPerson')) {
            self.beforeAll();
          }
          else {
            self.beforeAll();
            self.placeText();
          }
        })
      }
    }
  }
  $.fn.isPerson = function( options ) {
    return this.each( function() {
      var person = Object.create( Person );
      person.init( options, this );
    });
  };
  $.fn.isPerson.options = {
    white: 'whiteItem',
    active: 'activeItemPerson',
    down: '__down'
  };
})(jQuery, window, document);
