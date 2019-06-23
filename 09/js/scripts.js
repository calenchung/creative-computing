// update content size
$(window).on('resize', function () {
    slideshows.each(function () {
      var slideshow = $(this),
          newWidth = 0;

      slideshow.find('.image-block').each(function (idx, elm) {
        newWidth += $(elm).width();
      });

      slideshow.find('.draggable').css({
        width: newWidth
      });
    });
  }).trigger('resize');
};

var setupFontSelect = function setupFontSelect() {
  $('.font-select select').on('change', function (e) {
    var newVal = $(this).val(),
        container = $(this).parents('.page-section');

    $(this).find('option').each(function (idx, elem) {
      var potentialVal = $(this).attr('value');
      container.removeClass(potentialVal);
    });

    container.addClass(newVal);
  });

  $('.weight-select select').on('change', function (e) {
    var newVal = 'weight-' + $(this).val(),
        container = $(this).parents('.page-section');

    $(this).find('option').each(function (idx, elem) {
      var potentialVal = 'weight-' + $(this).attr('value');
      container.removeClass(potentialVal);
    });

    container.addClass(newVal);
  });

  $('.font-size-select input').on('change input', function () {
    var newVal = $(this).val() + 'px',
        container = $(this).parents('.page-section');

    container.find('.typetester-output').css({
      fontSize: newVal
    });
  });

  $('.color-select .color-option').on('touchstart click', function (e) {
    e.preventDefault();
    var newVal = 'bg-' + $(this).attr('data-color'),
        container = $(this).parents('.page-section, .global-typetester');

    $(this).parents('.color-select').find('.color-option').each(function (idx, elem) {
      var potentialVal = 'bg-' + $(this).attr('data-color');
      container.removeClass(potentialVal);
    });

    container.addClass(newVal);
  });

  $('.global-typetester-link').on('touchstart click', function (e) {
    e.preventDefault();
    $('body').addClass('show-global-typetester');
  });

  $('.global-typetester .close-btn').on('touchstart click', function (e) {
    e.preventDefault();
    $('body').removeClass('show-global-typetester');
  });

  function placeCaretAtEnd(el) {
    var x = window.scrollX,
        y = window.scrollY;
    el.focus();
    window.scrollTo(x, y);
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  $('.page-section--typetester .typetester-output').each(function (idx, elem) {
    var myElement = $(elem)[0];

    var typeTesterWatcher = scrollMonitor.create(myElement);

    typeTesterWatcher.enterViewport(function () {
      if ($(window).width() >= 600) {
        placeCaretAtEnd($(elem)[0]);
      }
    });

    typeTesterWatcher.exitViewport(function () {
      $(elem).trigger('blur');
    });
  });
};
