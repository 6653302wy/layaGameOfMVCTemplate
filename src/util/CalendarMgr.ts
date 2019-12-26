import DebugLog from "./DebugLog";
import Helper from "./Helper";

export default class CalendarMgr {
    private static _instance: CalendarMgr;
    public static get Ins(): CalendarMgr {
        return this._instance == null ? this._instance = new CalendarMgr() : this._instance;
    }

    public readonly calendarList: object[] = [];

    public getMonthData(year, month): number[] {
        let firstDay = new Date(year, month - 1, 1);
        let firstDayWeekDay = firstDay.getDay();   //月1号是周几
        let lastDay = new Date(year, month, 0).getDate(); //月最后一天

        return [firstDayWeekDay, lastDay];
    }

    public getDailyIsPass(year, month, day): boolean {
        year = Number(year);
        month = Number(month);
        day = Number(day);

        let isPass = Helper.getLocalCache(year + '_' + month + '_' + day);
        if (!isPass) return false;
        else return true;
    }

    // public setDailyIsPass(): void {
    //     if (!PlayerData.getInstance().mInDailyLevel) return;
    //     // Helper.setLocalCache(year + '_' + month + '_' + day, 1);
    //     if (PlayerData.getInstance().dailyPassDate != '') {
    //         Helper.setLocalCache(PlayerData.getInstance().dailyPassDate, 1);
    //     }
    //     PlayerData.getInstance().dailyPassDate = '';
    // }

    private startDay: number = 0;
    //获取 距离2019年8月1号的天数
    public getDayminus(date_str1: string): number {
        let date1 = new Date(date_str1).getTime();
        if (this.startDay == 0) this.startDay = new Date('2019-8-1').getTime();

        return Math.floor((date1 - this.startDay) / (60 * 60 * 24 * 1000)); // 每天有60 * 60 * 24 * 1000毫秒
    }

}
