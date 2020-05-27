import renderPretty from './renderPretty';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

export default (tree, format) => {
  switch (format) {
    case 'PLAIN':
      return renderPlain(tree);
    case 'JSON':
      return renderJson(tree);
    default:
      return renderPretty(tree);
  }
};
