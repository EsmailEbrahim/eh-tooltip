function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

var tooltipDirective = {
  mounted: function mounted(el, binding) {
    var tooltipEl = null;
    var hideTimeout = null;
    var spacing = 10;
    var openedByClick = false;
    var options = _typeof(binding.value) === 'object' ? binding.value : {
      text: binding.value
    };
    var _options$text = options.text,
      text = _options$text === void 0 ? '' : _options$text,
      _options$location = options.location,
      location = _options$location === void 0 ? null : _options$location,
      _options$clickable = options.clickable,
      clickable = _options$clickable === void 0 ? false : _options$clickable,
      _options$html = options.html,
      html = _options$html === void 0 ? false : _options$html,
      _options$background = options.background,
      background = _options$background === void 0 ? null : _options$background,
      _options$textColor = options.textColor,
      textColor = _options$textColor === void 0 ? null : _options$textColor,
      _options$borderColor = options.borderColor,
      borderColor = _options$borderColor === void 0 ? null : _options$borderColor,
      _options$darkMode = options.darkMode,
      darkMode = _options$darkMode === void 0 ? false : _options$darkMode,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? '8px' : _options$padding,
      _options$borderRadius = options.borderRadius,
      borderRadius = _options$borderRadius === void 0 ? '4px' : _options$borderRadius,
      _options$maxWidth = options.maxWidth,
      maxWidth = _options$maxWidth === void 0 ? '300px' : _options$maxWidth;
    function createTooltip() {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'tooltip-content';
      tooltipEl.innerHTML = html ? text : "<pre>".concat(text, "</pre>");
      tooltipEl.style.position = 'fixed';
      tooltipEl.style.opacity = '0';
      tooltipEl.style.transition = 'opacity 0.2s ease';
      tooltipEl.style.pointerEvents = clickable ? 'auto' : 'none';
      tooltipEl.style.backgroundColor = background;
      tooltipEl.style.color = textColor;
      tooltipEl.style.borderColor = borderColor;
      tooltipEl.style.padding = padding;
      tooltipEl.style.borderRadius = borderRadius;
      tooltipEl.style.maxWidth = maxWidth;
      if (darkMode) tooltipEl.classList.add('dark');
      document.body.appendChild(tooltipEl);
    }
    function removeTooltip() {
      if (tooltipEl && tooltipEl.parentNode) {
        tooltipEl.parentNode.removeChild(tooltipEl);
        tooltipEl = null;
      }
    }
    function updatePosition(event) {
      if (!tooltipEl) return;
      var _window = window,
        viewportWidth = _window.innerWidth,
        viewportHeight = _window.innerHeight;
      var tooltipWidth = tooltipEl.offsetWidth;
      var tooltipHeight = tooltipEl.offsetHeight;
      var top, left;
      if (location) {
        var rect = el.getBoundingClientRect();
        switch (location) {
          case 'top':
            top = rect.top - tooltipHeight - spacing;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'bottom':
            top = rect.bottom + spacing;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.left - tooltipWidth - spacing;
            break;
          case 'right':
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.right + spacing;
            break;
          case 'top-left':
            top = rect.top - tooltipHeight - spacing;
            left = rect.left;
            break;
          case 'top-right':
            top = rect.top - tooltipHeight - spacing;
            left = rect.right - tooltipWidth;
            break;
          case 'bottom-left':
            top = rect.bottom + spacing;
            left = rect.left;
            break;
          case 'bottom-right':
            top = rect.bottom + spacing;
            left = rect.right - tooltipWidth;
            break;
          default:
            top = event.clientY + spacing;
            left = event.clientX + spacing;
            break;
        }
        top = Math.max(spacing, Math.min(top, viewportHeight - tooltipHeight - spacing));
        left = Math.max(spacing, Math.min(left, viewportWidth - tooltipWidth - spacing));
      } else {
        top = event.clientY + spacing;
        left = event.clientX + spacing;
        if (event.clientY + tooltipHeight + spacing > viewportHeight) {
          top = event.clientY - tooltipHeight - spacing;
        }
        if (event.clientX + tooltipWidth + spacing > viewportWidth) {
          left = event.clientX - tooltipWidth - spacing;
        }
      }
      tooltipEl.style.top = "".concat(top, "px");
      tooltipEl.style.left = "".concat(left, "px");
      tooltipEl.style.opacity = '1';
    }
    function showTooltip(event) {
      clearTimeout(hideTimeout);
      if (!tooltipEl) {
        createTooltip();
      }
      updatePosition(event);
    }
    function hideTooltip() {
      if (!clickable || !openedByClick) {
        hideTimeout = setTimeout(function () {
          if (tooltipEl) {
            tooltipEl.style.opacity = '0';
            removeTooltip();
          }
        }, 50);
      }
    }
    function onClick(event) {
      clearTimeout(hideTimeout);
      if (tooltipEl) {
        removeTooltip();
        openedByClick = false;
      } else {
        openedByClick = true;
        showTooltip(event);
      }
    }
    function onMouseEnter(event) {
      if (!openedByClick) {
        showTooltip(event);
      }
    }
    function onMouseLeave() {
      if (!openedByClick) {
        hideTooltip();
      }
    }
    function onMouseMove(event) {
      if (!location && !openedByClick) {
        updatePosition(event);
      }
    }
    function onClickOutside(event) {
      if (clickable && tooltipEl && !el.contains(event.target) && !tooltipEl.contains(event.target)) {
        removeTooltip();
        openedByClick = false;
      }
    }
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mousemove', onMouseMove);
    if (clickable) {
      el.addEventListener('click', onClick);
      document.addEventListener('click', onClickOutside);
    }
    el._tooltipCleanup = function () {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mousemove', onMouseMove);
      if (clickable) {
        el.removeEventListener('click', onClick);
        document.removeEventListener('click', onClickOutside);
      }
      removeTooltip();
    };
  },
  updated: function updated(el, binding) {
    var options = _typeof(binding.value) === 'object' ? binding.value : {
      text: binding.value
    };
    var _options$text2 = options.text,
      text = _options$text2 === void 0 ? '' : _options$text2,
      _options$html2 = options.html,
      html = _options$html2 === void 0 ? false : _options$html2;
    var tooltipEl = document.querySelector('.tooltip-content');
    if (tooltipEl) {
      tooltipEl.innerHTML = html ? text : "<pre>".concat(text, "</pre>");
    }
  },
  unmounted: function unmounted(el) {
    el._tooltipCleanup && el._tooltipCleanup();
  }
};

var index = {
  install: function install(app) {
    app.directive('eh_tooltip', tooltipDirective);
  }
};

export { index as default };
