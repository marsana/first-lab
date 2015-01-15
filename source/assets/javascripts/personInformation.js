// отчаяние

;(function($, window, document, undefined){
            var b = 1, lastElem, timeAnimation = 300;
  var Person = {
    init: function( options, elem ) {
      var self = this;
      self.options = $.extend( {}, $.fn.isPerson.options, options );
      self.elem = $( elem );
      self.elemTop = parseInt($( elem ).css('top'));
      self.events.click.call( self );
      self.events.resize.call( self );
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
    openrows: function(){},
    closerows: function(){},
    openinfo: function(){},
    beforeOpenText: function(elem){
      self = this;
      self.searchRow();

      $(elem).addClass("people-hover-active");
      a = $(elem).index(); // записать номер позиции человека
      $allTextDiv = $('.peopleAboutItem');
      $textDiv = $('.peopleAboutItem').eq(a);
      infoheight = $textDiv.outerHeight(); // узнать высоту описания соответствующую данному человеку
    },
    OpenText: function(elem){
      elemCurr = $(elem);
      $(self.place) // крайний элемент в строке выбранного элемента
        .nextAll('.people-item')
          .stop()
          .animate({
            'margin-top': margin + infoheight
          },
          timeAnimation);

      setTimeout(function(){
        $textDiv // соответствующий блок с тектом
          .css({
            'top': elemCurr.offset().top + elemCurr.outerHeight() + margin,
            'display' : 'block'
          });
          setTimeout(function(){ $textDiv.addClass('activeItemPerson') }, timeAnimation);
      }, timeAnimation*3);
    },
    events: {
      click: function() {
        var self = this,
            margin = 15;


        self.elem.on( 'click' , function() {
          // на данный момент self - это объект, а currElem - блок по которому был клик
          currElem = this;

          $(".people-hover-active").removeClass("people-hover-active")

          setTimeout(function(){

            // если это первый клик
            if (b == 1) {

              self.beforeOpenText(currElem);
              // открыть:
                // раздвинуть строку
                // когда строка будет раздвинута - проявить тект
              self.OpenText(currElem);

              // приравнять b к 2
              b = 2;
              // назначить последним элементом данный
              lastElem = currElem;
            }
            // иначе - клик второй
            else {

              // спрятать текст в любом случае
              // схлопнуть строку
              $allTextDiv.removeClass('activeItemPerson');
              // $('.people-item').addClass('people-hover');
              setTimeout(function() {
                $('.filter-item').nextAll().css('margin-top', margin);
                $allTextDiv.css('display', 'none');
              }, timeAnimation);
              setTimeout(function() {
              // если клик по новому пользователю
                if (lastElem !== currElem) {

                    self.beforeOpenText(currElem);

                  // открыть:
                    // раздвинуть строку
                    // когда строка будет раздвинута - проявить тект

                    self.OpenText(currElem);



                  b = 2;
                  lastElem = currElem;
                }

                // иначе - все персонажи были закрыты
                else {
                  b = 1;
                  lastElem = 0;
                }
              }, timeAnimation);
            }

          }, 300);

        })



      },
      resize: function() {
        var self = this;
        $('.peopleAboutItem').css('width', $('.people-wrapper').width());
        console.log($('.peopleAboutItem').width())
        $(window).resize(function() {
          $('.peopleAboutItem').css('width', $('.people-wrapper').width());
          self.elemTop = parseInt($( self.elem ).css('top'));
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
