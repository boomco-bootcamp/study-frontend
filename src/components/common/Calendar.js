import {useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'

registerLocale('ko', ko)
const _ = require('lodash')


const Calendar = (props) => {
    const {
        className = '',
        placeholder="날짜를 입력하세요",
        disabled = false,
        readOnly = false,
        date,
        onChangeDate,
        item,
        refDate,
        onFocus,
        onBlur,
        errorMsg = "필수 항목입니다",
        maxDate = null,
        minDate = null,
        isClearable = true
    } = props;

    // 달력에서 선택된 날짜 상태
    const [startDate, setStartDate] = useState('');
    // 연도 범위 설정
    const years = _.range(2020, getYear(new Date()) + 1, 1);
    const months = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
    ];

    return(
        <div className="calendar_wrap">
            <DatePicker
                locale={ko}
                placeholderText={placeholder}
                selected={date}
                dateFormat='yyyy-MM-dd'
                onChange={(currentDate) => onChangeDate(currentDate)}
                maxDate={maxDate}
                minDate={minDate}
            />
        </div>
    )
}

export default Calendar
