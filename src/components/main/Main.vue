<template>
	<div class="main-container">
		<el-row :gutter="40">
			<!-- 文章列表 -->
			<el-col :xs="20" :sm="18" :md="18">
				<!-- 文章容器 -->
				<el-card v-for="(item,index) in articleList" :key="index" @click.native="toArticleDetail(item.id)">
					<div class="main-box" :style="index % 2 == 1 ? 'flex-direction: row-reverse;': ''">
				    <div class="image-box" v-show="item.id !==''">
							<img class="image-box" src="@/assets/wrapper/wrapper_1.jpg"/>
				      <!-- <img v-if="item.imageList.length > 0":src="item.imageList[0].imageUrl" style="width: 100%;"/> -->
				    </div>
						<div class="content-box">
							<div class="box-title">
							  <h3>{{ item.title }}</h3>
							</div>
							<div class="box-description">
							  <span v-html="item.content"></span>
							</div>
							<div class="box-bottom-info">
							  <div v-if="item.umsUser">
									<i class="el-icon-user-solid"/> {{ item.umsUser.nickName }}
								</div>
							  <div>发布日期: <i class="el-icon-time"></i>{{ item.createTime | timeDataFormat }}</div>
							  <div v-if="item.updateTime">最后修改: <i class="el-icon-time"></i>{{ item.updateTime | timeDataFormat }}</div>
							  <!-- 用来展示评论数量 -->
							  <!-- <div><i class="el-icon-chat-dot-square"></i>5条</div> -->
							  <!-- 展示查看数量  -->
							  <div><i class="el-icon-view"></i> {{ item.viewNum }}</div> 
							  <!-- 展示文章类型 -->
							  <div class="type_tag" style="font-size:14px;color:green"><i class="el-icon-price-tag"></i>{{ item.labelList }}</div>
							</div>
						</div>
				    <div style="width:100%;min-height:300px;text-align:center;" v-show="item.id === ''">
				      <img src="../../assets/404.jpg" alt="404 not found" width="200" height="250"/>
				    </div>
				  </div>
				</el-card>
				<!-- 分页区 -->
				<div class="pagination">
				  <el-pagination
				    @size-change="handleSizeChange"
				    @current-change="handleCurrentChange"
				    :current-page="queryInfo.pageNum"
				    :page-sizes="[20, 30, 40, 50]"
				    :page-size="queryInfo.pageSize"
				    layout="total, sizes, prev, pager, next, jumper"
				    :total="queryInfo.total">
				  </el-pagination>
				</div>
			</el-col>
			<!-- 辅助插件 -->
			<el-col :xs="4" :sm="6" :md="5">
				<!-- 天气插件 -->
				<!-- <WeatherComponent></WeatherComponent> -->
				<!-- 标签容器 -->
				<LabelComponent></LabelComponent>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import { fetchList } from '@/api/service.article'
import LabelComponent from '@/components/article/LabelComponent.vue'
import WeatherComponent from '@/components/article/WeatherComponent.vue'
export default {
  data() {
    return {
      articleList: [],
      // 图片
      image: '',
      // 获取帖子参数对象
      queryInfo: {
        // 文章分类
        tag: '',
        // 搜索提交参数
        query: '',
        // 当前的页数（控制分页）
        pageNum: 0,
        // 每页显示多少条数据
        pageSize: 20,
				// 总数
				total: 0,
      },
    }
  },
	components: {
		LabelComponent: LabelComponent,
		WeatherComponent: WeatherComponent
	},
  created() {
    const params = this.$route.params
    this.$set(this.queryInfo, 'query', params.keyWords || '')
    this.$set(this.queryInfo, 'tag', params.tag || '')
    this.getBlogs()
    // this.getImage()
    this.isScroll()
  },
  filters: {
    // 格式化时间,保留年月日
    timeDataFormat(str) {
      // 将字符串转换为Date格式
      let mt = new Date(str);
      //获取年份
      let year = mt.getFullYear();
      //从0开始 获取月份 padStart(2,'0') 头部补全,列如 01,02...,11,12
      let month = (mt.getMonth() + 1).toString().padStart(2,'0');
      // 获取天数
      let day = mt.getDate().toString().padStart(2,'0');
      return `${year}-${month}-${day}`;
    }
  },
  methods: {
    // 获取博客内容
    async getBlogs() {
      fetchList(this.queryInfo).then(res => {
				if(res.code == 200){
					this.articleList = res.data.records
					this.queryInfo.total = res.data.total
					this.queryInfo.pageNum = res.data.current
					this.queryInfo.pageSize = res.data.size
					if (this.queryInfo.tag !== '') {
					  this.queryInfo.query = ''
					} else if (this.queryInfo.query !== '') {
					  this.queryInfo.tag = ''
					}
				}
				
			})
    },
    // 监听 page-size 改变事件
    handleSizeChange(newsize) {
      this.queryInfo.pageSize = newsize
      // 当改变每页显示的数量时，页码重新回到第一页
      this.queryInfo.pageNum = 0
      this.getBlogs()
    },
    // 监听页码值对的改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getBlogs()
    },
    // 页面跳转
    toArticleDetail(id) {
			debugger
      // this.$router.push('/BlogPage');
      //this.$router.push({name:'BlogPage', query: { blog_id: id }})
			this.$router.push({name:'ArticleDetail', query: { id: id }})
      // 用于记录查看帖子次数
      // this.$http.get('countViews.php',{ params: {blog_id: id} })
    },
    // getImage() {
    //   // 获取远程图片
    //   this.$http.get('BingImages.php').then(res => {
    //     const {imgUrl, desc} = res?.data || {};
    //     this.image = imgUrl;
    //     this.desc = desc;
    //   }).catch(()=> {
    //     this.image = require('../../assets/bg.jpg');
    //   })
    // },
    isScroll() {
      // 在搜索 和 选择分类时触发
      const isScroll =  window.sessionStorage.getItem('scroll')
      if (isScroll) {
        //在PC端,进入该页面时向下滚动当前可视窗体高度, 如果移动端,则不进行操作
        if (!/(Android|iPhone|iPad|iOS|webOS|BlackBerry)/i.test(navigator.userAgent)) {
          let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          document.documentElement.scrollTop = windowHeight
          window.sessionStorage.removeItem('scroll')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
	.el-row {
		display: flex;
		justify-content: center;
	}
 .el-card {	
		margin-bottom: 20px;
		border-radius: 20px;
		display: flex;
		transition: all 0.3s;
		//内容主体样式
		.main-box {
			height: 180px;
			display: flex;
			align-items: center;
			cursor: pointer;
			//图片样式
			.image-box {
				img {
					width: 300px;
					height: 100%;
					border-radius: 20px;
				}
			}		
			//内容样式
			.content-box {
				width: 100%;
				height: 100%;
				margin-left: 20px;
				
				.box-description {
					font-size: 14px;
					margin: 10px 0px;
					height: 100px;
					overflow-y: hidden;
				}
				
				.box-bottom-info {
					color: #888;
					font-size: 12px;
					display: flex;
					
					div {
						margin-right: 40px;
					}
				}
			}
		}
  }
	.pagination {
		float: right;
	}
	
	
	//悬浮样式
	.el-card:hover {
		.box-title {
			color: #409eff;
		}
		box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.2);
		transform: translate(0, -5px);
	}
</style>
