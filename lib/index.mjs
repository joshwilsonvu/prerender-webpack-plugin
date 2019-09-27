var e,t=require("tapable").SyncHook,r=(require("webpack"),require("webpack-node-externals")),n=(require("os"),require("path"),require("require-from-string")),i=require("webpack/lib/node/NodeTemplatePlugin"),o=require("webpack/lib/node/NodeTargetPlugin"),a=require("webpack/lib/LibraryTemplatePlugin"),s=require("webpack/lib/SingleEntryPlugin"),u=require("webpack/lib/MultiEntryPlugin");try{e=require("html-webpack-plugin")}catch(e){if(!(e instanceof Error)||"MODULE_NOT_FOUND"!==e.code)throw e}var c="PrerenderReactWebpackPlugin",p=function(e){void 0===e&&(e={}),this.chunks=e.chunks||[],this.assets=[],this.emit=e.emit||!1,this.hooks={prerendered:new t(["defaultExport"])}};p.prototype.apply=function(e){var t=this.makeHook.bind(this),r=this.emitHook.bind(this);e.hooks?(e.hooks.make.tapAsync(c,t),e.hooks.emit.tapPromise(c,r)):(e.plugin("make",t),e.plugin("emit",r))},p.prototype.makeHook=function(e,t){var n=e.compiler,s=n.options;this.prepareData(s.entry);var u={filename:"[name].prerender.js",futureEmitAssets:!0},p=(s.plugins||[]).filter(function(e){return/(MiniCssExtractPlugin|ExtractTextPlugin)/i.test(e.constructor.name)}),l=e.createChildCompiler("PrerenderReactChildCompiler",u,p);l.outputFileSystem=n.outputFileSystem,l.context=n.context,l.options.externals=(l.options.externals||[]).concat(r()),new i(u).apply(l),(new o).apply(l),new a(c,"commonjs2").apply(l),this.entryPlugins(l.context).apply(l),l.hooks.compilation.tap(c,function(e){e.cache&&(e.cache[c]||(e.cache[c]={}),e.cache=e.cache[c])}),l.runAsChild(function(e,r,n){t(e)})},p.prototype.emitHook=function(e){var t=this;return e.getStats().toJson(),Promise.all(this.data.map(function(r){var i=r.chunk,o=r.asset,a=e.getAsset(o);if(a){if(!t.emit){var s,u=a.source.source();try{s=n(u)}catch(t){return void e.errors.push(t)}if(!s||!s.default)return void e.errors.push(new Error("Missing default export from prerendered chunk "+i));var c=s.default;return"function"==typeof c&&(c=c()),Promise.resolve(c).then(function(r){console.log(r),delete e.assets[o],t.hooks.prerendered.call(r)})}}else e.errors.push(new Error("Asset "+o+" not found."))}))},p.prototype.hwpHook=function(t){e&&e.getHooks?e.getHooks(t).beforeAssetTagGeneration.tap(c,function(e,t){var r=self.processTag.bind(self,hwpCompilation);e.assetTags.scripts.filter(util.filterTag).forEach(r),e.assetTags.styles.filter(util.filterTag).forEach(r),t(null,e)}):t.hooks.htmlWebpackPluginAlterAssetTags&&t.hooks.htmlWebpackPluginBeforeHtmlGeneration&&t.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(c,beforeHtmlGeneration)},p.prototype.prepareData=function(e){var t=this;"string"==typeof e||Array.isArray(e)?this.data=[{chunk:"main",asset:"main.prerender.js",entry:e}]:(this.data=Object.keys(e).map(function(t){return{chunk:t,asset:t+".prerender.js",entry:e[t]}}),Array.isArray(this.chunks)&&this.chunks.length&&(this.data=this.data.filter(function(e){return-1!==t.chunks.indexOf(e.chunk)})))},p.prototype.entryPlugins=function(e){var t=this.data.map(function(t){var r=t.chunk,n=t.entry;return new(Array.isArray(n)?u:s)(e,n,r)});return{apply:function(e){t.forEach(function(t){return t.apply(e)})}}},module.exports=p;
//# sourceMappingURL=index.mjs.map