import tooltipDirective from './EH-Tooltip.js';
import './EH-Tooltip.css';

export default {
  install(app) {
    app.directive('eh_tooltip', tooltipDirective);
  }
};
