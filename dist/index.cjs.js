'use strict';

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
    var description, location, clickable;
    if (typeof binding.value === 'string') {
      description = binding.value;
      location = null;
      clickable = false;
    } else if (_typeof(binding.value) === 'object') {
      description = binding.value.description;
      location = binding.value.location || null;
      clickable = binding.value.clickable || false;
    } else {
      description = '';
      location = null;
      clickable = false;
    }
    function createTooltip() {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'tooltip-content';
      tooltipEl.innerHTML = "<pre>".concat(description, "</pre>");
      tooltipEl.style.position = 'fixed';
      tooltipEl.style.opacity = '0';
      tooltipEl.style.transition = 'opacity 0.2s ease';
      tooltipEl.style.pointerEvents = clickable ? 'auto' : 'none';
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
    var newDescription;
    if (typeof binding.value === 'string') {
      newDescription = binding.value;
    } else if (_typeof(binding.value) === 'object') {
      newDescription = binding.value.description;
    }
    var tooltipEl = document.querySelector('.tooltip-content');
    if (tooltipEl) {
      tooltipEl.innerHTML = "<pre>".concat(newDescription, "</pre>");
    }
  },
  unmounted: function unmounted(el) {
    el._tooltipCleanup && el._tooltipCleanup();
  }
};

var index = {
  install: function install(app) {
    app.directive('tooltip', tooltipDirective);
  }
};

module.exports = index;
