module app {
	/**
	 *
	 * @author 
	 * 基础请求协议结构体
	 */
	export class BasicProtocol {
        public static gonggaoUrl: string = "s/notice.php";
        //public static serverUrl: string = "s/srvlist.php";
        public static serverUrl: string = "";
        public url: string = "mywork/index.php?r=game/index";
		public static checkUrl:string = "s/charge/1758yx/check.php?";
        
        public param: string = "";
		//标记是否是logurl
		public isLogUrl:boolean = false;
        
		public constructor() {
		}

		/**
		 * 获取协议号,从param里提取
		 */
		public getProtocalNo():number
		{
			//先按&分割
			var firstArr:Array<string> = this.param.split("&");
			var num:string = "";
			if(firstArr.length>2)
			{
				num = firstArr[1].substring(8);
			}
			return +num;
		}

	}
}