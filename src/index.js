/**
 * Created by ouyang90 on 2017/8/16.
 */
import picker from './picker.vue';
export default picker;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('picker', picker);
}
