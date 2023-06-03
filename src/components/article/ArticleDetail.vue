<template>
	<div id="article-detail-box" class="box-wrap">
		<!-- 文章头部 -->
		<div id="article-detail-header" class="box-header">
			<!-- 标题 -->
			<div>
				<h2 style="margin: 10px 0px;">{{article.title}}</h2>
			</div>
			<!-- 基本信息 -->
			<div>
				<span v-if="article.user" class="info-item"><i class="icon el-icon-user"></i>{{article.user.nickName}}</span>
				<span class="info-item"><i class="icon el-icon-time"></i>{{article.createTime}}</span>
				<span class="info-item"><i class="icon el-icon-time"></i>{{article.updateTime}}</span>
				<span class="info-item"><i class="icon el-icon-view"></i>{{article.viewNum}}</span>
			</div>
		</div>
		<!-- 文章内容 -->
		<div class="article-detail-content">
			<div class="ql-editor" v-html="article.content"></div>
			<!-- <div class="ql-editor">
				<quill-editor class="info-editor" :options="options" v-model="article.content" ref="QuillEditor"></quill-editor>
			</div> -->
		</div>
	</div>
</template>

<script>
	import { fetchArticle } from '@/api/service.article'
	import { fetchUser } from '@/api/service.user'
	export default {
		name: 'ArticleDetail',
		data() {
			return {
				//帖子详情
				article: {
					id: '',
					userId: '',
					title: '',
					content: '',
					viewNum: '',
					commentNum: '',
					createTime: '',
					updateTime: '',
					user: ''
				}
			}
		},
		methods: {
			/**
			 * 获取帖子信息
			 * @param {Object} articleId
			 */
			handleArticleDetail(articleId){
				 fetchArticle(articleId).then(res => {
					if(res.code == '200'){
						this.article = res.data;
					}
				})
			}
		},
		mounted() {
			let articleId = this.$route.query.id;
			this.handleArticleDetail(articleId);
		},
	}
</script>

<style>
	.box-wrap{
		max-width: 60%;
		padding: 20px;
		margin: 20px auto;
		border-radius: 20px;
		border: 1px solid #409EFF;
	}
	.box-header{
		width: 100%;
		padding: 10px;
		border-bottom: 1px solid #dadada;
	}
	.icon {
		font-size: 14px;
		color: #888;
		margin-right: 5px;
	}
	.info-item{
		color: #888;
		font-size: 12px;
		margin-right: 40px;
	}
</style>