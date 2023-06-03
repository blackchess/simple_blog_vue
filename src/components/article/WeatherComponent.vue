<template>
	<div class="weather-box">
		<div id="he-plugin-standard"></div>
	</div>
</template>

<script>
	export default {
			data() {
				return {
					
				}
			},
			mounted() {
				window.WIDGET = {
				  "CONFIG": {
				    "layout": "1",
				    "width": "400",
				    "height": "150",
				    "background": "1",
				    "dataColor": "FFFFFF",
				    "borderRadius": "10",
				    "key": "4a0b21e883224a099eaad4cbcf0058f8"
				  }
				}
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src="https://apip.weatherdt.com/simple/static/js/weather-simple-common.js?v=2.0";
				document.getElementsByTagName('head')[0].appendChild(script);
			}
	}
</script>

<style>
	.weather-box {
		width: 400px;
		height: 150px;
	}
</style>