export default{
	isStrEmpty(str) {
		if (str == undefined) {
			return true;
		} else if (str == null) {
			return true;
		}else if(str.length <= 0){
			return true;
		}else if (str == "") {
			return true;
		} else {
			return false;
		}
	},
	
	isObjEmpty(obj) {
		if (obj == undefined) {
			return true;
		} else if (obj == '') {
			return true;
		} else if (obj == null) {
			return true;
		} else {
			return false;
		}
	},
	
	isListEmpty(ary) {
		if (ary === undefined) {
			return true;
		}
		if (ary === null) {
			return true;
		}
		if (ary.length === 0) {
			return true;
		}
		if (ary.length > 0) {
			return false;
		}
		return false;
	},
	isRealNum(val) {
		if (parseFloat(val).toString() == 'NaN') {
			return false;
		}
		if (Object.is(val, -Infinity)) {
			return false;
		}
		if (Object.is(val, Infinity)) {
			return false;
		}
		if (isNaN(val)) {
			return false;
		}
		if (typeof val === 'number' && !isNaN(val)) {
			return true;
		}
		return true;
	},
}