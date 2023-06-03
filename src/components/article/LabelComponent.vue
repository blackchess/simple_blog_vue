<template>
	<div>
		<el-card>
			<ul class="label-box">
				<li class="label-item" v-for="item in labelList" @click="handleToArticleList(item.id)">{{item.name}}</li>
			</ul>
		</el-card>
	</div>
</template>

<script>
	import {fetchLabel} from '@/api/service.article'
	export default {
		data() {
			return {
				labelList: []
			}
		},
		methods: {
			/**
			 * 获取标签信息
			 */
			handleLabelList(){
				fetchLabel().then(res => {
					if(res.code == 200 && res.data){
						this.labelList = res.data.list;
					}
				})
			},
			/**
			 * 跳转该分类的文章列表
			 * @param {Object} labelId	标签ID
			 */
			handleToArticleList(labelId){
				this.$router.push({path: '/Main',query: {labelId: labelId}})
			}
		},
		created() {
			this.handleLabelList();
		}
	}
</script>

<style lang="less" scoped>
	.el-card {
		font-size: 14px;
		border-radius: 20px;
		
		.label-item {
			margin: 5px 10px;
			padding: 10px;
			cursor: pointer;
			display: inline-block;
			border-radius: 10px;
			transition: all 0.3s; 
		}
		
		.label-item:hover {
			box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.2);
			transform: translate(0, -5px);
		}
		
		.active {
			color: #409eff;
		}
	}
	
	
</style>