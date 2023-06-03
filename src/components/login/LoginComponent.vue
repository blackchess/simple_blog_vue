<template>
	<div class="login_box">
		<!-- 登录方式标签 -->
		<el-tabs>
			<el-tab-pane label="免密登录">
				<el-form ref="messageFormRef" :model="loginForm" :rules="messageFormRules">
					<el-form-item prop="phoneNum">
						<el-input v-model="loginForm.phoneNum" placeholder="手机号/邮箱" prefix-icon="el-icon-user"></el-input>
					</el-form-item>
					<el-form-item prop="code">
						<el-input v-model="loginForm.code" placeholder="验证码" prefix-icon="el-icon-user">
							<template slot="append">
								<el-button id="sendCodeBtn" @click="handleGetCheckCode()" :disabled="checkDisable">
									{{limitTime == 0 ? "获取验证码": limitTime+"后重新获取"}}
								</el-button>
							</template>
						</el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="密码登录">
				<el-form ref="passwordFormRef" :model="loginForm" :rules="loginFormRules">
					<!-- 用户名 -->
					<el-form-item prop="account">
						<el-input v-model="loginForm.account" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item prop="password">
						<el-input v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock"
							type="password" @keydown.enter.native="login"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="扫码登录">
				
			</el-tab-pane>
		</el-tabs>
		<div>
			<el-link type="primary" style="margin-bottom: 15px;">立即注册</el-link>
			<el-link type="primary" style="margin-bottom: 15px; float: right;">忘记密码?</el-link>
			<el-button type="primary" @click="login" style="width: 100%;">登 录</el-button>
		</div>
	</div>

</template>

<script>
	import { signIn, signOut, fetchCheckCode } from '@/api/service.user'
	import {
		setToken
	} from '@/utils/auth'
	export default {
		data() {
			return {
				// 表单数据绑定
				loginForm: {
					account: '',
					password: '',
					phoneNum: '',
					centerDialogVisible: true,
					mode: '1'
				},
				checkDisable: false,
				limitTime: 0,
				// 表单验证规则
				messageFormRules: {
					//手机号
					phoneNum: [
						{required: true, message: '请输入手机号', trigger: 'blur'},
					],
					//验证码
					code: [
						{required: true, message: '请输入验证码', trigger: 'blur'},
					]
				},
				loginFormRules: {
					// 验证用户名
					username: [{
							required: true,
							message: '请输入用户名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 8,
							message: '长度在 2 到 8 个字符',
							trigger: 'blur'
						}
					],
					// 验证密码
					password: [{
							required: true,
							message: '请输入登录密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		methods: {
			// 登录表单验证，valid 等于true时验证通过
			login() {
				//是否通过表单验证
				let validPass = false
				if(this.loginForm.mode == '1'){
					this.$refs.messageFormRef.validate(valid => {
						debugger
						if(valid){
							validPass = true
						}
					})
				}else if(this.loginForm.mode == '2'){
					this.$refs.passwordFormRef.validate(valid => {
						if(valid){
							validPass = true
						}
					})
				}
				if(validPass){
					signIn(this.loginForm).then(res => {
						if (res.code !== 200) return this.$message.error('登录失败')
						this.$message.success('登录成功')
						// 1.登录成功之后的 token 保存到 客户端 的 sessionStorage 中
						// 1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
						// 1.2 token 应在当前网站打开期间生效，所以将token保存在 sessionStorage 中
						//window.sessionStorage.setItem('blogs_check_token',res.data.result.token);
						//window.sessionStorage.setItem('username',this.loginForm.username);
						setToken(res.data.token)
						// 跳转网页
						this.$router.push('./Main')
					})
				}
			},
			/**
			 * 获取验证码
			 */
			handleGetCheckCode(){
				this.$refs['messageFormRef'].validateField('phoneNum', (errorMessage) => {
					debugger
					if(errorMessage == ''){
						const param = {
							phoneNum: this.loginForm.phoneNum
						}
						fetchCheckCode(param).then(res =>{
							if(res.code == 200){
								this.$message.success(res.message)
							}else{
								this.$message.error('获取验证码失败')
							}
						})
						handleCheckLimit()
					}
				})
			},
			/**
			 * 定时器
			 */
			handleCheckLimit(){
				this.checkDisable = true;
				this.limitTime = 60;
				let timer = setInterval(()=>{
					this.limitTime--;
					if(this.limitTime <= 0){
						clearInterval(timer);
						this.checkDisable = false;
					}
				},1000)
			}
		}
	}
</script>

<style scoped>
	/deep/ .el-tabs__nav-scroll {
		width: 80%;
		margin: 0 auto;
	}
	
	/deep/ .el-tabs__content {
		margin-top: 40px !important;
	}
		
	/deep/ .el-tabs__item {
		font-size: 16px;
		font-weight: bold;
	}
	#sendCodeBtn {
		color: aliceblue;
		background-color: #409EFF;
	}
	#sendCodeBtn:hover {
		cursor: pointer;
		background-color: #7BBBFF;
	}
</style>
