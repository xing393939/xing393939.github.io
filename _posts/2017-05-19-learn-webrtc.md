---
layout: post
title: WebRTC 入门学习
category: 技术
---

### 参考资料

1. [H5直播起航](https://aotu.io/notes/2016/10/09/HTML5-SopCast/)
1. [使用 WebRTC 构建简单的前端视频通讯](https://segmentfault.com/a/1190000005864228)
1. [H5视频直播扫盲 - AlloyTeam](http://www.alloyteam.com/2016/05/h5-camera-literacy/)
1. [使用 WebSockets 进行 HTML5 视频直播 - SegmentFault](https://segmentfault.com/a/1190000000392586)
1. [WebRTC to RTMP - Google 网上论坛](https://groups.google.com/forum/#!msg/kurento/EmVoXwoP4Nw/GfRAiV5IBQAJ)
1. [Streaming: transcode WebRTC stream to RTMP stream · Issue](https://github.com/foobarlab/UpStage-Video-Hack/issues/117)
1. [GitHub - WebRTC code samples](https://github.com/webrtc/samples)
1. [WebRTC in the real world: STUN, TURN and signaling](https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/) 
1. [WebRTC - High Performance Browser Networking](https://hpbn.co/webrtc/)
1. [WebRTC学习资料大全](http://blog.csdn.net/foruok/article/details/53005728)
1. [通过WebRTC实现实时视频通信（一）](http://www.gbtags.com/gb/share/3909.htm)
1. [使用WebRTC搭建前端视频聊天室——信令篇](http://www.html-js.com/article/WebRTC-related-to-the-use-of-WebRTC-to-build-a-frontend-video-chat-rooms--signaling-article)
1. [WebRtc 探索](https://github.com/wenghengcong/WebRtcExplore)
1. [HTML5 视频直播（三）](https://imququ.com/post/html5-live-player-3.html)

### WebRTC 简介

WebRTC 的介绍可以看官方文档 [Real time communication with WebRTC](https://codelabs.developers.google.com/codelabs/webrtc-web/)。简单来说 WebRTC 是浏览器到浏览器（点对点）之间的通信，但并不意味着 WebRTC 不需要服务器。以甲和乙通讯为例，它的通讯流程如下：

1. 甲通过信号服务器得到乙的客户端信息；
1. 如果可以直连就直连（一般是在同一个局域网内），否则用 STUN 服务器判断甲和乙能否用 NAT 穿透来连接，不能的话则采用 TURN 服务器中转；
1. 甲和乙进行语音或者数据通讯。

所以甲和乙的连接方式有三种，见下图：
![](/static/image/201706-webrtc-connection-types.jpg)

甲和乙建立连接的几次会话过程中具体信息的描述，可以参考这篇文章：[Anatomy of a WebRTC SDP](https://webrtchacks.com/sdp-anatomy/)。

信号服务器只是用于甲乙建立连接之前交换甲和乙的连接信息，搭建信号服务器可以使用开源的 [PeerServer](https://github.com/peers/peerjs-server)。搭建 STUN 服务器可以用 [node-stun-server](https://github.com/enobufs/stun)。TURN 服务器的搭建可以参考这篇文章：[stun&turn部署](http://www.cnblogs.com/lingyunhu/p/4084669.html)。

Chrome 对每个 Tab 允许连接的终端数有限制，最多 256 个。也就是说理论上使用 WebRTC 来进行视频会议，最多只能支持 256 人，更不用说使用 WebRTC 来做视频直播了。[WebRTC为什么不能做直播平台](http://www.jianshu.com/p/11de091cfd0b)这篇文章有更详尽的解释。

WebRTC 的优点可以观看这个视频：[基于 WebRTC 的跨平台实时语音通信解决方案](http://edu.csdn.net/course/detail/320)，例如自动适应网络环境让音质优美、不说话时生成静音包减小数据包大小等等。

WebRTC 的开发有两个方向，一个是基于浏览器，一个是基于 C 层面的移植开发，可以实现安卓、IOS 跨平台。本文只要介绍的是基于浏览器的 WebRTC 开发。浏览器对 WebRTC 的支持可以见 [Can I use WebRTC](http://caniuse.com/#search=webrtc)。

### 检测 STUN 服务器是否在正常运行

网上有很多公开的 STUN 服务器很多要么是国外的访问不稳定，要么是已经失效了，初期学 WebRTC 的时候容易在这里掉坑。我写了一个 [Demo](https://cdn.rawgit.com/xing393939/webrtc-samples/master/static/check_stun_server.html) 来检测 STUN 服务器是否在正常运行。

### 查看甲和乙当前连接方式

前面说到甲和乙的连接方式有三种：直连、STUN 和 TURN。当甲和乙建立连接后，如何查看甲和乙当前连接方式呢？

Chrome 地址栏输入 chrome://webrtc-internals，Firefox 地址栏输入 about:webrtc，可以查看当前 WebRTC 的几个连接信息。以 Chrome 为例，要查看甲和乙当前连接方式，在 chrome://webrtc-internals 页找到此连接的 Tab，在右侧的 Stats Tables 下找到粗体字的类似 Conn-audio-1-0 的信息，googRemoteCandidateType 为 local 则说明是直连，stun 则为 STUN 方式，relay 则为 TURN 服务器转发。下图的就是 STUN 的连接方式：

![](/static/image/20170613_stun.png)

关于查看甲和乙当前连接方式还可以参考下面的文章：

1. [How do you find the current active connection in webrtc-internals?](https://testrtc.com/find-webrtc-active-connection/)
1. [How do I get information about the type of connection of a WebRTC PeerConnection?](https://stackoverflow.com/questions/27230542/how-do-i-get-information-about-the-type-of-connection-of-a-webrtc-peerconnection)
1. [how do you verify if the call was host to host, srflx or relay/turn](https://github.com/andyet/SimpleWebRTC/issues/347)
1. [WebRTC: Determine the chosen ICE candidate](https://stackoverflow.com/questions/28977679/webrtc-determine-the-chosen-ice-candidate)
1. [WebRTC Connectivity Woes and You](https://xirsys.com/webrtc-connectivity-woes-and-you/)

### NAT 穿透技术简介

在现实 Internet 网络环境中，大多数计算机主机都位于防火墙或 NAT 之后，只有少部分主机能够直接接入 Internet。很多时候，我们希望网络中的两台主机能够直接进行通信，即所谓的 P2P 通信，而不需要其他公共服务器的中转。由于主机可能位于防火墙或 NAT 之后，在进行 P2P 通信之前，我们需要进行检测以确认它们之间能否进行 P2P 通信以及如何通信。这种技术通常称为 NAT 穿透（NAT Traversal）。最常见的 NAT 穿透是基于 UDP 的技术，如 RFC3489 中定义的 STUN 协议。TURN 与 STUN 的共同点都是通过修改应用层中的私网地址达到 NAT 穿透的效果，异同点是 TURN 是通过两方通讯的“中间人”方式实现穿透。详细的可以参考：[ STUN 和 TURN 技术浅析](http://www.h3c.com.cn/MiniSite/Technology_Circle/Net_Reptile/The_Five/Home/Catalog/201206/747038_97665_0.htm)和[NAT 的四种类型及类型检测](http://www.cnblogs.com/my_life/articles/1908552.html)。

### 两个 Demo

第一个 Demo，用[主播端](https://cdn.rawgit.com/xing393939/webrtc-samples/master/static/push.html)获取摄像头视频流创建直播，[播放端](https://cdn.rawgit.com/xing393939/webrtc-samples/master/static/play.html)和主播端建立连接并接收直播流播放。

第二个 Demo 是一个[ 8 人视频会议](https://cdn.rawgit.com/xing393939/webrtc-samples/master/static/room_chat.html)。

所有代码已经托管在[ Github ](https://github.com/xing393939/webrtc-samples)上了。






















