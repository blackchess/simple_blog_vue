<template>
	<div>
		<div id="scroll_top" onclick="window.scrollTo(0,0);">返回顶部</div>
		<el-container>
			<!-- 标题展示 -->
			<div class="header-container">
				<!-- 头部 -->
				<el-header>
					<div>
						<!-- <img src="../assets/blog_header.png" alt="" style="border-radius: 50px;"/> -->
						<span style="color: #DDDDDD;">Simple Blog</span>
						<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect"
							background-color="transparent" text-color="#46b07c" active-text-color="#ffd04b" style="margin: 0px 20px;">
							<el-menu-item index="1">首页</el-menu-item>
							<el-menu-item index="2">文章专栏</el-menu-item>
							<el-menu-item index="3">照片集</el-menu-item>
						</el-menu>
					</div>
					<div>
						<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="query" clearable
							@change="goMainPage"/>
						<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect"
							background-color="transparent" text-color="#46b07c" active-text-color="#ffd04b">
							<el-submenu index="3">
								<template slot="title">
									<el-avatar :src="require('@/assets/blog_header.png')" />
								</template>
								<el-menu-item index="4"><i class="el-icon-mail"></i>消息</el-menu-item>
								<el-menu-item index="5"><i class="el-icon-star"></i>收藏</el-menu-item>
								<el-menu-item index="6"><i class="el-icon-user"></i>个人中心</el-menu-item>
							</el-submenu>
						</el-menu>
					</div>
				</el-header>
				<!-- 座右铭 -->
				<span class="header-brief">{{ str }}</span>
			</div>
			<!--主体-->
			<el-main>
				<div class="main-container">
					<!-- 路由占位符 -->
					<keep-alive>
						<router-view v-if="$route.meta.keepAlive" />
						<!-- 这里是会被缓存的视图(即不刷新) -->
					</keep-alive>
					<router-view v-if="!$route.meta.keepAlive" />
					<!-- 这里是不会被缓存的视图 -->
				</div>
			</el-main>
			<!--底部  -->
			<el-footer>
				<!-- <span><a href="http://beian.miit.gov.cn" target="_blank"
						style="color: black">网站备案/许可证号：桂ICP备19010475号-1</a></span> -->
			</el-footer>
		</el-container>
		<!-- 登录弹窗 -->
		<!-- <el-dialog width="400px" :visible.sync="centerDialogVisible">
			<LoginComponent></LoginComponent>
		</el-dialog> -->

	</div>
</template>
<script>
	import {
		fetchLabel
	} from '@/api/service.article'
	import LoginComponent from '@/components/login/LoginComponent'
	export default {
		components: {
			LoginComponent: LoginComponent
		},
		data() {
			return {
				image: '',
				desc: '',
				tagList: [],
				query: '',
				activeIndex: '1',
				swichThem: true,
				centerDialogVisible: false,
				random: Math.floor(Math.random() * 7),
				mottos: [{
						zh: '愿你保持初心和善良,笑里尽是温暖与坦荡。',
						en: 'May you keep your original heart and kindness, and smile with warmth and magnanimity.',
					},
					{
						zh: '年轻就是无限的可能。',
						en: 'Youth means limitless possibilities.',
					},
					{
						zh: '真正的梦就是现实的彼岸。',
						en: 'Real dream is the other shore of reality.',
					},
					{
						zh: '不为模糊不清的未来担忧，只为清清楚楚的现在努力。',
						en: "Don't worry about the vague future, just strive for the clear present.",
					},
					{
						zh: '与其装腔作势企图影响别人，不如咬牙切齿狠命修理自己。',
						en: "Rather than pretending to influence others, it's better to grind your teeth and repair yourself.",
					},
					{
						zh: '上天是公平的，只要努力就会有收获，否则就是你不够努力。',
						en: 'God is fair, as long as effort will include results, otherwise is you hard enough.',
					},
					{
						zh: '人生没有后悔，我们只能尽力去不让自己后悔。',
						en: 'Life without regret, we can only do our best to not to regret.',
					},
				],
				str: '',
				strLen: 0,
				stop: null,
			}
		},
		created() {
			// 清空后台侧边栏被激活的链接地址
			window.sessionStorage.removeItem('activePath')
			// this.getTag()
			// this.getImage()
			this.stop = setInterval(()=>{
					this.strPrint()
			}, 150)
		},
		methods: {
			// 逐字打印
			strPrint() {
				this.str += this.mottos[this.random].zh.charAt(this.strLen)
				this.strLen++
				if (this.strLen == this.mottos[this.random].zh.length) {
					clearTimeout(this.stop)
				}
			},
			// 获取分类标签
			getTag() {
				fetchLabel().then(res => {
					if (res.code == 200 && res.data) {
						this.tagList = res.data.list;
					}
				})
			},
			// 发帖
			// add() {
			// 	this.$router.push('/Edit')
			// },
			// 后台管理页面
			goAdmin() {
				this.$router.push('/Admin')
			},
			goAbout() {
				// 跳转到锚点 anchor
				// location.hash = '#anchor'
				this.$router.push('/About')
			},
			goGitee() {
				this.$router.push('/Gitee')
			},
			handleSelect(index, indexPath) {
				if (index == 1) {
					// location.hash = '#anchor'
					this.$router.push('/')
				}
				if (indexPath[0] == 2) {
					window.sessionStorage.setItem('scroll', 'roll')
					// 点击分类重新刷新 Main 视图
					this.$route.meta.keepAlive = false
					this.$router.replace({
						name: 'Edit'
					}).then((res) => {
						this.$router.replace({
							name: 'Main',
							params: {
								tag: indexPath[1]
							}
						})
					})
				}
			},
			goMainPage() {
				window.sessionStorage.setItem('scroll', 'roll')
				this.$route.meta.keepAlive = false
				this.$router.replace({
					name: 'Edit'
				}).then((res) => {
					this.$router.replace({
						name: 'Main',
						params: {
							keyWords: this.query
						}
					})
				})
			},
			getImage() {
				// 获取远程图片
				this.$http.get('BingImages.php').then((res) => {
					const {
						imgUrl,
						desc
					} = res?.data || {};
					this.image = imgUrl;
					this.desc = desc;
				}).catch(() => {
					this.image = require('../assets/bg.jpg');
				})
			},
		},
	}
</script>
<style scoped>
	
	.header-container {
		width: 100%;
		height: 500px;
		background-image: url(../assets/wrapper/wrapper_1.jpg);
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.header-container .header-brief {
		position: relative;
		left: 50px;
		top: 100px;
		color: #FFF;
	}
	
	/deep/ .el-dialog {
		border-radius: 10px;
	}
	/* 返回顶部 */
	#scroll_top {
		padding: 5px 10px;
		text-align: center;
		border-top-left-radius: 5px;
		font-size: 12px;
		background-color: #333;
		color: #ccc;
		opacity: 0.8;
		position: fixed;
		right: 0;
		bottom: 0;
		cursor: pointer;
		z-index: 1000;
	}

	/* 移动端 */
	@media screen and (max-width: 639px) {
		.el-header {
			position: -webkit-sticky;
			position: sticky;
			top: 0;
			z-index: 999;
			display: flex;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.8);
			justify-content: space-between;
			align-items: center;
			/* background-color: #666; */
			padding-left: 0;
		}

		.isShow {
			display: none;
		}

		.el-header div {
			display: flex;
			padding: 5px;
			justify-content: space-around;
			align-items: center;
			margin: 0px;
		}

		.el-header img {
			display: none;
			height: 50px;
			width: 50px;
			margin-right: 1px;
		}

		.el-header span {
			display: none;
		}

		.el-menu {
			display: flex;
			justify-content: space-around;
			border-style: none;
		}

		.web-bg {
			position: relative;
			display: flex;
			width: 100%;
			min-height: 100%;
			z-index: -10;
		}

		.web-bg img {
			width: 100%;
			height: 100%;
		}

		.el-main {
			margin: 0px;
			padding: 0px;
		}

		.show-info {
			position: absolute;
			display: flex;
			width: 100%;
			height: 100%;
			flex-wrap: wrap;
			justify-content: center;
			align-content: center;
			color: aliceblue;
			/* padding: 10px; */
			padding-top: 5%;
		}

		.show-info .show-message {
			position: relative;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
			height: 70%;
		}

		.show-info h1 {
			/* 设置字体间距 */
			letter-spacing: 3px;
			font-size: 17px;
		}

		.show-info .desc {
			font-size: 13px;
			width: 100%;
			text-align: center;
		}

		.show-info .current {
			display: none;
			position: absolute;
			font-size: 30px;
			padding-left: 27%;
			bottom: 0;

			animation-name: bounce;
			animation-duration: 3s;
			animation-iteration-count: infinite;
		}

		@keyframes bounce {
			0% {
				bottom: 0px;
			}

			50% {
				bottom: 20px;
			}
		}

		/* .edit {
    display: none;
    display: flex;
    margin-top: 20px;
    margin-right: 90px;
    justify-content: flex-end;
  } */
		.el-input {
			padding: 0px 3px 0px 3px;
			width: 150px;
			height: 45px;
			font-size: 13px;
		}
	}

	/*适应pad端*/
	@media screen and (min-width: 640px) and (max-width: 1024px) {
		.el-header {
			min-height: 60px;
			position: -webkit-sticky;
			position: sticky;
			top: 0;
			z-index: 999;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			/* background-color: #666; */
			padding-left: 0;
		}

		.isShow {
			display: none;
		}

		.el-header div {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin: 0px;
		}

		.el-header img {
			display: inline-block;
			height: 40px;
			width: 40px;
			transform: translateX(10px);
		}

		.el-header span {
			display: none;
			font-size: 18px;
			transform: translateX(20px);
		}

		.el-menu {
			display: flex;
			justify-content: space-between;
			border-style: none;
			padding: 5px;
		}

		.el-menu-item {
			font-size: 20px;
		}

		.web-bg {
			position: relative;
			display: flex;
			width: 100%;
			min-height: 100%;
			z-index: -10;
		}

		.web-bg img {
			width: 100%;
			height: 100%;
		}

		.el-main {
			margin: 0px;
			padding: 0px;
		}

		.show-info {
			position: absolute;
			display: flex;
			width: 100%;
			height: 100%;
			flex-wrap: wrap;
			justify-content: center;
			align-content: center;
			color: aliceblue;
			padding-top: 5%;
		}

		.show-info .show-message {
			position: relative;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
			height: 70%;
			padding: 10px;
			font-size: 20px;
		}

		.show-info .desc {
			font-size: 14px;
			width: 100%;
			text-align: center;
		}

		.show-info h1 {
			/* 设置字体间距 */
			letter-spacing: 3px;
			font-size: 23px;
		}

		.show-info .current {
			display: none;
			position: absolute;
			font-size: 20px;
			padding-left: 27%;
			bottom: 0;
		}

		.el-input {
			/* padding: 0px 3px 0px 3px; */
			width: 50%;
			height: 45px;
			font-size: 20px;
		}

		.el-footer {
			font-size: 20px;
		}

		#scroll_top {
			font-size: 17px;
		}
	}

	/*适应PC端*/
	@media screen and (min-width: 1025px) {
		.el-header {
			position: -webkit-sticky;
			position: sticky;
			top: 0;
			z-index: 999;
			display: flex;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.3);
			justify-content: space-between;
			align-items: center;
			/* background-color: #666; */
		}

		.el-header div {
			display: flex;
			align-items: center;
			margin: 10px;
		}

		.el-header img {
			height: 50px;
			width: 50px;
			margin-right: 5px;
		}

		.el-menu {
			border-style: none;
		}

		.web-bg {
			position: relative;
			display: flex;
			width: 100%;
			min-height: 100%;
			z-index: -10;
		}

		.web-bg img {
			width: 100%;
			height: 100%;
		}

		.el-main {
			margin: 0;
			padding: 0;
		}

		.show-info {
			position: absolute;
			display: flex;
			width: 100%;
			height: 100%;
			justify-content: center;
			color: aliceblue;
			align-items: center;
		}

		.show-info .show-message {
			position: relative;
			min-height: 300px;
			min-width: 300px;
			justify-content: center;
			align-items: center;
		}

		.show-info h1 {
			/* 设置字体间距 */
			letter-spacing: 5px;
		}

		.show-info .desc {
			font-size: 15px;
			width: 100%;
			text-align: center;
		}

		.show-info .current {
			position: absolute;
			font-size: 30px;
			left: 47%;
			bottom: 0;

			animation-name: bounce;
			animation-duration: 3s;
			animation-iteration-count: infinite;
		}

		@keyframes bounce {
			0% {
				bottom: 0px;
			}

			50% {
				bottom: 20px;
			}
		}

		.edit {
			display: flex;
			margin-top: 20px;
			margin-right: 90px;
			justify-content: flex-end;
		}

		.el-input {
			width: 300px;
			height: 45px;
		}
	}

	.el-footer {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		min-height: 5%;
		margin-top: 15vh;
		background: rgb(233, 230, 230);
	}

	a {
		text-decoration: none;
	}
	
	/**
	 * 主体样式
	 */
	.main-container {
		margin: 40px auto;
		max-width: 1500px;
	}
</style>
