// svgo.config.js
export default {
  plugins: [
    // remove unnecessary metadata and attributes
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'mergeStyles',
    'inlineStyles',
    'minifyStyles',
    'convertStyleToAttrs',
    'cleanupEnableBackground',
    'convertColors',
    'removeUselessDefs',
    'removeEmptyAttrs',
    'removeEmptyText',
    'removeEmptyContainers',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    'cleanupNumericValues',
    'convertPathData',
    'convertTransform',
    'removeDimensions',   // allows responsive SVGs (keep viewBox only)
    {
      name: 'removeAttrs',
      params: { attrs: '(stroke|fill)' } // optional: strip hardcoded colors
    }
  ]
}
