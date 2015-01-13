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

      $(".people-hover-active").removeClass("people-hover-active")
      $(elem).addClass("people-hover-active");
      a = $(elem).index(); // записать номер позиции человека
      $textDiv = $('.peopleAboutItem').eq(a);
      infoheight = $textDiv.outerHeight(); // узнать высоту описания соответствующую данному человеку
    },
    OpenText: function(elem){
      elemCurr = $(elem);
      $(self.place) // крайний элемент в строке выбранного элемента
        .nextAll('.people-item')
          .animate({
            'margin-top': margin + infoheight
          },
          timeAnimation);

      setTimeout(function(){
        $textDiv // соответствующий блок с тектом
          .css({
            'top': elemCurr.offset().top + elemCurr.outerHeight() + margin,
            'width' : $('.people-wrapper').width()
          })
          .addClass('activeItemPerson');
      }, timeAnimation*2);
    },
    events: {
      click: function() {
        var self = this,
            margin = 15;


        self.elem.on( 'click' , function() {
          // на данный момент self - это объект, а currElem - блок по которому был клик
          currElem = this;

          // cнять класс с ховером
          $('.people-item').removeClass('people-hover');

          $(".people-hover-active").removeClass("people-hover-active")
          setTimeout(function(){


            // когда это случится выполнить:

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
              $textDiv.removeClass('activeItemPerson');
              setTimeout(function() {
                $('.filter-item').nextAll().css('margin-top', margin);
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
              //возвращать класс с ховером!

            }

            $('.people-item').addClass('people-hover');
          }, 300);

        })



      },
      resize: function() {
        var self = this;
        $(window).resize(function() {
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
