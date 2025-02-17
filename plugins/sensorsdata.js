import sensors from '/public/sensors/sensorsdata.es6.min.js'

export default defineNuxtPlugin(() => {
  let serverUrl = ''
  if (
    process.env.NODE_ENV === 'testing' ||
    process.env.NODE_ENV === 'development'
  ) {
    serverUrl =
      'https://api-dev.crealitycloud.cn/api/rest/bicollector/front/sa/data'
  }
  if (process.env.NODE_ENV === 'prepro') {
    serverUrl =
      'https://pre.crealitycloud.cn/api/rest/bicollector/front/sa/data'
  }
  if (process.env.NODE_ENV === 'preint') {
    serverUrl =
      'https://pre.crealitycloud.com/api/rest/bicollector/front/sa/data'
  }
  if (process.env.NODE_ENV === 'production') {
    serverUrl =
      'https://www.crealitycloud.cn/api/rest/bicollector/front/sa/data'
  }
  if (process.env.NODE_ENV === 'international') {
    serverUrl =
      'https://www.crealitycloud.com/api/rest/bicollector/front/sa/data'
  }
  if (!serverUrl) return
  window.sensors = sensors
  sensors.init({
    server_url: serverUrl,
    // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
    is_track_single_page: true,
    use_client_time: true,
    send_type: 'beacon',
    show_log: false,
    heatmap: {
      // 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
      clickmap: 'default',
      // 是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
      scroll_notice_map: 'default'
    }
  })
  sensors.quick('autoTrack')
})