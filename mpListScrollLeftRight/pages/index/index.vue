<template>
	<view>
		<block v-for="(bk,indexOut) in bks" :key="indexOut">
			<KellList v-if="getStocks(indexOut).length > 0">
				<block slot="listHscroll">
						<view class="section-bg flex-row">
						  <view v-for="(field, index) in rollFields0" :key="index">
							<view :id="creatListNameId(indexOut,index)" class="section-item O_C3 S6" :style="{'width': itemWidth1 + 'rpx','fontSize':measureTxt(field.name) + 'rpx'}">
								<!-- {{field.name}} -->
								{{leftName2White(field.name)}}
								<text v-if="index == 6" class="S3 T5 flex-col" style="justify-content: center;align-items: center;width:30rpx;height: 30rpx;margin-left:5rpx;border: 0 solid #949ffc;border-radius: 20rpx;background-color: #949ffc;">?</text>
							</view>
						  </view>
						</view>
						<view v-for="(stock, rowIndex) in getStocks(indexOut)" :key="rowIndex" v-if="stock.isShow">
						  <RightCell :itemWidth="itemWidth1" :stock="stock" :fromType="fromTypeTop" @nsRclick="itemClickR3"></RightCell>
						  <text class="S5 flex-row" style="width: 710rpx;padding-left:30rpx;color:rgba(140,140,140,.0)" v-if="showCase(indexOut,stock)">
							<text class="S1" :style="{'padding':'0rpx 2rpx 0rpx 2rpx','border': '1rpx solid rgba(235,51,59,.0)','color':'rgba(235,51,59,.0)'}" v-if="stock.flag.length > 0">
								{{stock.flag}}
							</text>
							{{stock.des}}
						  </text>
						  <view :style="{'width': itemWidth1 * stock.fields.length + 'rpx','height':'1rpx','margin-top':'17rpx','background-color':'#f5f5f5'}" v-if="showCase(indexOut,stock)"></view>
						  <view :style="{'width': itemWidth1 * stock.fields.length + 'rpx','height':'1rpx','background-color':'#f5f5f5'}" v-else></view>
						</view>
						<!-- <text class="S10 flex-row" style="justify-content: center;align-items: center;margin-top: 100rpx;margin-bottom: 100rpx;color:rgba(51,51,51,.0)" v-if="filterDataNo(indexOut)">暂无数据</text> -->
					
				</block>
				<block slot="fixedFloatBussines">
					<view class="section-bg flex-row">
						<view :id="creatListNameId(indexOut,0)" class="section-item O_C3 S6" :style="{'width': itemWidth1 + 'rpx','fontSize':measureTxt(getLeftName) + 'rpx'}">
							{{getLeftName}}
						</view>
					</view>
					<view v-for="(stock, rowIndex) in getStocks(indexOut)" :key="rowIndex" v-if="stock.isShow">
						<div class="flex-row"
						  :style="{
							  'width':itemWidth1 + 'rpx',
							  'height':'110rpx',
							  'justify-content': 'center',
							  'align-items': 'center'}">
							<div class="flex-col B1" :style="{'width':itemWidth1 + 'rpx',height:'110rpx','justify-content': 'center'}">
								<text :style="{'padding-left':'30rpx','color':'#333333','fontSize':measureTxtName(stock.fields[0].result) + 'rpx','font-weight':fontWeightCotrl(stock.fields[0])}">
									{{stock.fields[0].result}}
								</text>
								<div class="flex-row" :style="{'width':itemWidth1 + 'rpx','padding-left':'30rpx'}">
									<text class="S4 O_C3" style="margin-top: 1rpx;margin-right: 12rpx;">{{stock.stockcode}}</text>
									<div class="flex-col">
										<div style="height: 2rpx;"></div>
										<text v-if="getTag0(stock.fields[0]).length > 0" class="S1 T5 flex-row" style="width:64rpx;
											height: 28rpx;
											justify-content: center;
											align-items: center;
											border: 0 solid #ef7b36;
											background-color: #ef7b36;
											margin-bottom:2rpx;"
											>
											{{getTag0(stock.fields[0])}}
										</text>
										<text v-if="getTag1(stock.fields[0]).length > 0" class="S1 T5 flex-row" style="width:64rpx;
											height: 28rpx;
											justify-content: center;
											align-items: center;
											border: 0 solid #949ffc;
											background-color: #949ffc;">
											{{getTag1(stock.fields[0])}}
										</text>
									</div>
								</div>
							</div>
						  </div>
						  <text class="S5 T3 flex-row" style="width: 710rpx;padding-left:30rpx;" v-if="showCase(indexOut,stock)">
							<text class="S1 C1" :style="{'padding':'0rpx 2rpx 0rpx 2rpx','border': '1rpx solid #eb333b'}" v-if="stock.flag.length > 0">
								{{stock.flag}}
							</text>
							{{stock.des}}
						  </text>
						<view :style="{'width': itemWidth1 * stock.fields.length + 'rpx','height':'1rpx','margin-top':'17rpx','background-color':'#f5f5f5'}" v-if="showCase(indexOut,stock)"></view>
						<view :style="{'width': itemWidth1 * stock.fields.length + 'rpx','height':'1rpx','background-color':'#f5f5f5'}" v-else></view>
					</view>
					<!-- <text class="S10 T1 flex-row" style="justify-content: center;align-items: center;margin-top: 100rpx;margin-bottom: 100rpx;" v-if="filterDataNo(indexOut)">暂无数据</text> -->
					
				</block>
			</KellList>
		</block>
	</view>
</template>

<script>
	import KellList from '@/components/KellList.vue';
	import RightCell from '@/components/RightCell.vue';
	
	import DataModule from '@/common/dataModule.js';
	import util from '@/common/util.js';
	
	var _self = null;
	const ItemWidth1 = 214;
	const Fields = [
			{'name':'名称','val':'secuabbr',isBorder:false},
			{'name':'当日涨','val':'changeratio',isBorder:false},
			{'name':'5日涨','val':'changeratio5',isBorder:false},
			{'name':'现价','val':'closeprice',isBorder:false},
			{'name':'北上流入','val':'netbuysum',isBorder:false},
			{'name':'北上占比','val':'exashareratio',isBorder:false},
			{'name':'龙虎榜','val':'label',isBorder:false}
		];
	
	export default {
		components:{
			KellList,
			RightCell,
		},
		computed:{
			itemWidth1() {
			  return ItemWidth1;
			},
			getLeftName(){
				return this.rollFields0[0].name;
			},
		},
		data() {
			return {
				bks:[],
				rollFields0:Fields,//[],
				stocksMidTop:[],
				fromTypeTop:'x楞有x',
			};
		},
		created() {
			_self = this;
		},
		onReady() {
			// this.rollFields0 = Fields;
			this.dataModule();
		},
		onLoad() {
		},
		methods: {
			dataModule(){
				this.bks = DataModule.block;
				// console.log("x>>>>DataModule.block=",DataModule.block);
				this.bks.forEach((item,index) => {
					_self.stocksMidTop.push(item.blockstock);
				});
			},
			itemClickR3(stockJson){
				const stock = JSON.parse(stockJson);
				console.log("x>>>>stock:",stock);
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
			showCase(indexOut,stock){
				return true;
			},
			measureTxtName(name){
				var isChineseAll = false;
				for(var i = 0;i < name.length;i ++){
					if (/[\u4e00-\u9fa5]/.test(name[i])){
						isChineseAll = true;
					}else{
						isChineseAll = false;
						break;
					}
				}
				var fontSize = 32;
				if(!isChineseAll){
					return fontSize;
				}
				const alphL = name.length;
				var w = alphL * fontSize;
				while(w > ItemWidth1){
					-- fontSize;
					w = alphL * fontSize;
				}
				return fontSize;
			},
			measureTxt(name){
				var fontSize = 28;//32;
				const alphL = name.length;
				var w = alphL * fontSize;
				while(w > ItemWidth1){
					-- fontSize;
					w = alphL * fontSize;
				}
				return fontSize;
			},
			leftName2White(name){
				var n = '';
				if(name == '名称'){
					n = '';
				}else{
					n = name;
				}
				return n;
			},
			creatListNameId(indexOut,index){
				return 'nameRight_' + indexOut + '_' + index;
			},
			getStocks(index){
				if(util.isListEmpty(this.stocksMidTop[index])){
					return [];
				}
				const stocks = this.stocksMidTop[index].map(stock => {
									stock.id = parseInt(stock.secucode) >= 600000 ? String(stock.secucode) : '1' + stock.secucode;
									stock.stockname = stock.secuabbr;
									stock.stockcode = stock.secucode;
									stock.flag = stock.ztcountdesc;
									stock.des = '  '+stock.reason;
									
									const price = (stock.closeprice / 10000.0).toFixed(2);//util.getAmount1(stock.closeprice);
									const netbuysum = stock.netbuysum;//util.getAmount1(stock.netbuysum);
									
									var zdf = '--';
									var zf = 0;
									if(!util.isStrEmpty(stock.changeratio) && util.isRealNum(stock.changeratio)){
										zf = parseFloat(stock.changeratio);
										zdf = (zf/100).toFixed(2) + '%';
									}
									var zdf5 = '--';
									var zf5 = 0;
									if(!util.isStrEmpty(stock.changeratio5) && util.isRealNum(stock.changeratio5)){
										zf5 = parseFloat(stock.changeratio5);
										zdf5 = (zf5/100).toFixed(2) + '%';
									}
									stock.fields = [
										{result:stock.secuabbr,raw:0,needFontWeight:true,needOccupy:true,isNameAndCode:true,code:stock.secucode,tag0:stock.ishot == 1 ? '人气龙':'',tag1:stock.isindustry == 1 ? '行业龙':''},
										{result:zdf,raw:zf,needFontWeight:true},
										{result:zdf5,raw:zf5,needFontWeight:true},
										{result:price,raw:stock.closeprice,needFontWeight:true},
										{result:netbuysum,raw:stock.netbuysum,needFontWeight:true,showResultLine:true},
										{result:stock.exashareratio + '%',raw:stock.exashareratio,needFontWeight:true,showResultLine:true},
										{result:!util.isStrEmpty(stock.label)?stock.label:'--',raw:0,needFontWeight:false},
									];
									const industryNull = (stock.isShowIndustry == undefined || stock.isShowIndustry == null);
									const hotNull = (stock.isShowHot == undefined || stock.isShowHot == null);
									const showType0 = industryNull && hotNull;
									const showType1 = !industryNull && stock.isShowIndustry;
									const showType2 = !hotNull && stock.isShowHot;
									const showType3 = showType1 && showType2;
									
									stock.isShow = false;
									if(showType0){
										stock.isShow = true;
									}else{
										if(two){
											if(showType3){
												stock.isShow = true;
											}
										}else{
											if(showType1){
												stock.isShow = true;
											}else if(showType2){
												stock.isShow = true;
											}
										}
									}
									return stock;
								});
								return stocks;
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.section-item {
	  height: 60rpx;
	  line-height: 60rpx;
	  /* text-align: center; */
	  background-color: #f5f5f5;
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	}
	.section-bg {
	  height: 60rpx;
	}
</style>
