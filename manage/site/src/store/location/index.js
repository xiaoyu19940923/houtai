const state = {
    formattedAddress: localStorage.formattedAddress || "定位中...",  //地址详情
    province: localStorage.province || "北京市",
    tips: [],


}

const mutations = {
    CHANGE_LOCATION(state, { formattedAddress, province = "北京市" }) {
        state.formattedAddress = localStorage.formattedAddress = formattedAddress;
        state.province = localStorage.province = province;
    },
    CHANGE_TIPS(state, tips) {
        state.tips = tips;
    }
}

const actions = {
    // 定位
    geolocation({ state, commit }) {
        if (state.formattedAddress === "定位中...") {
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,

                })

                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', onComplete)
                AMap.event.addListener(geolocation, 'error', onError)

                function onComplete(data) {
                    // data是具体的定位信息
                    console.log(1111, data);
                    // _this.formattedAddress = data.formattedAddress;
                    commit("CHANGE_LOCATION", { formattedAddress: data.formattedAddress, paovince: data.addressComponent.paovince })
                }

                function onError(data) {
                    // 定位出错
                    console.log(2222, data);
                }
            })
        }

    },
    // 搜索
    autoComplete({ state, commit }, keyword) {
        if (keyword.length > 0) {
            AMap.plugin('AMap.Autocomplete', function () {
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: state.parvince
                }
                var autoComplete = new AMap.Autocomplete(autoOptions);
                autoComplete.search(keyword, function (status, result) {
                    // 搜索成功时，result即是对应的匹配数据
                    result.tips = result.tips || [];
                    commit('CHANGE_TIPS', result.tips)

                    console.log(result.tips)
                })
            })
        }

    }

}



export default {
    state,
    mutations,
    actions
}