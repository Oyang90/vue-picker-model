# vue-picker-model    [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/) [![Gemnasium](https://img.shields.io/gemnasium/mathiasbynens/he.svg)](https://github.com/Oyang90/vue-picker-model) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Oyang90/vue-picker-model) [![npm](https://img.shields.io/npm/v/vue-picker-model.svg)](https://www.npmjs.com/package/vue-picker-model)

vue-picker-model is a dependency-free, lightweight vue component.
You only need to set the title and data description, the source data, it will automatically generate an efficient mobile-based selector.

## [Try the demo](http://github.com/Oyang90/vue-picker-model/demo/)

### How to use?
```bash
npm install vue-picker-model
```

### Example

```vue
    <template>
        <picker v-model="picker_val"
                :is_show.sync="is_show_picker"
                :title="title"
                :item_title="item_title"
                :data="picker_data"
                :selected_color="selected_color"
                :width_ratio="width_ratio"></picker>
    </template>
<script>
  import picker from 'vue-picker-model';
  export default {
    components: { picker },
    data () {
      return {
        is_show_picker: false,
        title:"选择地区、车牌、车型",
        item_title:"['地区','车牌','车型']",
        selected_color:"#eabf50",
        width_ratio:"[1,1,3]",
        picker_data: [['京', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼', '渝', '川', '贵', '藏', '陕', '甘', '青', '宁', '新'],['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],['奥迪Q7', '本田CR-V', '兰博基尼第六元素'],],
        picker_val: ['粤', 'A', '本田CR-V'],
      }
    }
  }
</script>
```
demo:

![demo](https://github.com/Oyang90/vue-picker-model/static/demo.gif)

