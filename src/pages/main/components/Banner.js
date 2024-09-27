import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import MainBanner01 from '../../../assets/images/main_banner01.png'
import MainBanner02 from '../../../assets/images/main_banner02.png'

import { Pagination } from 'swiper/modules';
const Banner = () => {
    return (
        <div className={"banner_wrap"}>
            <Swiper pagination={true} modules={[Pagination]} className="banner_list">
                <SwiperSlide>
                    <div className="banner_item">
                        <img src={MainBanner01} alt="It study group"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="banner_item">
                        <img src={MainBanner02} alt="It study group"/>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
