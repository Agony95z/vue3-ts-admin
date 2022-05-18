<template>
  <div class="self-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :inline="true" :label-width="labelWidth">
      <el-row>
        <template v-for="(item, index) in formItems" :key="index">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.label }}</el-option
                  >
                </el-select>
              </template>
              <template v-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
// PropType 类型为 export declare type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'
export default defineComponent({
  props: {
    labelWidth: {
      type: String,
      default: () => '90'
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    modelValue: {
      // formData用v-model传递进来
      type: Object,
      required: true
    },
    // 自适应布局
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
    },
    // colLayout: {
    //   type: Number,
    //   default: () => 8
    // },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '5px 10px' })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    watch(formData, (newValue) => emit('update:modelValue', newValue), {
      deep: true
    })
    const onSubmit = () => {
      console.log('submit!')
    }
    return {
      formData,
      onSubmit
    }
  }
})
</script>

<style scoped lang="less">
.self-form {
  padding: 20px 20px 0;
}
.footer {
  padding-bottom: 20px;
}
</style>
