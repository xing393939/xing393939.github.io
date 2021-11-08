const path = require('path')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, 'main.js'),
  output: {
    path: path.resolve(__dirname, '../js'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new JavaScriptObfuscator({
      rotateUnicodeArray: true, // 必须为true
      compact: true, // 紧凑 从输出混淆代码中删除换行符。
      controlFlowFlattening: false, // 此选项极大地影响了运行速度降低1.5倍的性能。启用代码控制流展平。控制流扁平化是源代码的结构转换，阻碍了程序理解。
      controlFlowFlatteningThreshold: 0.8,
      deadCodeInjection: false, // 此选项大大增加了混淆代码的大小（最多200％）此功能将随机的死代码块（即：不会执行的代码）添加到混淆输出中，从而使得更难以进行反向工程设计。
      deadCodeInjectionThreshold: 0.5,
      debugProtection: false, // 调试保护，如果您打开开发者工具，可以冻结您的浏览器。 
      debugProtectionInterval: false, // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，这使得使用“开发人员工具”的其他功能变得更加困难。
      disableConsoleOutput: false, // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
      domainLock: ['xing393939.github.io'], // 锁定混淆的源代码，使其仅在特定域和/或子域上运行。这使得有人只需复制并粘贴源代码并在别处运行就变得非常困难。
      identifierNamesGenerator: 'mangled', // 使用此选项可控制标识符（变量名称，函数名称等）的混淆方式。
      identifiersPrefix: '', // 此选项使所有全局标识符都具有特定前缀。
      log: false,
      renameGlobals: false, // 不要启动 通过声明启用全局变量和函数名称的混淆。 
      reservedNames: [], // 禁用模糊处理和生成标识符，这些标识符与传递的RegExp模式匹配。例如，如果添加^someName，则混淆器将确保以someName开头的所有变量，函数名和函数参数都不会被破坏。
      reservedStrings: [], // 禁用字符串文字的转换，字符串文字与传递的RegExp模式匹配。例如，如果添加^some*string，则混淆器将确保以某些字符串开头的所有字符串都不会移动到`stringArray`。
      seed: 0, // 默认情况下（seed = 0），每次混淆代码时都会得到一个新结果（即：不同的变量名，插入stringArray的不同变量等）。如果需要可重复的结果，请将种子设置为特定的整数。
      selfDefending: false, // 此选项使输出代码能够抵抗格式化和变量重命名。如果试图在混淆代码上使用JavaScript美化器，代码将不再起作用，使得理解和修改它变得更加困难。需要紧凑代码设置。
      sourceMap: false, // 必须关闭。如果您希望或需要在生产中进行调试，可以将单独的源映射文件上载到秘密位置，然后将浏览器指向该位置。
      sourceMapBaseUrl: '', // 这会将源的源映射嵌入到混淆代码的结果中。如果您只想在计算机上进行本地调试，则非常有用。
      sourceMapMode: 'separate',
      stringArray: true, // 将stringArray数组移位固定和随机（在代码混淆时生成）的位置。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。
      stringArrayEncoding: ['base64', 'rc4'], // 此选项可能会略微降低脚本速度。使用Base64或RC4对stringArray的所有字符串文字进行编码，并插入一个特殊的函数，用于在运行时将其解码回来。
      stringArrayThreshold: 0.8, // 您可以使用此设置调整字符串文字将插入stringArray的概率（从0到1）。此设置在大型代码库中很有用，因为对stringArray函数的重复调用会降低代码的速度。
      target: 'browser', // 您可以将混淆代码的目标环境设置为以下之一：Browser、Browser No Eval、Node
      transformObjectKeys: false, // 混淆对象键。var a = {enabled：true}变成var a = {};a[_0x2ae0['0x0']=true;。理想情况下与String Array设置一起使用。
      unicodeEscapeSequence: false, // 字符串“Hello”将被转换为“\x48\x65\x6c”。
    }, ['ignoreFile.js']),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ],
  devServer: {
    publicPath: '/static/',
    compress: true,
    port: 8080
  }
}