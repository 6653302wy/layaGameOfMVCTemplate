

export default class TimeUtils {
	/**
	  * 时间转换 秒 转格式  1970/1/1
	  * @param num			秒
	  */
	public static transDate(num: number): string {
		var date: Date;
		date = new Date(num * 1000);
		return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
	}

	/**
	  * 时间转换 秒 转格式  1970年1月1日
	  * @param num			秒
	  */
	public static transDateChineseWord(num: number): string {
		var date: Date;
		date = new Date(num * 1000);
		return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
	}



	/**
	  * 时间转换 秒 转格式  1970-1-1
	  * @param num			秒
	  */
	public static transDate1(num: number): string {
		var date: Date;
		date = new Date(num * 1000);
		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	}
	/**
	  * 时间转换 秒 转格式  1970-1-1 00:00:00
	  * @param num			秒
	  */
	public static transDate2(num: number): string {
		var date: Date;
		var monthstr: string = "00";
		var daystr: string = "00";
		var hourstr: string = "00";
		var minstr: string = "00";
		var sstr: string = "00";
		date = new Date(num * 1000);

		if ((date.getMonth() + 1) >= 10)
			monthstr = <string><any>((date.getMonth() + 1));
		else
			monthstr = "0" + <string><any>((date.getMonth() + 1));

		if (date.getDate() >= 10)
			daystr = <string><any>(date.getDate());
		else
			daystr = "0" + <string><any>(date.getDate());

		if (date.getHours() >= 10)
			hourstr = <string><any>(date.getHours());
		else
			hourstr = "0" + <string><any>(date.getHours());

		if (date.getMinutes() >= 10)
			minstr = <string><any>(date.getMinutes());
		else
			minstr = "0" + <string><any>(date.getMinutes());

		if (date.getSeconds() >= 10)
			sstr = <string><any>(date.getSeconds());
		else
			sstr = "0" + <string><any>(date.getSeconds());

		return date.getFullYear() + "-" + monthstr + "-" + daystr + " " + hourstr + ":" + minstr + ":" + sstr;
	}

	//将秒数转换为时分秒 00:00:00
	public static SecToHSC(sec: number = 0, H_exits: boolean = true): string {
		var timeStr: string = "";
		var hour: number = H_exits ? Math.floor(sec / 3600) : 0;
		var miniute: number = Math.floor(sec / 60) - hour * 60;
		var second: number = Math.floor(sec - hour * 3600 - miniute * 60);
		if (hour != 0) {
			if (hour < 10)
				timeStr += "0" + (hour + ":");
			else if (hour >= 10)
				timeStr += (hour + ":");
		}//else timeStr += "00:";
		
		if (miniute < 10)
			timeStr += "0" + (miniute + ":");
		else if (miniute >= 10)
			timeStr += (miniute + ":");
		if (second < 10)
			timeStr += "0" + second;
		else if (second >= 10)
			timeStr += second;

		return timeStr;
	}

	//将秒数转换为天时分秒
	public static SecToDHSC(sec: number, hasHour: boolean = true, hasMiniute = true, hasSec: boolean = true): string {
		var timeStr: string = "";
		var day: number = Math.floor(sec / (24 * 3600));
		if (day != 0) {
			timeStr += day + "天";
		} else {
			hasHour = true;
			hasSec = false;
		}
		var hour: number = Math.floor(sec / 3600 - day * 24);
		var miniute: number = Math.floor(sec / 60 - day * 24 * 60 - hour * 60);
		var second: number = sec - day * 24 * 60 * 60 - hour * 3600 - miniute * 60;
		if (hasHour) {
			timeStr += hour + "小时";
			if (hasMiniute) {
				timeStr += miniute + "分钟";
				if (hasSec) {
					timeStr += second + "秒";
				}
			}
		}
		return timeStr;
	}

	//获取当前之后 一段时间 的时间戳
	public static getFutureTime(after:number):number{
		return Laya.Browser.now() + after;
	}

}