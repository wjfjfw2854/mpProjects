<template>
	<div class="row-bg flex-row" @click.stop="onItemEvent">
	  <block v-for="(field, index) in stock.fields" :key="index">
	    <div class="row-item" :style="{'width': itemWidth + 'rpx'}">
	        <div class="flex-row" 
			  :style="{
				  'width':itemWidth + 'rpx',
				  'height':'110rpx',
				  'justify-content': 'center',
				  'align-items': 'center',
				  'background-color':backgroundColor(field),
				  'border':border(field),
				  'border-radius':'8rpx'}">
				<div v-if="occupyJust(field.needOccupy)"></div>
				<div v-else-if="isNameCodeCol(field)" class="flex-col" :style="{'width':itemWidth + 'rpx',height:'110rpx','justify-content': 'center'}">
					<text :style="{'padding-left':'30rpx','color':color(field),'fontSize':measureTxt(getVal(field)) + 'rpx','font-weight':fontWeightCotrl(field)}">
						{{getVal(field)}}
					</text>
					<div class="flex-row" :style="{'width':itemWidth + 'rpx','padding-left':'30rpx'}">
						<text class="S4 O_C3" style="margin-top: 1rpx;margin-right: 12rpx;">{{getCode(field)}}</text>
						<div class="flex-col">
							<div style="height: 2rpx;"></div>
							<text v-if="getTag0(field).length > 0" class="S1 T5 flex-row" style="width:64rpx;
								height: 28rpx;
								justify-content: center;
								align-items: center;
								border: 0 solid #ef7b36;
								background-color: #ef7b36;
								margin-bottom:2rpx;"
								>
								{{getTag0(field)}}
							</text>
							<text v-if="getTag1(field).length > 0" class="S1 T5 flex-row" style="width:64rpx;
								height: 28rpx;
								justify-content: center;
								align-items: center;
								border: 0 solid #949ffc;
								background-color: #949ffc;">
								{{getTag1(field)}}
							</text>
						</div>
					</div>
				</div>
				<div v-else :style="{'color':color(field),'fontSize':measureTxt(getVal(field)) + 'rpx','font-weight':fontWeightCotrl(field)}">
					{{getVal(field)}}
				</div>
			  </div>
	    </div>
	    <!-- <div class="item-line L2" :style="{'width': itemWidth + 'rpx'}"></div> -->
	  </block>
	</div>
</template>

<script>
	import util from '@/common/util.js';
	const juezhanlongtou = 'x楞有x';
	export default{
		props: {
		  stock: {
		    type: Object,
		    default: {}
		  },
		
		  itemWidth: {
		    type: Number,
		    default: 0
		  },
			fromType:{
				type:String,
				default:''
			},
			needBackGround:{
				type:Boolean,
				default:false
			},
			critical:{
				type:Number,
				default:8
			}
		},
		data(){
			  return {
			  };
		},
		
		computed: {
		},
		methods:{
			occupyJust(needOccupy){//仅占位用到
				var occupied = false;
				if(!util.isObjEmpty(needOccupy) && needOccupy == true){
					occupied = true;
				}
				return occupied;
			},
			fontWeightCotrl(field){
					  if(!util.isObjEmpty(field)){
						 if(!util.isObjEmpty(field.needFontWeight) && field.needFontWeight == true){
							return 'bolder'; 
						 }else{
							 return 'null';
						 }
					  }
					  return 'null';
			},
			isNameCodeCol(field){
				if(!util.isObjEmpty(field.isNameAndCode) && field.isNameAndCode == true){
					return field.isNameAndCode;
				}else{
					return false;
				}
			},
			getTag0(field){
				if(!util.isObjEmpty(field.tag0) && !util.isStrEmpty(field.tag0)){
					return field.tag0;
				}else{
					return '';
				}
			},
			getTag1(field){
				if(!util.isObjEmpty(field.tag1) && !util.isStrEmpty(field.tag1)){
					return field.tag1;
				}else{
					return '';
				}
			},
			getCode(field){
				if(!util.isObjEmpty(field.code) && !util.isStrEmpty(field.code)){
					return field.code;
				}else{
					return '';
				}
			},
			getVal(field){
				if(!util.isObjEmpty(field.showResultLine) && field.showResultLine == true && field.raw == 0){
					return '--';
				}
				return field.result;
			},
			color(field){
				  if(this.fromType == juezhanlongtou && !util.isObjEmpty(field.colorCotrl) && field.colorCotrl == true){
					  return field.raw > 2 ? '#eb333b' : '#333333';
				  }
			  	return field.raw > 0 ? '#eb333b' : (field.raw == 0 ? '#333333' : '#17b03e');
			  },
			  bgSwitch(field){
			  		  if(!util.isObjEmpty(field)){
						  if(field.bgNeed){
							  return true;
						  }else{
							  return false;
						  }
			  		  }
			  		  return false;
			  },
			  backgroundColor(field){
				  return this.needBackGround && this.bgSwitch(field) && field.raw > this.critical ? 'rgba(255,30,30,.2)' : 'B1';
			  },
			  border(field){
				  return this.needBackGround && this.bgSwitch(field) && field.raw > this.critical ? '0rpx solid rgba(255,30,30,.2)':'0rpx solid #ffffff';
			  },
			onItemEvent(e) {
				const stock = {
				  id: this.stock.id,
				  name: this.stock.stockname,
				  code: this.stock.stockcode,
				  category: this.stock.category,
				  exchange: this.stock.exchange
				};
				if(this.fromType == juezhanlongtou){
					const stockJson = JSON.stringify(stock);
					this.$emit("nsRclick",stockJson);
					return;
				}
				console.log("onItemEvent---点击事件-----");
			},
			measureTxt(name){
				var isChineseAll = false;
				for(var i = 0;i < name.length;i ++){
					if (/[\u4e00-\u9fa5]/.test(name[i])){
						isChineseAll = true;
					}else{
						isChineseAll = false;
						break;
					}
				}
				var fontSize = 34;
				if(!isChineseAll){
					return fontSize;
				}
				const alphL = name.length;
				var w = alphL * fontSize;
				while(w > this.itemWidth){
					-- fontSize;
					w = alphL * fontSize;
				}
				return fontSize;
			},
		},
	}
</script>

<style scoped>
	.row-bg {
	  /* height: 160rpx; */
	  height: 110rpx;
	}
	
	.row-item {
	  /* height: 160rpx; */
	  height: 110rpx;
	}
</style>
