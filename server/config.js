const CONF = {
  port: '80',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wxf0ff970938d7d84a',

  // 微信小程序 App Secret
  appSecret: 'e3a89f6a2e2f533f66b74bc98af8348d',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: true,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: '172.17.0.8',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: 'BBBBBEINNbee1z',
    char: 'utf8mb4'
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'ap-shanghai',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: ''
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: 'abcdefgh',
  qcloudAppId: '1255795663',
  qcloudSecretId: 'AKIDBgCiP81XnDeK64oBLWoSG5vngWPvDAwp',
  qcloudSecretKey: 'vhhjhYSSK1bJ81zsbNFwroq7L62oOmLE',
  serverHost: "64507181.song001sam.xyz",
  authServerUrl: "http://10.104.175.21/mina_auth/",
  tunnelServerUrl: "https://64507181.ws.qcloud.la",
  tunnelSignatureKey: "27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89",
  networkTimeout: 30000
}

module.exports = CONF