export default {
    mounted(el, binding) {
        let tooltipEl = null;
        let hideTimeout = null;
        const spacing = 10;
        let openedByClick = false;

        const options = typeof binding.value === 'object' ? binding.value : { text: binding.value };
        const {
            text = '',
            location = null,
            clickable = false,
            html = false,
            background = null,
            textColor = null,
            borderColor = null,
            darkMode = false,
            padding = '8px',
            borderRadius = '4px',
            maxWidth = '300px'
        } = options;

        function createTooltip() {
            tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip-content';
            tooltipEl.innerHTML = html ? text : `<pre>${text}</pre>`;
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
            const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
            const tooltipWidth = tooltipEl.offsetWidth;
            const tooltipHeight = tooltipEl.offsetHeight;
            let top, left;

            if (location) {
                const rect = el.getBoundingClientRect();
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
            tooltipEl.style.top = `${top}px`;
            tooltipEl.style.left = `${left}px`;
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
                hideTimeout = setTimeout(() => {
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

        el._tooltipCleanup = () => {
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

    updated(el, binding) {
        const options = typeof binding.value === 'object' ? binding.value : { text: binding.value };
        const { text = '', html = false } = options;
        
        const tooltipEl = document.querySelector('.tooltip-content');
        if (tooltipEl) {
          tooltipEl.innerHTML = html ? text : `<pre>${text}</pre>`;
        }
    },

    unmounted(el) {
        el._tooltipCleanup && el._tooltipCleanup();
    },
};