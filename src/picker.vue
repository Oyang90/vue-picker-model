<template>
    <div class="picker" :style="is_show?'right:0':'right:-100%'" @click="close">
        <div class="picker_body" @click.stop="">
            <div class="picker_title">
                <!--<div @click="clickCancel">
                    取消
                </div>-->
                <div class="picker_text">
                    {{title}}
                </div>
                <!--<div @click="clickOk">
                    确定
                </div>-->
            </div>
            <div class="picker_item_title">
                <div class="picker_item_title_item" v-for="(list,index) in data"
                     :style="{'flex':width_ratio&&width_ratio[index]?width_ratio[index]:1}">
                    {{item_title[index]}}
                </div>
            </div>
            <div class="picker_main">
                <div class="picker_list" ref="picker_list" :data-index="index" v-for="(list,index) in data"
                     :style="{'flex':width_ratio&&width_ratio[index]?width_ratio[index]:1}"
                     @touchstart="scrollStart(index,$event)"
                     @touchmove="scrolling(index,$event)"
                     @touchend="scrollEnd(index,$event)">
                    <div class="picker_item" ref="picker_item">&nbsp;</div>
                    <div class="picker_item">&nbsp;</div>
                    <div class="picker_item"
                         :data-index="sub_index"
                         :class="{'selected':cur_val[index]==item}"
                         :style="{'color': (cur_val[index]==item&&selected_color)?selected_color:''}"
                         v-for="(item,sub_index) in list">
                        {{item}}
                    </div>
                    <div class="picker_item">&nbsp;</div>
                    <div class="picker_item">&nbsp;</div>
                </div>
                <div class="picker_linear" ref="picker_linear"></div>
            </div>
        </div>
    </div>
</template>
<style>
    .picker {
        font-size: 14px;
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        /*display:none;*/
    }

    .picker_item_title {
        display: flex;
    }

    .picker_item_title .picker_item_title_item {
        flex: 1;
        padding: 10px 0;
        text-align: center;
        font-size: 14px;
    }

    .picker_body {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 10001;
    }

    .picker_title {
        display: flex;
        text-align: center;
        border-bottom: 1px solid #e4e4e4;
    }

    .picker_title > * {
        padding: 10px 0;
        flex: 1;
    }

    .picker_title > .picker_text {
        flex: 3
    }

    .picker_main {
        display: flex;
        overflow: hidden;
        height: 200px; /*高度=80px/40*5*/
        position: relative;
    }

    .picker_list {
        flex: 1;
        text-align: center;
        /*transition: transform 0.1s;*/
        /*overflow: hidden;*/
        height: 100000%;
    }

    .picker_main:before {
        content: '';
        position: absolute;
        top: 80px;
        width: 100%;
        background: rgba(239, 239, 239, 1);
        height: 40px;
        z-index: -1;
    }

    .picker_item {
        height: 40px;
        line-height: 40px;
        z-index: 10001;
        opacity: .3;
    }

    .picker_item.selected {
        color: #09b6f2;
        opacity: 1;
    }

    .picker_linear {
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        background: -webkit-gradient(linear, left bottom, left top, from(#fff), color-stop(0.52, rgba(245, 245, 245, 0)), color-stop(0.48, rgba(245, 245, 245, 0)), to(#fff));
        background: -webkit-linear-gradient(#fff, rgba(245, 245, 245, 0) 52%, rgba(245, 245, 245, 0) 48%, #fff);
        background: -moz-linear-gradient(#fff, rgba(245, 245, 245, 0) 52%, rgba(245, 245, 245, 0) 48%, #fff);
        background: linear-gradient(#fff, rgba(245, 245, 245, 0) 52%, rgba(245, 245, 245, 0) 48%, #fff)

    }
</style>
<script>
    export default {
        props: [
            'value',//v-model绑定value
            'data',//列表数据，二维数组
            'title',//标题
            'item_title',//选项标题
            'is_show',//是否展示
            'selected_color',//选项颜色
            'width_ratio',//宽度比
        ],
        data(){
            return {
                cur_val: [],
                is_init: false,
                scroll_data: {
                    picker_item_height: 0,
                    cur_translate_val: 0,
                    scrolling_event: null,
                },
                isScrolling: false
            }
        },
        updated: function () {
            var _self = this;
            if (_self.is_show && !_self.is_init) {
                _self.init();
            }
        },
        methods: {
            init(){
                var _self = this;
                _self.scroll_data.picker_item_height = this.$refs.picker_item[0].clientHeight;

                //自动选择
                if (_self.value && _self.data.length > 0) {
                    _self.cur_val = _self.value;
                    for (var i = 0; i < _self.value.length; i++) {
                        for (var j = 0; j < _self.data[i].length; j++) {
                            if (_self.value[i] === _self.data[i][j]) {
                                _self.scrollToItem(i, j);
                            }
                        }
                    }
                }
                _self.is_init = true;
            },
            scrollStart(index, e){
                e.preventDefault();
                var that = this.$refs.picker_list[index];
                var _self = this;
                _self.scroll_data.scrolling_event = e;
                _self.scroll_data.cur_translate_val = that.offsetTop;
            },
            scrolling(index, e){
                var _self = this;
                _self.isScrolling = true;
                var that = this.$refs.picker_list[index];
                if (_self.scroll_data.scrolling_event) {
                    var distance = _self.scroll_data.cur_translate_val + e.touches[0].pageY - _self.scroll_data.scrolling_event.touches[0].pageY;
                    that.style.transition = 'margin-top 0s';
                    that.style.webkitTransition = 'margin-top 0s';
                    that.style.marginTop = distance + 'px';
                }
            },
            scrollEnd(index, e){
                var _self = this;
                var that = this.$refs.picker_list[index];
                var pre_event = _self.scroll_data.scrolling_event;
                var cur_event = e;
                if (_self.isScrolling) {
                    _self.isScrolling = false;
                } else {
                    _self.scrollToItem(that.dataset.index, that.dataset.index);
                    return;
                }


                var time_distance = cur_event.timeStamp - pre_event.timeStamp;
                var scroll_distance = cur_event.changedTouches[0].pageY - pre_event.touches[0].pageY;
                //之前的tansform的Y轴值
                var pre_translate_val = _self.scroll_data.cur_translate_val;
                //当前tansform的Y轴值
                var cur_translate_val = that.offsetTop;
                if (time_distance < 100) {
                    cur_translate_val += scroll_distance * 5;
                }

                //上拉选择当前的上一个，下拉选择当前的下一个
                var item_height = _self.scroll_data.picker_item_height;
                if (pre_translate_val > cur_translate_val) {
                    cur_translate_val = cur_translate_val - cur_translate_val % item_height - item_height;
                } else {
                    cur_translate_val = cur_translate_val - cur_translate_val % item_height;
                }
                //处理滚动超出范围
                var max_distance = -(that.childElementCount - 5) * item_height;
                if (cur_translate_val > 0) {
                    cur_translate_val = 0;
                } else if (cur_translate_val < max_distance) {
                    cur_translate_val = max_distance;
                }
                //设置当前选择
                var cur_list_index = that.dataset.index;
                var cur_item_index = parseInt(-cur_translate_val / item_height);
                _self.scroll_data.scrolling_event = null;
                _self.scrollToItem(cur_list_index, cur_item_index);
            },
            scrollToItem(i, j){
                var _self = this;
                j = j || 0;
                var distance = -_self.scroll_data.picker_item_height * j;

                var that = this.$refs.picker_list[i];
                that.style.transition = 'margin-top 0.2s';
                that.style.webkitTransition = 'margin-top 0.2s';
                that.style.marginTop = distance + 'px';

                var val_arr = [];
                for (var key = 0; key < _self.cur_val.length; key++) {
                    val_arr.push(_self.cur_val[key]);
                }
                val_arr[i] = _self.data[i][j];
                _self.cur_val = val_arr;
            },
            close(){
                this.$emit('update:is_show', false);//触发.sync
                this.$emit('close');//触发.sync
            }
        },
        watch: {
            cur_val(val){
                this.$emit('input', val);
            }
        }
    }
</script>